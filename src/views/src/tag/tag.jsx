import React, {useState, useEffect} from 'react';
import Header from '../header';
import axios from 'axios';
import FeedPost from '../newsFeed/feedPost';


const TagPage = () => {
    const URL = ''
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL);
                const data = response.data;
                setPosts(data)
            } catch(err) {
                console.log(err)
            }
        }

        fetchData();
    }, []);
    return (  
        <div>
            <Header />
        </div>
    );
}
 
export default TagPage;

// do not require login