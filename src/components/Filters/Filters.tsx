import React from 'react';
import { IconAdjustmentsFilled } from '@tabler/icons-react';
import SearchBar from '@/components/SearchBar';
import { CategorySelect } from '@/components/Filters/CategorySelect';
import { SourcesSelect } from '@/components/Filters/SourcesSelect';
import { CountriesSelect } from '@/components/Filters/CountriesSelect';
import { LanguagesSelect } from '@/components/Filters/LanguagesSelect';
import { ArticlesFilters } from '@/hooks/articles-filters';
import { Button } from 'antd';

const FilterField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex lg:items-center gap-2 flex-col lg:flex-row">
    <label className="text-sm font-bold lg:w-[100px] lg:text-end">
      {label}:
    </label>
    {children}
  </div>
);

type Props = {
  filters: ArticlesFilters;
  onChange?: () => void;
  loading?: boolean;
};

export const Filters = ({ filters, onChange, loading }: Props) => {
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);

  return (
    <>
      <div className="flex gap-4 justify-between items-center">
        <SearchBar
          value={filters.value.search}
          onChange={v => filters.set('search', v)}
          onSearch={onChange}
        />
        <Button
          type="primary"
          icon={<IconAdjustmentsFilled className="w-4 h-4" />}
          onClick={() => setFiltersExpanded(!filtersExpanded)}>
          <span className="hidden lg:inline">Filters</span>
        </Button>
      </div>
      {filtersExpanded && (
        <div className="flex flex-col gap-3 p-3 rounded-md bg-slate-200 dark:bg-slate-700">
          <FilterField label="Category">
            <CategorySelect
              value={filters.value.category}
              onChange={value => filters.set('category', value)}
            />
          </FilterField>
          <FilterField label="Source">
            <SourcesSelect
              value={filters.value.source}
              onChange={value => filters.set('source', value)}
            />
          </FilterField>
          <FilterField label="Country">
            <CountriesSelect
              value={filters.value.country}
              onChange={value => filters.set('country', value)}
            />
          </FilterField>
          <FilterField label="Language">
            <LanguagesSelect
              value={filters.value.language}
              onChange={value => filters.set('language', value)}
            />
          </FilterField>

          <div className="flex justify-end gap-2">
            <Button onClick={filters.reset}>Clear</Button>
            <Button type="primary" loading={loading} onClick={onChange}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
