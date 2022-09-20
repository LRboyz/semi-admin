// ** React Imports
import { useEffect } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth';
import { UserDataType } from 'src/context/types';
import { Spin } from '@douyinfe/semi-ui';

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (userInfo: UserDataType) => {
  return '/dashboard';
};

const Home = () => {
  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('init');
    if (auth.user) {
      const homeRoute = getHomeRoute(auth.user);
      router.replace(homeRoute);
    }
  }, []);

  return <Spin />;
};

export default Home;
