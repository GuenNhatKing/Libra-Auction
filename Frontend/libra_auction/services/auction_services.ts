import { AuctionDetail } from "@/types/auction_detail_type";
import { AuctionSessionRequestType } from "@/types/aution_session_request_type";

export const auctionApi = {
  create: async (data: AuctionSessionRequestType) => {
    const res = await fetch('/api/auction-sessions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  update: async (id: string, data: Partial<AuctionSessionRequestType>) => {
    return fetch(`/api/auction-sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  delete: async (id: string) => {
    return fetch(`/api/auction-sessions/${id}`, { method: 'DELETE' });
  },

  getDetail: async (id: string): Promise<AuctionDetail> => {
    const res = await fetch(`/api/auction-sessions/${id}`);
    return res.json();
  }
};