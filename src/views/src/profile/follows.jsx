import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import './styles.css'
import FollowUser from './utils/actionVsUser';

const Follows = () => {
    return (
        <div className="d-flex">
            {/* Navigation */}

            <div className="col-9 bg-light">
                <Form className='mx-2 mt-3'>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Seach user" />
                    </Form.Group>
                </Form>

                {/* Follows  */}
                <div className='d-flex'>
                    {/* Followes */}
                    <div class='col-6 text-start ms-2'>
                        <h3>Follower: 30</h3>
                        <FollowUser actionType='Blocked'/>
                        <FollowUser actionType='Blocked'/>
                        <FollowUser actionType='Blocked'/>
                        <FollowUser actionType='Blocked'/>
                    </div>

                    {/* Followings */}
                    <div class='col-6 text-start ms-2'>
                        <h3>Following: 50</h3>
                        <FollowUser actionType='Unfollow'/>
                        <FollowUser actionType='Unfollow'/>
                        <FollowUser actionType='Unfollow'/>
                        <FollowUser actionType='Unfollow'/>
                    </div>
                </div>
                

            </div>  
        </div>
    );
}
 
export default Follows;