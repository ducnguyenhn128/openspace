import Dropdown from 'react-bootstrap/Dropdown';


import './styles.css'
import BlockedUser from './utils/actionVsUser';
import { Row } from 'react-bootstrap';

const Privacy = () => {
    const totalBlockedUser = 20;
    return (
        <div className="d-flex">

            <div className="col-9 bg-light">
                {/* Who can view */}
                <div className='d-flex justify-content-between mx-2 mt-3' >
                    <p>Who can view my profile</p>
                    {/* Dropdown */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </div>

                <div className='d-flex justify-content-between mx-2 mt-3' >
                    <p>Who can like, comment, share my post</p>
                    {/* Dropdown */}
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </div>
                

                <hr className='mx-2'/>


                {/* Block user */}
                <div className='text-start mt-4'>
                    <h4 className='mx-2'>Blocked user:  {totalBlockedUser}</h4>
                    {/* render a list */}
                    <Row className='d-flex flex-wrap '>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        <div className='col-6'>
                            <BlockedUser actionType='Unblock'/>
                        </div>
                        
                    </Row>
                    
                </div>
            </div>


        </div>
    );
}
 
export default Privacy;