import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:8000/api/checklogin';
const API_URL_login = 'http://localhost:8000/api/login';

const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY3MzRmM2RjYmIxNGQ4Y2QyODg3MWQiLCJ1c2VybmFtZSI6InBodW9uZ3RoYW8xIiwiaWF0IjoxNjg0NTUyMjQyLCJleHAiOjE2ODcxNDQyNDJ9.XIZkxKoeGK8URKWrKIzG55Nz9LBaD_LLLw4UqMfpyBE'

const useAuthentication = () => {
    useEffect(() => {
        checkLoggedIn();
      }, []);

    const [loggedIn, setLoggedIn] = useState(false);

    const checkLoggedIn = async () => {
      try {
          const token = Cookies.get('jwtToken')
          console.log(`token: ${token}`)
          // SEND API
          const response = await axios.get(API_URL, {
            headers: {
              Authorization: token
            }
          });
          console.log(`response: ${response}`)

          if (response.status === 200) {
          setLoggedIn(true);
          }
      } catch (error) {
          console.error(error);
          setLoggedIn(false);
      }
    };

    const login = async (username, password) => {
        try {
          const response = await axios.post(API_URL_login, { username, password });
    
          if (response.status === 200) {
            setLoggedIn(true);
            localStorage.setItem('jwtToken', response.data.token);
          }
        } catch (error) {
          // Handle login error
        }
    };

    const logout = () => {
      localStorage.removeItem('jwtToken');
      setLoggedIn(false);
    };
    
    return {
      loggedIn,
      login,
      logout
    };
}

export default useAuthentication;
