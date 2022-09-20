import React, { useState } from 'react';
import { Button, Card, Form, Space, useFormApi, Avatar, Toast, Tooltip } from '@douyinfe/semi-ui';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { FormattedMessage } from 'react-intl';
import { ClientOnly } from '@/components/ClientOnly';
import { useIntl } from '@/locale';
import { useAuth } from '@/hooks/useAuth';

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

const LoginPage = ({}) =>  {
  const { login } = useAuth();
  const router = useRouter();
  const intl = useIntl();

  const [initValues] = useState({
    username: 'anguer',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  function ComponentUsingFormApi() {
    const formApi = useFormApi();
    function onChange() {
      formApi.setValue('password', '123456');
    }
    return (
      <Space spacing={12}>
        <Button onClick={onChange}>Set Password</Button>
        <Link href="/register">
          <Button theme="borderless" type="primary">
            {intl.formatMessage({ id: 'page.login.action.signUp' })}
          </Button>
        </Link>
        <Tooltip content={process.env.NEXT_PUBLIC_APP_URL}>
          <Button theme="solid" type="primary" htmlType="submit" loading={loading}>
            {intl.formatMessage({ id: 'page.login.action.signIn' })}
          </Button>
        </Tooltip>
      </Space>
    );
  }

  async function onSubmit(form) {
    setLoading(true);
    await login(form).finally(() => setLoading(false));
  }

  return (
    <ClientOnly>
      <div className="flex-1 flex justify-center items-center h-full">
        <NextSeo title="Sign in" />
        <Form initValues={initValues} onSubmit={onSubmit}>
          <Card
            style={{ width: 360 }}
            title={
              <Card.Meta
                title={<FormattedMessage id="page.login.title" />}
                description={<FormattedMessage id="page.login.desc" />}
                avatar={<Avatar color="red">An</Avatar>}
              />
            }
            footerLine
            footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
            footer={<ComponentUsingFormApi />}
          >
            {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
            <Form.Input
              field="email"
              label={'邮箱'}
              placeholder={'请输入您的邮箱'}
              rules={[{ required: true, message: '邮箱是必填项！' }]}
              prefix={<IconUser />}
            />
            <Form.Input
              field="password"
              label={<FormattedMessage id="page.login.label.password" />}
              placeholder={intl.formatMessage({ id: 'page.login.label.password' })}
              rules={[{ required: true, min: 6 }]}
              mode="password"
              prefix={<IconLock />}
            />
          </Card>
        </Form>
      </div>
    </ClientOnly>
  );
}

LoginPage.guestGuard = true 

export default LoginPage