export type RouteType = {
  id: string | number;
  path: string;
  name: string;
  icon?: string;
  children?: RouteType[];
};

export function isAdmin(route: string): boolean {
  return route.startsWith('/dashboard');
}

export const routes: RouteType[] = [
  {
    id: 'Home',
    path: '/dashboard',
    name: '首页',
    icon: 'home',
  },
  {
    id: 'Changelog',
    path: '/dashboard/changelog',
    name: '更新日志',
    icon: 'article',
  },
  {
    id: 'Components',
    path: '/dashboard/comp',
    name: '组件',
    icon: 'widgets',
    children: [
      {
        id: 'Icon',
        path: '/icon',
        name: '图标',
      },
      {
        id: 'Form',
        path: '/form',
        name: '表单',
      },
      {
        id: 'Chart',
        path: '/chart',
        name: '图表',
      },
      {
        id: 'Input',
        path: '/input',
        name: '输入框',
      },
      {
        id: 'SignaturePad',
        path: '/signature_pad',
        name: '签名板',
      },
      {
        id: 'Watermark',
        path: '/watermark',
        name: '水印',
      },
      {
        id: 'ImageCropper',
        path: '/image_cropper',
        name: '图片裁剪',
      },
      {
        id: 'VideoPlayer',
        path: '/video_player',
        name: '视频播放器',
      },
    ],
  },
  {
    id: 'blog',
    path: '/blog',
    name: '博客管理',
    icon: 'article',
    children: [
      {
        id: 'category',
        path: '/category',
        name: '分类管理',
      },
      {
        id: 'article',
        path: '/article',
        name: '文章管理',
      },
      {
        id: 'tag',
        path: '/tag',
        name: '标签管理',
      },
    ],
  },
  {
    id: 'Settings',
    path: '/dashboard/settings',
    name: '设置',
    icon: 'settings',
  },
];
