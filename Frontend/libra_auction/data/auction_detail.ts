import { AuctionDetailData } from "@/types/auction_type";

export const mockAuctionDetails: AuctionDetailData[] = [
    {
        id: "AUC-1001",    
        auction_name: "Bức tranh Mona Lisa",
        starting_price: 1000000,
        description: "Bức tranh nổi tiếng của Leonardo da Vinci, được vẽ vào đầu thế kỷ 16. Đây là một trong những tác phẩm nghệ thuật có giá trị nhất thế giới.",
        questions: [
            {
                id: "q1",
                user_name: "Nguyen Van A",
                content: "Bức tranh này có phải là bản gốc không?",
                created_at: "2024-06-01 10:00",
                answer: {
                    content: "Đúng vậy, đây là bản gốc của bức tranh Mona Lisa.",
                    replied_at: "2024-06-01 12:00"
                }
            },
            {
                id: "q2",
                user_name: "Tran Thi B",
                content: "Phiên đấu giá này sẽ kết thúc khi nào?",
                created_at: "2024-06-02 09:30",
                answer: {
                    content: "Phiên đấu giá sẽ kết thúc vào ngày 30 tháng 6 năm 2024.",
                    replied_at: "2024-06-02 10:00"
                }
            },
            {
                id: "q3",
                user_name: "Le Van C",
                content: "Có thể xem bức tranh trực tiếp trước khi đấu giá không?",
                created_at: "2024-06-03 14:20",
                // Chưa có câu trả lời
            }
        ]   
    },
    {
        id: "AUC-1002",
        auction_name: "Đồng hồ Rolex Submariner",
        starting_price: 500000,
        description: "Đồng hồ lặn cao cấp của thương hiệu Rolex, được biết đến với độ bền và thiết kế sang trọng. Mẫu Submariner là một trong những mẫu đồng hồ lặn phổ biến nhất trên thế giới.",
        questions: [
            {
                id: "q4",
                user_name: "Pham Thi D",
                content: "Đồng hồ này có phải là hàng chính hãng không?",
                created_at: "2024-06-04 11:15",
                answer: {
                    content: "Đúng vậy, đồng hồ này là hàng chính hãng của Rolex.",
                    replied_at: "2024-06-04 12:00"
                }
            },
            {
                id: "q5",
                user_name: "Hoang Van E",
                content: "Phiên đấu giá này có hỗ trợ đấu giá trực tuyến không?",
                created_at: "2024-06-05 08:45",
                answer: {
                    content: "Có, bạn có thể tham gia đấu giá trực tuyến thông qua nền tảng của chúng tôi.",
                    replied_at: "2024-06-05 09:30"
                }
            }
        ]
    }
];