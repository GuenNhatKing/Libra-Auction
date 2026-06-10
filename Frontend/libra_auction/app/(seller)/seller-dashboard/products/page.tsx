import { ProductList } from "@/components/seller/product/product_list";
import { fetchProducts } from "@/services/fetch_products";

export default async function page() {
    const productPage = await fetchProducts(0, 100);
    return (
        <ProductList initialData={productPage.content} />
    );
}
