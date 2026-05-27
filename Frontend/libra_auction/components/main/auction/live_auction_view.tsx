'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Auction } from '@/types/auction/auction';
import { CurrencyFormat } from '@/utils/currency_format';
import { auctionSocket } from '@/services/auction_socket';

type AuctionSocketUpdate = {
  currentPrice?: number;
  current_price?: number;
};

function isAuctionSocketUpdate(value: unknown): value is AuctionSocketUpdate {
  return typeof value === 'object' && value !== null;
}

export default function LiveAuctionView({ auction, backendServerUrl }: { auction: Auction; backendServerUrl: string }) {
  const [currentBid, setCurrentBid] = useState<number>(auction.current_price || auction.starting_price || 0);
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    const end = new Date(auction.start_time).getTime() + auction.duration * 60 * 1000;
    return Math.max(0, end - Date.now());
  });
  const [bidValue, setBidValue] = useState<string>('');
  const [isBidding, setIsBidding] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const end = new Date(auction.start_time).getTime() + auction.duration * 60 * 1000;
      setTimeLeftMs(Math.max(0, end - Date.now()));
    }, 1000);
    return () => clearInterval(t);
  }, [auction.start_time, auction.duration]);

  // Replace polling with STOMP subscriptions to backend topics
  useEffect(() => {
    const bidsTopic = `/topic/auction/${auction.auction_id}/bids`;
    const statusTopic = `/topic/auction/${auction.auction_id}/status`;
    const genericTopic = `/topic/auction/${auction.auction_id}`;

    auctionSocket.connect(backendServerUrl);
    auctionSocket.subscribe(bidsTopic, (body: unknown) => {
      if (!isAuctionSocketUpdate(body)) return;
      const price = body.currentPrice ?? body.current_price;
      if (typeof price === 'number') {
        setCurrentBid(price);
      }
    });
    // subscribe to status/generic broadcasts as a fallback for server inconsistencies
    auctionSocket.subscribe(statusTopic, (body: unknown) => {
      if (!isAuctionSocketUpdate(body)) return;
      const price = body.currentPrice ?? body.current_price;
      if (typeof price === 'number') {
        setCurrentBid(price);
      }
    });
    auctionSocket.subscribe(genericTopic, (body: unknown) => {
      if (!isAuctionSocketUpdate(body)) return;
      const price = body.currentPrice ?? body.current_price;
      if (typeof price === 'number') {
        setCurrentBid(price);
      }
    });

    return () => {
      auctionSocket.unsubscribe(bidsTopic);
      auctionSocket.unsubscribe(statusTopic);
      auctionSocket.unsubscribe(genericTopic);
    };
  }, [auction.auction_id, backendServerUrl]);

  const formatTime = (ms: number) => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleBid = async () => {
    const value = Number(bidValue);
    if (Number.isNaN(value) || value <= 0) return;
    setIsBidding(true);
    try {
      // Send bid via STOMP to backend MessageMapping('/bid') -> destination '/app/bid'
      auctionSocket.send('/app/bid', {
        auctionId: auction.auction_id,
        amount: value,
      });
      // optimistic UI update: set bid locally (actual validation comes from server messages)
      setCurrentBid(value);
      setBidValue('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsBidding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-8 px-6 md:px-16 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-2">
              <div className="relative aspect-video w-full rounded-xl bg-gray-100 overflow-hidden">
                <Image src={auction.images[0] || '/placeholder-image.jpg'} alt={auction.product_name} fill className="object-contain p-6" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{auction.product_name}</h2>
                  <p className="text-sm text-gray-500">{auction.category_name} • #{auction.product_id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Time left</p>
                  <p className="text-lg font-bold text-(--secondary-color)">{formatTime(timeLeftMs)}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-gray-500">Recent activity</h3>
                <div className="mt-3 space-y-2 h-48 overflow-auto rounded-md border border-gray-100 p-3 bg-gray-50">
                  <p className="text-sm text-gray-500">No recent bids shown in this demo.</p>
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500">Current Price</p>
                <p className="text-3xl font-bold text-gray-900">{CurrencyFormat(currentBid)}</p>
                <p className="text-sm text-gray-400 mt-1">Bids: {auction.total_bids}</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <label className="block text-sm text-gray-600">Your bid</label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    min={0}
                    value={bidValue}
                    onChange={(e) => setBidValue(e.target.value)}
                    placeholder={String(auction.current_price + auction.min_bid_increment)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-(--primary-color)/40"
                  />
                  <button onClick={handleBid} disabled={isBidding} className="bg-(--secondary-color) text-white px-4 py-3 rounded-xl font-bold hover:opacity-95">
                    {isBidding ? 'Bidding...' : 'Place Bid'}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Minimum increment: {CurrencyFormat(auction.min_bid_increment)}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex-1">
                <p className="text-sm text-gray-600">Chat / Questions</p>
                <div className="mt-3 h-40 overflow-auto text-sm text-gray-500">Chat is available in the Questions section below.</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
