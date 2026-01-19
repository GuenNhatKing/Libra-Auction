import type { CategoryCardType } from "@/types/category_card_type";
export function FetchCategories(): CategoryCardType[] {
  // TODO: Fetch data from api
  return [
    {
      image_src: "/category-1.jpg",
      title: "Firearms Auction",
      href: "/auction?category=Firearms",
    },
    {
      image_src: "/category-2.jpg",
      title: "Vehicle Auction",
      href: "/auction?category=Vehicle",
    },
    {
      image_src: "/category-3.jpg",
      title: "Collectibles Auction",
      href: "/auction?category=Collectibles",
    },
    {
      image_src: "/category-4.jpg",
      title: "Real Estate Auction",
      href: "/auction?category=RealEstate",
    },
    {
      image_src: "/category-5.jpg",
      title: "Fine Art Auction",
      href: "/auction?category=FineArt",
    },
  ];
}
