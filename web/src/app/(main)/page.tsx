import { getManyArticles, withoutController } from "@/api";
import { ArticleCards } from "@/components/article-cards";

export const revalidate = 120;

export default async function Home() {
  const initialArticles = await withoutController(getManyArticles)({ offset: 0 });

  return (
    <main className="w-full p-2">
      <ArticleCards
        className="mx-auto max-w-laptop flex flex-col gap-4 mt-4"
        initial={initialArticles}
      />
    </main>
  );
}