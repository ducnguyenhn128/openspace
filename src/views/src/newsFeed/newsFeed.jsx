import Button from "react-bootstrap/esm/Button";
import ViewPost from "../posts/viewpost";
import MessageFriend from "./messageFriends";
import Header from "../header";
import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeedPost from "./feedPost";
import FilterListIcon from '@mui/icons-material/FilterList';
import PopularTags from "./popularTags";

const NewsFeed = () => {
    const [newsFeedGlobal, setNewsFeedGlobal] = useState(true)
    const URL = newsFeedGlobal ? 'http://localhost:8000/post/feed-global' : 'http://localhost:8000/post/feed-follow'
    const URL1 = 'http://localhost:8000/post/feed-follow'
    const navigate = useNavigate()
    const [allPosts, setAllPosts] = useState([]) ;


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(URL, {
                withCredentials: true,
            })
            console.log(response.data) 
            // do not delete
            setAllPosts(response.data)
        }
        fetchData();
    }, [URL])

    // Render a list: all post in newsfeed
    const newsfeed1 = allPosts.map((el, index) => (
        <li key={index}> <FeedPost info = {el}/> </li>
      ));
    
    // Handle Button Click: switch NewsFeed between Your Following & Globally
    const switchNewsFeed = () => {
        setNewsFeedGlobal(newsFeedGlobal => !newsFeedGlobal)
    }
    return (
        <div>
            <Header />
            <div className="mt-1 d-flex justify-content-between bg-light">
                {/* Left Column */}
                <div className='col-2 text-start bg-light left_column '>
                    {/* <h5 class='mt-2 ms-2'>Popular tags</h5>

                    <div class='mt-2 ms-2 '>
                        <div><a href="/">#hashtag1</a> </div>
                        <div><a href="/">#hashtag1</a> </div>
                        <div><a href="/">#hashtag1</a> </div>
                    </div> */}
                    <PopularTags />

                </div>
                
                {/* Center */}
                <div className='col-6  bg-light'>
                    {/* Write a post */}
                    <div class='mt-3 p-3 bg-white d-flex'>
                        <div className='user-avt'>

                        </div>
                        {/* <input 
                            className='p-1 flex-fill border border-dark-subtle rounded bg-light' 
                            placeholder="  Write your post"> 
                        </input> */}

                        <Button variant="light" className="flex-fill text-start"  onClick = {() => {navigate('/post')}} >
                            Write your post ...
                        </Button>

                    </div>
                    {/* Filter */}
                    <div class="d-flex bg-white my-3 p-3 border border-dark-subtle rounded">
                        <Button variant='light' onClick={switchNewsFeed}>
                            <FilterListIcon className='me-2'/>
                            {newsFeedGlobal === false ? 'Your following' : 'Globally'}
                        </Button>
                    </div>

                    {/* All Posts in News Feed */}
                    <div className='bg-light newsfeed1'>
                        {newsfeed1}
                    </div>
                </div>
                {/* Right column */}
                <div class='col-2 text-start bg-light right_column mt-2'>
                    <p>Người liên hệ</p>
                    {/* Render a list */}
                    <MessageFriend />
                    <MessageFriend />
                    <MessageFriend />
                    <MessageFriend />
                    <MessageFriend />
                    <MessageFriend />

                </div>
            </div>  
        </div>
    );
}
 
export default NewsFeed;