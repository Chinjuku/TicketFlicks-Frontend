"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface WithAuthAdminProps {
  user: any;
}

const withAuthAdmin = (WrappedComponent: React.ComponentType<WithAuthAdminProps>) => {
  const AuthenticatedComponent = (props: any) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get('/login/api/protected-admin');
          setUser(response.data.user);
        } catch (err) {
          console.log("not admin")
          router.push('/');
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

export default withAuthAdmin;