import React from 'react';
import { Button } from 'react-bootstrap';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const FeedPost = (props) => {
    // props: author (name), tile, body, createdAt,
    // props: tagList

    const info = props.info;
    const {author, title, body, createdAt, authorname, _id} = info
    // time of post
    const time = createdAt && typeof createdAt === 'string' ? createdAt.slice(0, 10) : '';
    const author_page = '/user/' + author;
    const post_link = '/post/' + _id;
    return (  

            <div className="text-start bg-white p-3 mb-3 border border-white rounded">
                {/* Author && Time && More Setting */}
                <div className="d-flex">
                    <div className="user-comment-avt">
                    </div>

                    {/* Author and Time */}
                    <div className="viewpost_info flex-grow-1"> 
                        {/* <h5 className="mb-1"><b>{authorname}</b> </h5> */}
                        <h5 className="mb-1">
                            <a href={author_page} className='fs-5 fw-bold'>{authorname}</a> 
                        </h5>
                        <a href={post_link}>{time}</a>
                    </div>

                    {/* More: Delete, History */}
                    <div>
                        <MoreHorizIcon />
                    </div>
                </div>
                {/* Title */}
                <div className="mt-4">
                    <h3>{title}</h3>
                </div>
                {/* Body */}
                <div className="mt-4">
                    <p>{body}</p>
                    {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p> */}
                </div>

                {/* Post stats */}
                <div className="d-flex justify-content-between">
                    <div >
                        55 likes
                    </div>
                    <div>
                        {/* 10 bình luận */}
                    </div>
                </div>
                {/* Action: Like */}
                <div className="d-flex justify-content-between mt-3">
                    <Button className="col2 d-flex"> 
                        <ThumbUpIcon fontSize="small" className='me-1'/>Like
                    </Button>
                    {/* <Button className="col-3">Comment</Button> */}
                    {/* <Button className="col-3">Share</Button>         */}
                </div>
            </div>

    );
}
 
export default FeedPost;
