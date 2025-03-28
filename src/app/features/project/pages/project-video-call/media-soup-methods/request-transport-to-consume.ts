import { Injectable } from '@angular/core';
import { CreateConsumerTransport } from './create-consumer-transport';
import { CreateConsumer } from './create-consumer';
import { Socket } from 'socket.io-client';
import { Device, types as mediasoupTypes } from 'mediasoup-client';
import { JoinRommResp } from '../models/join-room-resp.model';
import { ConsumerModel } from '../models/consumer.model';

@Injectable({
  providedIn: 'root',
})
export class RequestTransportToConsume {
  constructor(
    private _CreateConsumerTransport: CreateConsumerTransport,
    private _CreateConsumer: CreateConsumer
  ) {}

  requestTransportToConsume = (
    consumeData: JoinRommResp,
    socket: Socket,
    device: Device,
    consumers: ConsumerModel
  ) => {
    consumeData.audioPidsToCreate.forEach(async (audioPid, i) => {
      const videoPid = consumeData.videoPidsToCreate[i];
      const consumerTransportParams = await socket.emitWithAck(
        'requestTransport',
        {
          type: 'consumer',
          audioPid,
        }
      );

      console.log(consumerTransportParams);
      const consumerTransport =
        this._CreateConsumerTransport.createConsumerTransport(
          consumerTransportParams,
          device,
          socket,
          audioPid
        );
      const [audioConsumer, videoConsumer]: [
        mediasoupTypes.Consumer | void,
        mediasoupTypes.Consumer | void
      ] = await Promise.all([
        this._CreateConsumer.createConsumer(
          consumerTransport,
          audioPid,
          device,
          socket,
          'audio',
          i
        ),
        this._CreateConsumer.createConsumer(
          consumerTransport,
          videoPid,
          device,
          socket,
          'video',
          i
        ),
      ]);

      console.log(audioConsumer);
      console.log(videoConsumer);

      const combinedStream = new MediaStream(
        [audioConsumer?.track, videoConsumer?.track].filter(
          Boolean
        ) as MediaStreamTrack[]
      );

    // !!  Here the compined stream will be there which can be rendered !!

    //   const remoteVideo = document.getElementById(`remote-video-${i}`);
    //   remoteVideo.srcObject = combinedStream;

      consumers[audioPid] = {
        combinedStream,
        userName: consumeData.associatedUserNames[i],
        consumerTransport,
        audioConsumer,
        videoConsumer,
      };
    });
  };
}
