import React from 'react';
import { useCategoriesLookup } from '@/hooks/lookups';
import { Select } from 'antd';

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const CategorySelect = ({ value, onChange }: Props) => {
  const { options } = useCategoriesLookup();

  return (
    <Select
      mode="multiple"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select categories"
      optionFilterProp="label"
      allowClear
    />
  );
};
