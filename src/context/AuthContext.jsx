import { createContext, useState } from 'react';

export const AuthContextStore = createContext({
  userId: sessionStorage.getItem('userId') || null,
  setUserId: () => {},
});

const AuthContext = ({ children }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);

  return <AuthContextStore.Provider value={{ userId, setUserId }}>{children}</AuthContextStore.Provider>;
};

export default AuthContext;
