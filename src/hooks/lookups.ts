import useSWR from 'swr';
import axios from '@/lib/axios';
import { useMemo } from 'react';

export type LookupItem = {
  id: string;
  name: string;
};

export function useLookup(url: string) {
  const {
    data: items,
    error,
    mutate,
    isLoading,
  } = useSWR<LookupItem[]>(url, () =>
    axios
      .get(url)
      .then(res => res.data)
      .catch(error => {
        throw error;
      }),
  );

  const options = useMemo(
    () =>
      items?.map(item => ({
        value: item.id,
        label: item.name,
      })) || [],
    [items],
  );

  return {
    items,
    options,
    error,
    mutate,
    isLoading,
  };
}

export function useSourcesLookup() {
  return useLookup('/api/sources/lookup');
}

export function useCategoriesLookup() {
  return useLookup('/api/categories/lookup');
}

export function useCountriesLookup() {
  return useLookup('/api/countries/lookup');
}

export function useLanguagesLookup() {
  return useLookup('/api/languages/lookup');
}
