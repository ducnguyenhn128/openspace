import { Link, Route, Routes} from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar'
import './styles.css'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import Posts from '../profile/posts';
import ProfileStas from '../profile/profile';
import Header from '../header';
import Follows from '../profile/follows';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const User = () => {
    const {id} = useParams();  //get the ID of the URL
    const URL = 'http://localhost:8000/user/' + id ;
    const navigate = useNavigate()
    // Follow Status
    const [followStatus, setFollowStatus] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL, {
                    withCredentials: true,
                },
            );
            const user = response.data.user;
            setFollowStatus(response.data.followStatus)

            // console.log("Data Response: ", user);
            // console.log("Followstatus: ", response.data.followStatus);
            // set State for user & stats
            setUser(user)
            setTotalPosts(user.stats.posts)
            setTotalFriends(user.stats.friends)
            setTotalFollowers(user.stats.follower)
            setTotalFollowings(user.stats.following)
                
            } catch(err) {
                console.error(err);
                navigate('/login')
            }
        }
        fetchData();
    }, [URL, followStatus, navigate])


    const [user, setUser] = useState()
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalFriends, setTotalFriends] = useState(0);
    const [totalFollowings, setTotalFollowings] = useState(0);
    const [totalFollowers, setTotalFollowers] = useState(0);

    // Get Full Name
    let fullName = "";
    if (user && user.info && user.info.fullname) {
        fullName = user.info.fullname
    }
    
    // Handle Follow button
    const handleFollow = async () => {
        let url2 = 'http://localhost:8000/user/' + id + '/follow';
        console.log(url2)
        try { 
           const response = await axios.post(url2, null, { withCredentials: true }) ;
           if (response.status == '201') {
                setFollowStatus(followStatus => !followStatus)
           }
           
        } catch(err) {
            console.error(err);
        }
    }

    const handleUnFollow = async() => {
        let url2 = 'http://localhost:8000/user/' + id + '/follow';
        try { 
            const response = await axios.delete(url2, { withCredentials: true }) ;
            if (response.status === 204) {
                 setFollowStatus(followStatus => !followStatus)
            }
            
         } catch(err) {
             console.error(err);
         }
    }

    const handleClick = () => {
        // Client has not follow User, => handle client will follow user
        if (followStatus === false) {
            handleFollow();
        } else { 
            // Client has followed User => handle client unfollow user
            handleUnFollow();
        }
    }
    return (
        <ProSidebarProvider totalpost = {totalPosts}>
            <Header />
            <Sidebar style={{float: 'left', width: '20%'}}>
                <Menu>
                    <div style={{width: '100px', height: '100px', backgroundColor: '#6a6b', borderRadius: '100%', margin: '20px auto'}}>
                    </div>
                    <h3>{fullName}</h3>
                    <MenuItem component={<Link to='./'/>}> Profile </MenuItem>
                    <MenuItem component={<Link to='./posts'/>}> Posts </MenuItem>
                    <MenuItem>
                        {/* Check follow status */}
                        <Button onClick={handleClick}>
                            {followStatus === false ? 'Follow' : 'Unfollow'}
                        </Button>                    
                    </MenuItem>                
                </Menu>
            </Sidebar>
            <main>
                <Routes>
                    <Route path='/*' element={ 
                        <ProfileStas 
                            totalPosts={totalPosts}
                            totalFriends={totalFriends}
                            totalFollowers={totalFollowers}
                            totalFollowings={totalFollowings}
                        />
                    }/> 
                    <Route path='/follows' element={ <Follows/>} />
                    <Route path='/posts' element={ < Posts totalPosts={totalPosts}/>} />
                </Routes>
            </main>       
        </ProSidebarProvider>

    );
}
 
export default User;