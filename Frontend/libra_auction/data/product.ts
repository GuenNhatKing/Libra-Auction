import { Product } from "@/types/product_type";

export const mockProducts: Product[] = [
    {
        id: "1",
        product_name: "iPhone 13 Pro Max",
        quantity: 10,
        category_name: "Điện thoại",
        description: "Điện thoại cao cấp với camera chất lượng, hiệu năng mạnh mẽ và thiết kế sang trọng.",
        images: ["https://example.com/iphone13promax.jpg"],
        image_url: "https://example.com/iphone13promax.jpg"
    },
    {
        id: "2",
        product_name: "MacBook Pro M1",
        quantity: 5,
        category_name: "Laptop",
        description: "Laptop hiệu năng cao với chip M1, thời lượng pin dài và thiết kế mỏng nhẹ.",
        images: ["https://example.com/macbookprom1.jpg"],
        image_url: "https://example.com/macbookprom1.jpg"
    },  
    {
        id: "3",
        product_name: "Apple Watch Series 7",
        quantity: 15,
        category_name: "Đồng hồ thông minh",
        description: "Đồng hồ thông minh với màn hình lớn hơn, khả năng chống nước và nhiều tính năng theo dõi sức khỏe.",
        images: ["https://example.com/applewatchseries7.jpg"],
        image_url: "https://example.com/applewatchseries7.jpg"
    },
    {
        id: "4",
        product_name: "AirPods Pro",
        quantity: 20,
        category_name: "Tai nghe",
        description: "Tai nghe không dây với tính năng chống ồn chủ động, âm thanh chất lượng cao và thiết kế thoải mái.",
        images: ["https://example.com/airpodspro.jpg"],
        image_url: "https://example.com/airpodspro.jpg"
    },
];