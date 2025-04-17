import { useEffect, useState } from "react";

export const useGetUserData = () => {
  const [userData, setUserData] = useState({
    name: null,
    userID: null,
    isAuth: false,
  });

  useEffect(() => {
    try {
      const authData = localStorage.getItem("auth");
      if (authData) {
        const parsed = JSON.parse(authData);
        setUserData({
          name: parsed.name || null,
          userID: parsed.userID || null,
          isAuth: !!parsed.isAuth,
        });
      }
    } catch (error) {
      console.error("Error parsing auth data from localStorage:", error);
    }
  }, []);

  return userData;
};
