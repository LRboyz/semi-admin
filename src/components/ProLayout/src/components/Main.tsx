import { Breadcrumb } from '@douyinfe/semi-ui';
import { FunctionComponent, useEffect, useState } from 'react';
import PageLoading from './PageLoading';
import { Page } from './Page';
import { MenuItem, useLayoutContext } from '@/components/ProLayout/src/context';
import { useRouter } from 'next/router';
import { routes } from '@/routes';

interface BreadcrumbItem {
  key: string;
  path?: string;
  title: string;
}

export type MainProps = {};

export const Main: FunctionComponent<MainProps> = ({ children }) => {
  const router = useRouter();
  const path = router.asPath;
  const state = useLayoutContext();
  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([]);
  const { Item } = Breadcrumb;
  // let breadcrumbList: BreadcrumbItem[] = [];

  // 根据 path 找出面包屑路径
  const getBreadcrumbByPath = (menus: MenuItem[], path: string, breadcrumbs: BreadcrumbItem[] = []) => {
    for (const menu of menus) {
      const list: BreadcrumbItem[] = [];
      list.push({
        key: menu.itemKey,
        path: menu.path,
        title: menu.text,
      });
      if (menu.itemKey === path) {
        setBreadcrumbList(breadcrumbs.concat(list));
        break;
      } else if (menu.items) {
        getBreadcrumbByPath(menu.items, path, breadcrumbs.concat(list));
      }
    }
  };

  useEffect(() => {
    // if (path === '/') {
    //   getBreadcrumbByPath(state.menu.items, '/dashboard');
    // } else {
    //   console.log('进入这里！！');
    getBreadcrumbByPath(state.menu.items, path);
    // }
  }, [path]);

  return (
    <main className={`${state.prefixCls}-layout-content`}>
      <style jsx>{`
        .${state.prefixCls}-layout-content {
          position: relative;
          padding: ${state.spacing}px;
          display: flex;
          flex-direction: column;
          flex: auto;
          min-height: calc(100vh - ${state.header.height}px - ${state.footer.height}px);
          background-color: var(--semi-color-bg-0);
        }
      `}</style>
      <PageLoading />
      {state.breadcrumb && (
        <Breadcrumb
          separator={'>'}
          compact={false}
          aria-label="breadcrumb"
          className="mb-24px"
          routes={breadcrumbList.map(item => item.title)}
        />
      )}
      <Page>{children}</Page>
    </main>
  );
};
