import React from 'react';
import { useCountriesLookup } from '@/hooks/lookups';
import { Select } from 'antd';

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const CountriesSelect = ({ value, onChange }: Props) => {
  const { options } = useCountriesLookup();

  return (
    <Select
      mode="multiple"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select countries"
      optionFilterProp="label"
      allowClear
    />
  );
};
