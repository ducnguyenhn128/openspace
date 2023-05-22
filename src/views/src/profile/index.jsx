import { Link, Route, Routes} from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar'
import './styles.css'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import Password from './password';
import Privacy from './privacy';
import MyInfo from './myinfo';
import Posts from './posts';
import ProfileStas from './profile';
import Header from '../header';
import Follows from './follows';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL, {
                    withCredentials: true,
                },
            );
            const user = response.data;
            console.log("Data Response: ", user);

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
    }, [navigate])

    const [user, setUser] = useState()
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalFriends, setTotalFriends] = useState(0);
    const [totalFollowings, setTotalFollowings] = useState(0);
    const [totalFollowers, setTotalFollowers] = useState(0);

    const URL = 'https://openspacebe.vercel.app/api/profile';


    let fullName = "";
    if (user && user.username) {
        // if people has not set full name, display their username
        fullName = user.username;
    }
    if (user && user.info && user.info.fullname) {
        fullName = user.info.fullname
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
                    <MenuItem component={<Link to='./follows'/>}> Follows </MenuItem>
                    <MenuItem component={<Link to='./passwords'/>}> Password </MenuItem>
                    <MenuItem component={<Link to='./privacy'/>}> Privacy </MenuItem>
                    <MenuItem component={<Link to='./myinfo'/>}> My Info </MenuItem>
                    
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
                    <Route path='/passwords' element={ <Password />} />
                    <Route path='/privacy' element={ <Privacy />} />
                    <Route path='/follows' element={ <Follows/>} />
                    <Route path='/myinfo' element={ <MyInfo />} />
                    <Route path='/posts' element={ < Posts totalPosts={totalPosts}/>} />
                </Routes>
            </main>       
        </ProSidebarProvider>

    );
}
 
export default Profile;