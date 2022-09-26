import React, { useState } from 'react';
import { Button, Card, Form, Space, useFormApi, Avatar, Tooltip, Typography, Divider } from '@douyinfe/semi-ui';
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

const LoginPage = ({}) => {
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

    return (
      <div className='w-full'>
     
          {/* <Link href="/register">
            <Button theme="borderless" type="primary">
              {intl.formatMessage({ id: 'page.login.action.signUp' })}
            </Button>
          </Link> */}

        <Button style={{ borderRadius: 15 }}  theme="solid" block type="primary" htmlType="submit" loading={loading}>
            {intl.formatMessage({ id: 'page.login.action.signIn' })}
          </Button>
   
        {/* <Divider className='text-purple-500 pt-6'>Or</Divider> */}
      </div>
    );
  }

  async function onSubmit(form) {
    setLoading(true);
    await login(form).finally(() => setLoading(false));
  }

  return (
    <ClientOnly>
      <div className="flex-1 flex justify-center items-center min-h-screen">
        <NextSeo title="Sign in" />
        <Form
          style={{ borderRadius: 30 }}
          initValues={initValues}
          onSubmit={onSubmit}
          className="shadow-md backdrop-blur-md bg-white/20 px-5 py-5"
        >
          <Card
            style={{ background: 'transparent', width: 320, border: 0 }}
            footerStyle={{ }}
            footer={<ComponentUsingFormApi />}
          >
            <div className="w-full text-center mb-10">
              <Typography className="font-bold" style={{ fontSize: 26, color: 'purple' }}>
                Welcome SemiAdmin{' '}
              </Typography>
            </div>
            <Form.Input
              label={'邮箱'}
              field="email"
              size="large"
              placeholder={'请输入您的邮箱'}
              rules={[{ required: true, message: '邮箱是必填项！' }]}
              prefix={<IconUser />}
            />
            <Form.Input
              label={'密码'}
              field="password"
              size="large"
              placeholder={intl.formatMessage({ id: 'page.login.label.password' })}
              rules={[{ required: true, min: 6, message:"密码不符合规则"}]}
              mode="password"
              prefix={<IconLock />}
            />
          </Card>
        </Form>
      </div>
    </ClientOnly>
  );
};

LoginPage.guestGuard = true;

export default LoginPage;
