import { Injectable } from '@angular/core';
import { Device, types as mediasoupTypes } from 'mediasoup-client';

import { ProjectVideoCallSocket } from './project-video-call.socket.service';
import { JoinRommResp } from '../models/join-room-resp.model';
import { ConsumerModel } from '../models/consumer.model';
import { RequestTransportToConsume } from '../media-soup-methods/request-transport-to-consume';
import { Socket } from 'socket.io-client';
import { CreateProducerTransport } from '../media-soup-methods/create-producer-transport';
import { CreateProducer } from '../media-soup-methods/create-producer';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveUserFeed } from '../models/active-user-feed.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectVideoCallMainService {
  private _device!: Device;
  private _consumers: ConsumerModel = {};
  private _socket!: Socket;

  // Local Streams
  private _localStreamSubject = new BehaviorSubject<MediaStream | null>(null);
  public localStream$: Observable<MediaStream | null> =
    this._localStreamSubject.asObservable();

  // Feed Of Others
  private _activeUsersFeedSubject = new BehaviorSubject<
    ActiveUserFeed[] | null
  >(null);
  public activeUserFeed$: Observable<ActiveUserFeed[] | null> =
    this._activeUsersFeedSubject.asObservable();

  private _producerTransport!: mediasoupTypes.Transport;
  private _videoProducer!: mediasoupTypes.Producer;
  private _audioProducer!: mediasoupTypes.Producer;

  constructor(
    private _socketService: ProjectVideoCallSocket,
    private _RequestTransportToConsume: RequestTransportToConsume,
    private _CreateProducerTransport: CreateProducerTransport,
    private _CreateProducer: CreateProducer
  ) {
    this._socket = _socketService.getSocket();

    this._socket.on(`updateActiveSpeakers`, this.updateActiveSpeakers);

    this._socket.on(`newProducersToConsume`, this.newProducersToConsume);
  }

  updateActiveSpeakers = async (newListOfActives: string[]) => {
    // console.log(`updateActiveSpeakers : `);
    console.log(
      `********************updateActive speackers called********************`
    );

    console.log(newListOfActives);

    let slot = 0;

    const activeUsersFeed: ActiveUserFeed[] = [];

    newListOfActives.forEach((aid) => {
      if (aid !== this._audioProducer?.id) {
        const consumerForThisSlot = this._consumers[aid];

        activeUsersFeed.push({
          stream: consumerForThisSlot?.combinedStream,
          userName: consumerForThisSlot?.userName,
        });

        slot++;
      }
    });

    console.log(`===Active User Streams===`);
    console.log(activeUsersFeed);
    console.log(`===Active User Streams===`);

    this._setActiveStream(activeUsersFeed);
  };

  newProducersToConsume = (consumeData: any) => {
    console.log(`newProducersToConsume : `);
    console.log(consumeData);

    this._RequestTransportToConsume.requestTransportToConsume(
      consumeData,
      this._socket,
      this._device,
      this._consumers
    );
  };

  joinRoom = async (userName: string, roomName: string) => {
    const joinRoomResp = (await this._socket.emitWithAck('joinRoom', {
      userName,
      roomName,
    })) as JoinRommResp;

    this._device = new Device();

    await this._device.load({
      routerRtpCapabilities: joinRoomResp.routerRtpCapabilities,
    });

    console.log(this._device);

    console.log(joinRoomResp);

    this._RequestTransportToConsume.requestTransportToConsume(
      joinRoomResp,
      this._socket,
      this._device,
      this._consumers
    );
  };

  enableFeed = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    this._setLocalStream(localStream);

    // Calling send feed after enabling feed
    this.sendFeed();
  };

  sendFeed = async () => {
    this._producerTransport =
      await this._CreateProducerTransport.createProducerTransport(
        this._socket,
        this._device
      );

    const localStream = this.getLocalStream();

    if (localStream) {
      const producers = await this._CreateProducer.createProducer(
        localStream,
        this._producerTransport
      );

      this._videoProducer = producers.videoProducer;
      this._audioProducer = producers.audioProducer;
    }
  };

  muteAudio = () => {
    if (this._audioProducer.paused) {
      this._audioProducer.resume();

      this._socket.emit('audioChange', 'unmute');
    } else {
      this._audioProducer.pause();

      this._socket.emit('audioChange', 'mute');
    }
  };

  private _setLocalStream(stream: MediaStream): void {
    this._localStreamSubject.next(stream);
  }

  private _setActiveStream(activeUserFeed: ActiveUserFeed[]): void {
    this._activeUsersFeedSubject.next(activeUserFeed);
  }

  getActiveStream(): ActiveUserFeed[] | null {
    return this._activeUsersFeedSubject.getValue();
  }

  getLocalStream(): MediaStream | null {
    return this._localStreamSubject.getValue();
  }

  async leaveRoom() {
    await this._socket.emitWithAck('leaveRoom');
    this._producerTransport.close();

    for (const x in this._consumers) {
      this._consumers[x].consumerTransport.close();
    }
  }
}
