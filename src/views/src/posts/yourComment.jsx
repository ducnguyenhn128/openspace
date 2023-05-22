import Form from 'react-bootstrap/Form';
import './styles.css'

const YourComment = () => {
    return (  
        <div className="d-flex mb-2">
            <div className="user-comment-avt">

            </div>

            <div className='flex-grow-1'>
                <Form.Control
                    placeholder='Your comment here ...'
                />
            </div>
        </div>
    );
}
 
export default YourComment;