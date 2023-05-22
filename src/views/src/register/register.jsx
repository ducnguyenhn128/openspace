import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import './styles.css';
import cover from '../photo/logoheader.jpg'
const Register = () => {
    const [newUser, setNewUser] = useState({})
    const navigate = useNavigate();
    const handleChange = ({target}) => {
        const {name, value} = target;
        setNewUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUser.password !== newUser.confirmPass) {
            alert('Password not match');
        }
        else {
            const {username, email, password} = newUser;
            const formData = {username, email, password};
            // reset Form 
            setNewUser({})
            // send data
            fetch('http://localhost:8000/api/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
              // Handle the response data
              console.log(data);
              // Redirect to the homepage after creating the user
              navigate('/')
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
            });  
        }
    }

    return (
        <div className='register col-6 mx-auto mt-4'>
            <img src = {cover} alt='cover-logo' style={{width: '300px'}}/>
            <h2 className="mb-3 mt-3">Register an account here</h2>
            <Form className='col-9 mx-auto' onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" 
                        name='username'
                        onChange={handleChange}
                        value = {newUser.username || ''}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email Address" 
                        name='email'
                        onChange={handleChange}
                        value = {newUser.email || ''}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" 
                        name='password'
                        onChange={handleChange}
                        value = {newUser.password || ''}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Confirm Password" 
                        name='confirmPass'
                        onChange={handleChange}
                        value = {newUser.confirmPass || ''}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <div className='mt-3'>
                <a href='/login' >Already has account, login here</a>
            </div>
        </div>
    );
}
 
export default Register;