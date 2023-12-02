import React, { createContext, useState, useContext } from "react";

// 創建 Context
const UserContext = createContext();

// 創建一個提供者組件
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// 自定義 Hook 以方便使用 Context
export const useUser = () => useContext(UserContext);
