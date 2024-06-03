"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/user';
import { setCookie, parseCookies } from 'nookies';
import Loading from '@/app/ui/Loading/loading-overlay';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const cookies = parseCookies();
      const cachedUserData = cookies.userData;

      if (cachedUserData) {
        setUser(JSON.parse(cachedUserData));
        setLoading(false);
      } else {
        const response = await axios.get('/login/api');
        const userData = response.data.user;
        setUser(userData);
        setCookie(null, 'userData', JSON.stringify(userData), { maxAge: 60 * 10, path: '/' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {loading && <Loading />}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


// "use client";
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { User } from '@/types/user';

// interface UserContextProps {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   refetchUserData: () => void;
// }

// const UserContext = createContext<UserContextProps>({} as UserContextProps);

// const fetchUserData = async (): Promise<User> => {
//   const response = await axios.get('/login/api');
//   return response.data.user;
// };

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   const { data, refetch } = useQuery<User>({
//     queryKey: ['user'],
//     queryFn: fetchUserData,
//     staleTime: 5 * 60 * 1000, // cache the user data for 5 minutes
//   });

//   useEffect(() => {
//     if (data) {
//       setUser(data);
//     }
//   }, [data]);

//   return (
//     <UserContext.Provider value={{ user, setUser, refetchUserData: refetch }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
