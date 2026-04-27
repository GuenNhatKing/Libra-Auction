import { Auction } from "@/types/auction_type";

export const mockAuctions: Auction[] = [
  {
    id: "AUC-1001",
    auction_name: "Đồng hồ Vintage Rolex Submariner",
    auction_status: "UPCOMING",
    start_time: "2024-04-20T08:00:00Z",
    starting_price: 8500
  },
  {
    id: "AUC-1002",
    auction_name: "MacBook Pro M3 Max 2024 (Seal)",
    auction_status: "UPCOMING",
    start_time: "2024-05-01T10:30:00Z",
    starting_price: 3200
  },
  {
    id: "AUC-1003",
    auction_name: "Điện thoại iPhone 15 Pro Max 256GB",
    auction_status: "COMPLETED",
    start_time: "2024-03-15T14:00:00Z",
    starting_price: 999
  },
  {
    id: "AUC-1004",
    auction_name: "Máy ảnh Sony A7IV & Lens 24-70mm",
    auction_status: "LIVE",
    start_time: "2024-04-18T09:00:00Z",
    starting_price: 2100
  },
  {
    id: "AUC-1005",
    auction_name: "Bức tranh sơn dầu Khung Cảnh Mùa Thu",
    auction_status: "UPCOMING",
    start_time: "2024-06-15T19:00:00Z",
    starting_price: 500
  }
];