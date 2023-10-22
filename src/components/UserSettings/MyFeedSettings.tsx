import React, { useEffect } from 'react';
import { CategorySelect } from '@/components/Filters/CategorySelect';
import { SourcesSelect } from '@/components/Filters/SourcesSelect';
import { CountriesSelect } from '@/components/Filters/CountriesSelect';
import { LanguagesSelect } from '@/components/Filters/LanguagesSelect';
import { Button, Card, Form } from 'antd';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

export const MyFeedSettings = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user?.settings) return;
    console.log(user?.settings);
    form.setFieldsValue(user.settings);
  }, [user?.settings]);

  if (!user) return null;

  const saveSettings = async (values: any) => {
    console.log(values);
    await axios.put('/api/user/settings', values);
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={saveSettings}>
        <Form.Item label="Categories" name="categories">
          <CategorySelect />
        </Form.Item>
        <Form.Item label="Sources" name="sources">
          <SourcesSelect />
        </Form.Item>
        <Form.Item label="Countries" name="countries">
          <CountriesSelect />
        </Form.Item>
        <Form.Item label="Languages" name="languages">
          <LanguagesSelect />
        </Form.Item>

        <div className="flex gap-2">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Card>
  );
};
