"use client"
import React, { createContext, useContext, useState, useEffect, cache } from 'react';
import axios from 'axios';
import { User } from '@/types/user';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: React.FC<UserContextProps> = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const cachedUserData = localStorage.getItem('userData');
      if (cachedUserData) {
        setUser(JSON.parse(cachedUserData));
      } 
      else {
        const response = await axios.get('/login/api');
        setUser(response.data.user);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
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
