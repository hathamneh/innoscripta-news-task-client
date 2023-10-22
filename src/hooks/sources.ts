import useSWR from 'swr';
import axios from '@/lib/axios';

export type Source = {
  id: string;
  name: string;
};

export function useSource(id?: string) {
  const { data, isLoading, error } = useSWR(['sources', id], () =>
    id
      ? axios.get<{ data: Source }>(`/api/sources/${id}`).then(res => res.data)
      : null,
  );

  return {
    source: data?.data,
    isLoading,
    error,
  };
}
