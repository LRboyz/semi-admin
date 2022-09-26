import { FunctionComponent } from 'react';
import { Layout } from '@douyinfe/semi-ui';

export type LandingLayoutProps = {};

export const LandingLayout: FunctionComponent<LandingLayoutProps> = ({ children }) => {


  return <Layout className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{children}</Layout>;
};
