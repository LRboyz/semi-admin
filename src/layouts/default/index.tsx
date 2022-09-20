import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { IconBell } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Space, Tag } from '@douyinfe/semi-ui';
import { ProLayout } from '@/components/ProLayout';
import { useAppState } from '@/store';
import { routes, RouteType } from '@/routes';
import { ThemeModeSwitcher } from '@/layouts/components/ThemeModeSwitcher';
import { LocaleSwitcher } from '@/layouts/components/LocaleSwitcher';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';

export type ProLayoutProps = {};

export const BasicLayout: FunctionComponent<ProLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { logout, user } = useAuth();
  const [appState, setAppState] = useAppState();
  const [defaultSelectedKeys, setSelectedKeys] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    setSelectedKeys([router.pathname]);
  }, [router.pathname]);

  useEffect(() => {
    /**
     * 生成导航菜单项
     * @param __
     * @param parent
     */
    function createNavItems(__: RouteType[], parent?: RouteType) {
      return __?.map((route) => {
        return {
          // itemKey: route.id,
          itemKey: `${(parent && parent.path) || ''}/${route.path}`.replace('//', '/'),
          text: route.name,
          icon: route.icon && <Icon name={route.icon} />,
          items: createNavItems(route.children, route),
        };
      });
    }

    setMenuList(createNavItems(routes));
  }, []);

  /**
   * 切换菜单
   * @param item
   */
  async function onSelectItem(item) {
    await router.push(item.itemKey);
    // console.log('#onSelectItem', item);
    setSelectedKeys(item.selectedKeys);
  }

  function onSideCollapse(value) {
    setAppState((oldValue) => {
      return {
        ...oldValue,
        isSideCollapsed: value,
      };
    });
  }

  async function onLogout() {
    await logout();
    // await signOut({ callbackUrl: '/login' });
  }

  return (
    <ProLayout
      {...appState}
      breadcrumb
      page
      onSideCollapse={onSideCollapse}
      menu={{ defaultSelectedKeys, items: menuList, onSelect: onSelectItem }}
      header={{
        rightContent: (
          <Space spacing={12}>
            <Button
              theme="borderless"
              icon={<IconBell size="large" />}
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
            <ThemeModeSwitcher />
            <LocaleSwitcher />
            <Dropdown
              className='w-30'
              trigger="hover"
              position="bottomLeft"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>账号信息</Dropdown.Item>
                  <Dropdown.Item>设置</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>退出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <div className="flex items-center w-30 hover:bg-gray-100 duration-200 p-1 rounded-sm">
                <Avatar
                  src={user?.user_metadata?.avatar}
                  color="orange"
                  size="small"
                  style={{
                    marginLeft: '12px',
                  }}
                />
                <div>
                  <p className="ml-3 text-xs">{user.user_metadata.name}</p>
                  <Tag size="small" className="ml-2" color="cyan">
                    <span className="text-xs">已认证</span>
                  </Tag>
                </div>
              </div>
            </Dropdown>
          </Space>
        ),
      }}
      logo={{
        href: '/',
        logo: 'https://anguer.com/upload/2020/1/favicon-fdb258cf2c2643c6bfc4ad261b1d9f25.ico',
        text: 'Resemi Admin',
      }}
    >
      {children}
    </ProLayout>
  );
};
