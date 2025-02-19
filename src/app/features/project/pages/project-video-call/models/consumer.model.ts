import { types as mediasoupTypes } from 'mediasoup-client';

export interface ConsumerModel {
  [key: string]: {
    combinedStream: MediaStream;
    userName: string;
    consumerTransport: mediasoupTypes.Transport;
    audioConsumer: mediasoupTypes.Consumer | void;
    videoConsumer: mediasoupTypes.Consumer | void;
  };
}
