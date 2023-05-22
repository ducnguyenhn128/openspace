import Button from "react-bootstrap/esm/Button";
import './styles.css'
import { Container, Row } from "react-bootstrap";

// Type of action: Follower/ Following / Blocked

const ActionVsUser = (props) => {
    const actionType = props.actionType;
    return (
        <Container >
            <Row className='d-flex blocked_user m-2 mb-3'>
                <div className="col-3 bg-light p-2">
                    <div className="avt">
                    </div>      
                </div>
                <div className="col-6 my-auto">
                    <h5>User A</h5>
                </div>
                <div className="col-3 my-auto" >
                    <Button>{actionType}</Button>
                </div>
            </Row>

        </Container>  
    );
}
 
export default ActionVsUser;