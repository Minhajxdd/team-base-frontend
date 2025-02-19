import { Injectable } from '@angular/core';
import { Device, types as mediasoupTypes } from 'mediasoup-client';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class CreateProducerTransport {
  createProducerTransport = (
    socket: Socket,
    device: Device
  ): Promise<mediasoupTypes.Transport> =>
    new Promise(async (resolve, reject) => {
      const producerTransportParams = await socket.emitWithAck(
        'requestTransport',
        {
          type: 'producer',
        }
      );

      const producerTransport = device.createSendTransport(
        producerTransportParams
      );

      producerTransport.on(
        'connect',
        async ({ dtlsParameters }, callback, errback) => {
          const connectResp = await socket.emitWithAck('connectTransport', {
            dtlsParameters,
            type: 'producer',
          });

          console.log(connectResp + ' connectResp is back');

          if (connectResp === 'success') {
            console.log(`Connected Successfully!`);
            callback();
          } else if (connectResp === 'error') {
            errback(new Error());
          }
        }
      );

      producerTransport.on('produce', async (parameters, callback, errback) => {
        console.log(`Produce is running`);

        const { kind, rtpParameters } = parameters;
        const produceResp = await socket.emitWithAck('startProducing', {
          kind,
          rtpParameters,
        });

        console.log(`produceResponse: ${produceResp}`);
        if (produceResp === 'error') {
          errback(new Error());
        } else {
          callback({ id: produceResp });
        }
      });

      // setInterval(async() => {
      //   const stats = await producerTransport.getStats();

      //   for(const report of stats.values()) {
      //     if(report.type === "outbound-rtp") {
      //       console.log(report.bytesSent,'-', report.packetsSent);
      //     }
      //   }

      // }, 1000);

      resolve(producerTransport);
    });
}
