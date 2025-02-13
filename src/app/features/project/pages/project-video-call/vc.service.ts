import { inject, Injectable } from '@angular/core';
import { VCSocketService } from './vc.socket.service';
import { Peer } from 'peerjs';
import { VcStreamService } from './vs-stream.service';

@Injectable({
  providedIn: 'root',
})
export class VCService {
  private readonly _vCSocketService = inject(VCSocketService);
  private readonly _vcStreamService = inject(VcStreamService);

  // Local stream; must be set before making or answering calls.
  stream!: MediaStream;

  // Create a Peer instance immediately.
  myPeer = new Peer();

  // Keep track of active peer connections for proper cleanup.
  peers: { [userId: string]:any } = {};

  // --- New: Separate active and waiting streams ---
  // Active streams are those currently rendered (limit 3).
  activeStreams = new Map<string, MediaStream>();
  // Waiting streams are stored if more than 3 are incoming.
  waitingStreams = new Map<string, MediaStream>();

  constructor() {
    // When our Peer ID is ready, join the room.
    this.myPeer.on('open', (id: string) => {
      console.log(`My Peer ID: ${id}`);
      this._vCSocketService.emit('join-room', { roomId: 'Test-room-id', id });
    });

    // **Fix #1:** Set up the incoming-call listener immediately so no call is missed.
    this.myPeer.on('call', (call) => {
      console.log(`Received call from ${call.peer}`);
      if (this.stream) {
        call.answer(this.stream);
      } else {
        console.error('Local stream not available when receiving a call!');
        return;
      }
      call.on('stream', (userVideoStream: MediaStream) => {
        this.handleIncomingStream(call.peer, userVideoStream);
      });
      // Store the call for later cleanup.
      this.peers[call.peer] = call;
    });

    // When a new user connects, we initiate a call.
    this._vCSocketService.on('user-connected').subscribe((data: any) => {
      const userId = data.id;
      console.log(`User connected: ${userId}`);
      if (this.stream) {
        this.connectToNewUser(userId, this.stream);
      } else {
        console.error('Local stream not available for connecting!');
      }
    });

    // When a user disconnects, remove their call and streams.
    this._vCSocketService.on('user-disconnected').subscribe((userId: string) => {
      console.log(`User disconnected: ${userId}`);
      this.removeUser(userId);
    });
  }

  /**
   * Must be called once the local media stream is available.
   * (Fix: Previously, the on('call') listener was added here, which could miss early calls.)
   */
  handleUserStream(stream: MediaStream) {
    this.stream = stream;
    // You could also update your own video display here if needed.
  }

  /**
   * Initiates a call to a new user.
   */
  connectToNewUser(userId: string, stream: MediaStream) {
    const call = this.myPeer.call(userId, stream);
    call.on('stream', (userVideoStream: MediaStream) => {
      console.log(`Received stream from ${userId}`);
      this.handleIncomingStream(userId, userVideoStream);
    });
    call.on('close', () => {
      this.removeUser(userId);
    });
    // Save the call so it can be closed on disconnect.
    this.peers[userId] = call;
  }

  /**
   * Handles an incoming stream.
   *
   * Fixes:
   * - Instead of trying to re-attach a 'stream' event (which only fires once),
   *   we save the stream immediately.
   * - We separate active and waiting streams.
   */
  private handleIncomingStream(userId: string, stream: MediaStream) {
    // Avoid duplicates.
    if (this.activeStreams.has(userId) || this.waitingStreams.has(userId)) {
      console.warn(`Stream from ${userId} is already handled.`);
      return;
    }

    if (this.activeStreams.size < 3) {
      // Add to active streams if below the limit.
      this.activeStreams.set(userId, stream);
      this._vcStreamService.setStream(stream, userId);
      console.log(`Stream from ${userId} added to active streams.`);
    } else {
      // Otherwise, store in the waiting queue.
      this.waitingStreams.set(userId, stream);
      console.log(`Stream from ${userId} added to waiting queue.`);
    }
  }

  /**
   * Called when a user disconnects.
   * Closes their peer connection, removes their stream, and promotes waiting streams.
   */
  removeUser(userId: string) {
    // Close the peer connection if it exists.
    if (this.peers[userId]) {
      this.peers[userId].close();
      delete this.peers[userId];
    }

    // Remove from active streams if present.
    if (this.activeStreams.has(userId)) {
      this.activeStreams.delete(userId);
      this._vcStreamService.removeStream(userId);
      console.log(`Removed active stream for ${userId}.`);
      // After removal, check if a waiting stream can be promoted.
      this.promoteWaitingStream();
    } else if (this.waitingStreams.has(userId)) {
      // If the stream was in the waiting queue, remove it.
      this.waitingStreams.delete(userId);
      console.log(`Removed waiting stream for ${userId}.`);
    }
  }

  /**
   * If there is room for another stream, promote one from the waiting queue.
   */
  private promoteWaitingStream() {
    if (this.activeStreams.size < 3 && this.waitingStreams.size > 0) {
      // Promote the first waiting stream (FIFO).
      const iterator = this.waitingStreams.entries();
      const next = iterator.next();
      if (!next.done) {
        const [userId, stream] = next.value;
        this.waitingStreams.delete(userId);
        this.activeStreams.set(userId, stream);
        this._vcStreamService.setStream(stream, userId);
        console.log(`Promoted stream from ${userId} to active streams.`);
      }
    }
  }
}
