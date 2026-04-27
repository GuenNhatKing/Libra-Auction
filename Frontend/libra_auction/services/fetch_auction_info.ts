import { AuctionInfoType } from "@/types/auction_info_type";
export function FetchAuctionInfo(id: string): AuctionInfoType | null {
    if (id === "003") {
        return {
            category_id: "cat-003",
            category_name: "Collectibles Auction",

            auction_id: "003",
            auction_name: "Star Rail Hotaru Spring Gift Ver. 1/8 Scale Complete Figure",
            auction_status: "UPCOMING",
            auction_type: "INCREMENT",

            start_time: "2026-04-15T20:00:00",
            duration: 7200000, // 2 tiếng

            starting_price: 2000000,
            current_price: 0, // chưa có ai bid
            min_bid_increment: 100000,

            product_id: "prod-003",
            product_name: "Hotaru Spring Gift Figure",
            quantity: 1,
            description: "Mô hình figure chính hãng Firefly Spring Missive Ver Honkai Star Rail | Myethos\n" +
                "崩壊：スターレイル ホタル Gift+ 春の便り Ver\n" +
                "Firefly là một trong những nhân vật để lại nhiều cảm xúc nhất trong Honkai: Star Rail, ghi dấu ấn bởi vẻ ngoài dịu dàng, mong manh nhưng ẩn chứa nội tâm sâu sắc và bi thương.Phiên bản Spring Missive Ver.thuộc dòng Gift + mang đến hình ảnh Firefly trong khoảnh khắc yên bình hiếm hoi, như một bức thư mùa xuân nhẹ nhàng gửi đến người xem.Mẫu figure này được sản xuất bởi Myethos, hãng nổi tiếng với phong cách tạo hình giàu cảm xúc và chất lượng hoàn thiện cao.\n" +
                "Figure được thực hiện ở tỉ lệ 1 / 8, với bố cục hài hòa và tạo hình mềm mại.Chất liệu ABS và PVC giúp các chi tiết được thể hiện mượt mà, từ mái tóc, trang phục cho đến biểu cảm gương mặt.Gam màu sáng và concept mùa xuân mang lại cảm giác trong trẻo, rất khác so với hình ảnh chiến đấu quen thuộc của Firefly.\n" +
                "Đây là mẫu figure có giá trị sưu tầm cao dành cho fan Honkai: Star Rail.Sản phẩm thuộc dòng Gift + với định hướng trưng bày nghệ thuật, được đóng gói cẩn thận, phù hợp trưng bày lâu dài.",

            images: [
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776054541/live-auction-3_xozt7d.jpg",
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776061451/FIGURE-4_sd4vc4.jpg",
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776061451/FIGURE-5_aeqeav.jpg",
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776061451/FIGURE-3_adnb5h.jpg",
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776061451/FIGURE-1_ircann.jpg",
                "https://res.cloudinary.com/dhl7uh3pp/image/upload/v1776061451/FIGURE-2_nch5gm.jpg"
            ],

            attributes: [
                { name: "Brand", value: "miHoYo" },
                { name: "Scale", value: "1/8" },
                { name: "Material", value: "PVC" },
                { name: "Condition", value: "New" }
            ],

            total_bids: 0,
            total_participants: 0
        }
    }
    if (id === "004") {
        return {
            category_id: "cat-003",
            category_name: "Collectibles Auction",

            auction_id: "004",
            auction_name: "Star Rail Kafka Limited Edition Figure",
            auction_status: "LIVE",
            auction_type: "ENGLISH",

            start_time: "2026-04-13T18:00:00",
            duration: 7200,

            starting_price: 3000000,
            current_price: 4750000, // đang có giá hiện tại
            min_bid_increment: 100000,

            product_id: "prod-004",
            product_name: "Kafka Limited Figure",
            quantity: 1,
            description: "Figure Kafka phiên bản giới hạn, cực hiếm, full box.",

            images: [
                "https://cdn.example.com/images/kafka-1.jpg",
                "https://cdn.example.com/images/kafka-2.jpg",
                "https://cdn.example.com/images/kafka-3.jpg"
            ],

            attributes: [
                { name: "Brand", value: "miHoYo" },
                { name: "Scale", value: "1/7" },
                { name: "Material", value: "ABS & PVC" },
                { name: "Condition", value: "Like New" }
            ],

            total_bids: 18,
            total_participants: 6
        }
    }
    return null;
}