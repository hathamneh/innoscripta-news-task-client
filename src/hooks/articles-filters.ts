import React from 'react';

export type FiltersValue = {
  search?: string;
  category?: string[];
  source?: string[];
  country?: string[];
  language?: string[];
};

export type FilterName = keyof FiltersValue;

export type ArticlesFilters = ReturnType<typeof useArticlesFilters>;

export function useArticlesFilters() {
  const [value, setValue] = React.useState<FiltersValue>({
    search: '',
    category: [],
    source: [],
    country: [],
    language: [],
  });

  const set = (name: FilterName, val: string | string[]) => {
    setValue({ ...value, [name]: val });
  };

  const get = (name: FilterName) => {
    return value[name];
  };

  const update = (val: Partial<FiltersValue>) => {
    setValue({ ...value, ...val });
  };

  const reset = () => {
    setValue({
      search: '',
      category: [],
      source: [],
      country: [],
      language: [],
    });
  };

  return {
    value,
    set,
    get,
    update,
    reset,
  };
}
