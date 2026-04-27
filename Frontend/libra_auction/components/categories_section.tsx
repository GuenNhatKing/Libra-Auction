import CategoryCard from "@/components/category_card";
import { FetchCategories } from "@/services/fetch_categories";
import { CategoryCardType } from "@/types/category_card_type";

export default async function CategoriesSection() {
  const cards: CategoryCardType[] = await FetchCategories();
  return (
    cards?.length > 0 &&
    <div className="py-16">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold text-4xl">Categories</h2>
        <p>Explore Auctions Across Multiple Categories</p>
      </div>
      <div className="flex gap-5 justify-center pt-6 px-12">
        {cards.slice(0, 5).map((card) => {
          return <CategoryCard key={card.id} card={card} />;
        })}
      </div>
    </div>
  );
}
