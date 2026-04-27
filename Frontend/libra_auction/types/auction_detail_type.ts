import { AuctionSessionRequestType } from "./aution_session_request_type";

export type AuctionDetail = {
  auctionSession: AuctionSessionRequestType;
  id: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED';
};