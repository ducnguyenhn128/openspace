import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../header';

const Logout  = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await axios.post('https://openspacebe.vercel.app/api/logout', null, {
          withCredentials: true,
        });
    
        // Clear the token from client-side storage
        localStorage.removeItem('token');
    
        // Redirect to the login page or perform other actions
        navigate('/login')
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    const comeback = () => {
        navigate(-1)
    }
    return (
        
        <div>
            <Header ></Header>

            <div className='bg-light mx-auto mt-5 p-5' style={{height: '200px', width: '500px'}}>
                <h4>
                    DO YOU WANT TO LOG OUT
                </h4>

                <Button className='mt-3 me-3' variant="success" onClick={handleLogout}>
                    Yes, Log me out
                </Button>
                <Button className='mt-3' variant="secondary" onClick={comeback}>
                    No, keep in
                </Button>

            </div>
        </div>
     );
}
 
export default Logout;




