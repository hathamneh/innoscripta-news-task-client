import Head from 'next/head';
import AppLayout from '@/components/Layouts/AppLayout';
import { ArticlesList } from '@/components/NewsList/ArticlesList';
import { useArticles } from '@/hooks/articles';
import { Filters } from '@/components/Filters/Filters';
import { useArticlesFilters } from '@/hooks/articles-filters';

export default function Latest() {
  const filters = useArticlesFilters();
  const { articles, error, isLoading, loadMore, hasMore, reload } = useArticles(
    { filters: filters.value },
  );

  const onFiltersApply = () => {
    reload();
  };

  return (
    <AppLayout>
      <Head>
        <title>Latest</title>
      </Head>

      <div className="flex flex-col gap-4 items-center">
        <div className="max-w-[700px] w-full">
          {error && <div>Error loading articles</div>}
          {articles && (
            <div className="flex flex-col gap-6 mb-24">
              <Filters
                filters={filters}
                onChange={onFiltersApply}
                loading={isLoading}
              />
              <ArticlesList
                articles={articles}
                onLoadMore={hasMore ? loadMore : undefined}
                loading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
