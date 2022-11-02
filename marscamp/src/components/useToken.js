import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    if(userToken && userToken!=="undefined"){
      return userToken[0].email
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken[0].email);
  };

  return {
    setToken: saveToken,
    token
  }
}