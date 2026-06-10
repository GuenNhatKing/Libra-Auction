import AuctionForm from "@/components/seller/auction/auctionForm";
import { fetchProducts } from "@/services/fetch_products";

export default async function page() {
    const productPage = await fetchProducts(0, 100);
    return (
        <AuctionForm products={productPage.content} />
    );
}