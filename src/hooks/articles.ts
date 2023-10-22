import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { FiltersValue } from '@/hooks/articles-filters';

export type Article = {
  id: number;
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description?: string;
  url: string;
  image: string;
  publishedAt: string;
  categories: { id: string; name: string }[];
  language: string;
};

export type ArticlesResponse = {
  data: Article[];
  links: {
    next: string | null;
  };
};

type Props = {
  filters?: FiltersValue;
  fetchOnMount?: boolean;
};

export function useArticles({ filters, fetchOnMount }: Props = {}) {
  const [loaded, setLoaded] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async (overrides: { page?: number } = {}) => {
    setLoaded(true);
    setIsLoading(true);
    try {
      const { data: loadedArticles } = await axios.get<ArticlesResponse>(
        '/api/articles',
        { params: { page: overrides.page || page, ...filters } },
      );
      return loadedArticles;
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore && !error) setPage(page + 1);
  };

  useEffect(() => {
    if (fetchOnMount === false && !loaded) return;
    loadArticles().then(loadedArticles => {
      if (loadedArticles) {
        setArticles(prevArticles => [...prevArticles, ...loadedArticles.data]);
        setHasMore(loadedArticles.links.next !== null);
      }
    });
  }, [page, fetchOnMount]);

  const reload = async () => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    const results = await loadArticles({ page: 1 });
    if (results) {
      setArticles(results.data);
      setHasMore(results.links.next !== null);
    }
  };

  return {
    articles,
    reload,
    error,
    isLoading,
    loadMore,
    hasMore,
  };
}
