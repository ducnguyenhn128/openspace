// Post a new article

// require('dotenv').config();
import React, {useState, useEffect} from 'react';
import Header from '../header';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import processHashtag from './processHashtagInput';
import { useNavigate } from 'react-router-dom';

const URL1 = 'http://localhost:8000/api/profile';
const URL = 'http://localhost:8000/post'
const NewPost = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [fullname, setFullname] = useState('')
    const [hashtag, setHashtag] = useState('')
    const [sampletag, setSampletag] = useState(['news', 'sport'])
    const navigate = useNavigate();
    // Get user Infomatiom
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL1, {
                    withCredentials: true,
                },
            );
            const user = response.data;
            console.log("Data Response: ", user);
            // Set FullName
            if (user.username) {
                setFullname(user.username)
            }
            if (user.info.fullname) {
                setFullname(user.info.fullname)
            }

            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, [])
    
    // Handle Form
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        setBody(e.target.value)
    }
    const handleHashtagChange = (e) => {
        setHashtag(e.target.value)
        const regex = /^[a-z0-9,]*$/i;
        if (regex.test(e.target.value) || e.target.value === '') {
            setHashtag(e.target.value);
        };
        const sample = processHashtag(e.target.value);
        setSampletag(sample)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdAt = new Date();
        const content = {title, body, createdAt, tagList: sampletag };
        console.log(content);
        try {
            const response = await axios.post(URL, content, {
                withCredentials: true
            });
            console.log(response.data)
        } catch(err) {
            console.log(err);
            
        }
        // reset the form field
        setTitle('');
        setBody('');
        setHashtag('')
        navigate('/feed')
    }

    return (
        <div>
            <Header/>
            <br />
            <h3>New post here</h3>
            <h4>{fullname}</h4>
            <Form className='col-6 mx-auto mt-5' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Title" 
                            onChange={handleTitleChange}
                            value={title}
                            name='title'
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control as="textarea" rows={8} placeholder="Write a new post ..." 
                            onChange={handleBodyChange}
                            value={body}
                            name='body'
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="hashtag" 
                            onChange={handleHashtagChange}
                            value={hashtag}
                            name='hashtag'
                        />
                    </Form.Group>
                    <p>{sampletag[3]}</p>
                    <p className='text-start fw-lighter bg-light p-3 rounded'>Hashtag seperate by a comma: ex: news, sport ...</p>
                    {/* List of tag will be apply */}
                    <div className='d-flex p-3 mb-3 bg-light rounded'>
                        {sampletag.map(tag => (
                            <div className='bg-secondary text-white me-2 p-2 rounded'> 
                                {tag}
                            </div>
                        ))}
                    </div>
                    <Button variant="success" type="submit">
                        Submit your post
                    </Button>
                </Form>
            {/* Tag */}
        </div>
    );
}
 
export default NewPost;