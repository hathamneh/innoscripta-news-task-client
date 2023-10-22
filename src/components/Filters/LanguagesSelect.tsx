import React from 'react';
import { useLanguagesLookup } from '@/hooks/lookups';
import { Select } from 'antd';

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const LanguagesSelect = ({ value, onChange }: Props) => {
  const { options } = useLanguagesLookup();

  return (
    <Select
      mode="multiple"
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select languages"
      optionFilterProp="label"
      allowClear
    />
  );
};
