import React from 'react';
import { useSourcesLookup } from '@/hooks/lookups';
import { Select } from 'antd';

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const SourcesSelect = ({ value, onChange }: Props) => {
  const { options } = useSourcesLookup();

  return (
    <Select
      mode="multiple"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select sources"
      optionFilterProp="label"
      allowClear
    />
  );
};
