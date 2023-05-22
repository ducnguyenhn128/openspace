import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './styles.css'
import { Outlet } from "react-router-dom";
import React, { useState } from 'react';

const Password = () => {
    const [newPass, setNewPass] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newPass);
        
        if (newPass.newpass !== newPass.confirm) {
            alert('Password not match')
        } else {
            alert('OK')
        }
    }

    const handleChange = ({target}) => {
        const {name, value} = target;
        setNewPass(prev => ({
            ...prev,
            [name] : value
        }))
    }
    return (
        <div className="d-flex">
        {/* Navigation */}
        {/* <ProfileNavigation /> */}

        <div className="col-9 bg-light">
            <div className='register col-6 mx-auto'>
                <h2 className="mb-3 mt-3">Change your password</h2>
                <Form className='col-9 mx-auto' onSubmit={handleSubmit} >

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Current Password" 
                            onChange={handleChange}
                            value={newPass.currentpass || ''}
                            name='currentpass'
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="New Password" 
                            onChange={handleChange}
                            value={newPass.newpass || ''}
                            name='newpass'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Confirm Password" 
                            onChange={handleChange}
                            value={newPass.confirm || ''}
                            name='confirm'
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        </div>
    </div>
    );
}
 
export default Password;

// Done