import { Injectable } from '@angular/core';
import { Device, types as mediasoupTypes } from 'mediasoup-client';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class CreateConsumer {
  createConsumer = (
    consumerTransport: mediasoupTypes.Transport,
    pid: string,
    device: Device,
    socket: Socket,
    kind: string,
    slot: number
  ): Promise<mediasoupTypes.Consumer | void> => {
    return new Promise(async (resolve, reject) => {
      const consumerParams = await socket.emitWithAck(`consumeMedia`, {
        rtpCapabilities: device.rtpCapabilities,
        pid,
        kind,
      });

      console.log(consumerParams);

      if (consumerParams === 'cannotConsume') {
        console.log(consumerParams);
        resolve();
      } else if (consumerParams === 'consumeFailed') {
        console.log(consumerParams);
        resolve();
      } else {
        const consumer: mediasoupTypes.Consumer = await consumerTransport.consume(consumerParams);
        console.log(`consume() has finished`);

        const { track } = consumer;

        await socket.emitWithAck('unpauseConsumer', { pid, kind });
        resolve(consumer);
      }
    });
  };
}
