import { types as mediasoupTypes } from 'mediasoup-client';

export interface JoinRommResp {
  routerRtpCapabilities: mediasoupTypes.RtpCapabilities;
  newRoom: boolean;
  audioPidsToCreate: string[];
  videoPidsToCreate: string[];
  associatedUserNames: string[];
}
