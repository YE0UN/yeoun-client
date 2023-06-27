import { createContext, useState } from 'react';

export const AuthContextStore = createContext({
  userId: localStorage.getItem('userId') || null,
  setUserId: () => {},
});

const AuthContext = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  return <AuthContextStore.Provider value={{ userId, setUserId }}>{children}</AuthContextStore.Provider>;
};

export default AuthContext;
