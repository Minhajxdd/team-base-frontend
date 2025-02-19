import { Injectable } from '@angular/core';
import { Device } from 'mediasoup-client';

import { ProjectVideoCallSocket } from './project-video-call.socket.service';
import { JoinRommResp } from '../models/join-room-resp.model';
import { ConsumerModel } from '../models/consumer.model';
import { RequestTransportToConsume } from '../media-soup-methods/request-transport-to-consume';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ProjectVideoCallMainService {
  private _device!: Device;
  private _consumers: ConsumerModel = {};
  private _socket!: Socket;

  constructor(
    private _socketService: ProjectVideoCallSocket,
    private _RequestTransportToConsume: RequestTransportToConsume
  ) {
    this._socket = _socketService.getSocket();
  }

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
}
