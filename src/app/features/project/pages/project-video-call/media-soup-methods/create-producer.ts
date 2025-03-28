import { Injectable } from '@angular/core';
import { types as mediasoupTypes } from 'mediasoup-client';

@Injectable({
  providedIn: 'root',
})
export class CreateProducer {
  createProducer = async (localStream: MediaStream, producerTransport: mediasoupTypes.Transport):
  Promise<{ videoProducer: mediasoupTypes.Producer, audioProducer: mediasoupTypes.Producer }> =>
    new Promise(async (resolve, reject) => {
      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];

      try {
        console.log(`Calling produce on video track`);
        const videoProducer = await producerTransport.produce({
          track: videoTrack,
        });

        console.log(`Calling produce on audio track`);
      
        const audioProducer = await producerTransport.produce({
          track: audioTrack,
        });

        console.log(`Finished producing`);

        resolve({ videoProducer, audioProducer });
      } catch (err) {
        console.log(`error while producing: ${err}`);
      }
    });
}
