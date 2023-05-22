import './styles.css'

const UserComment = () => {
    return (  
        <div className="d-flex">
            <div className='user-comment-avt'>
            </div>
            <div className='flex-grow-1 bg-light p-2'>
                <p className='mb-1'><b>Nguyễn Văn Kiệt</b></p>
                <p>Tuyệt vời</p>
            </div>

        </div>
    );
}
 
export default UserComment;