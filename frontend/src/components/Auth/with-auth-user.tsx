"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface WithAuthUserProps {
  user: any;
}

const withAuthUser = (WrappedComponent: React.ComponentType<WithAuthUserProps>) => {
  const AuthenticatedComponent = (props: any) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/login/api/protected-user');
          setUser(response.data.user);
        } catch (err) {
          router.push('/login');
        }
      };

      checkAuth();
    }, [router]);

    if (!user) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return AuthenticatedComponent;
};

export default withAuthUser;
