type MessageHandler = (data: any) => void;

class AuctionSocket {
  private listeners: Record<string, MessageHandler[]> = {};

  // Mock kết nối
  connect(auctionId: string) {
    console.log(`Connected to /topic/auction/${auctionId}`);
    
    // Giả lập nhận bid realtime sau 3 giây
    setTimeout(() => {
      this.notify(`/topic/auction/${auctionId}/bids`, {
        id: Date.now(),
        bidder: "User_99",
        amount: 9500,
        time: new Date().toLocaleTimeString()
      });
    }, 3000);
  }

  subscribe(topic: string, callback: MessageHandler) {
    if (!this.listeners[topic]) this.listeners[topic] = [];
    this.listeners[topic].push(callback);
  }

  private notify(topic: string, data: any) {
    this.listeners[topic]?.forEach(cb => cb(data));
  }

  unsubscribe(topic: string) {
    delete this.listeners[topic];
  }
}

export const auctionSocket = new AuctionSocket();