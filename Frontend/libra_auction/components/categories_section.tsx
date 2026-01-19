import CategoryCard from "@/components/category_card";
import { FetchCategories } from "@/services/fetch_categories";
import { CategoryCardType } from "@/types/category_card_type";

export default function CategoriesSection() {
  const cards: CategoryCardType[] = FetchCategories();
  return (
    <div className="py-16">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold text-4xl">Categories</h2>
        <p>Explore Auctions Across Multiple Categories</p>
      </div>
      <div className="flex gap-5 justify-center pt-6 px-12">
        {cards.map((card) => {
          return <CategoryCard key={card.title} card={card} />;
        })}
      </div>
    </div>
  );
}
