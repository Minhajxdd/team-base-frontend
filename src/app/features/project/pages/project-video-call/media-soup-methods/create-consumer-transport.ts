import { Injectable } from '@angular/core';
import { Device, types as mediasoupTypes } from 'mediasoup-client';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class CreateConsumerTransport {
  createConsumerTransport = (
    transportParams: mediasoupTypes.TransportOptions,
    device: Device,
    socket: Socket,
    audioPid: string
  ) => {
    const consumerTransport = device.createRecvTransport(transportParams);

    consumerTransport.on('connectionstatechange', (state) => {
      console.log(`==connectionstatechange==`);
      console.log(state);
    });

    consumerTransport.on(`icegatheringstatechange`, (state) => {
      console.log(`==icegatheringstatechange==`);
      console.log(state);
    });

    consumerTransport.on(
      'connect',
      async ({ dtlsParameters }, callback, errback) => {
        console.log(`Transform connect event has fired!`);

        const connectResp = await socket.emitWithAck('connectTransport', {
          dtlsParameters,
          type: 'consumer',
          audioPid,
        });

        console.log(`Connect Resp: ${connectResp}`);

        if (connectResp === 'success') {
          callback();
        } else {
          errback(new Error('Failed'));
        }
      }
    );
    return consumerTransport;
  };
}
