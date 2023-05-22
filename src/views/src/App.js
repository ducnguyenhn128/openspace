import React from "react";
import "./App.css";

import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Register from "./register/register";
import Profile from "./profile";
import Posts from "./profile/posts";
import Follows from "./profile/follows";
import Password from "./profile/password";
import Privacy from "./profile/privacy";
import MyInfo from "./profile/myinfo";
import ViewPost from "./posts/viewpost";
import LogIn from "./login";
import User from "./user/user";
import Logout from "./login/logout";
import NewPost from "./posts/newpost";
import NewsFeed from "./newsFeed/newsFeed";
import Homepage from "./home/newsFeed";
import TagPage from "./tag/tag";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/feed",
      element: <NewsFeed />
    },
    {
      path: '/register',
      element:  <Register/> 
    },
    {
      path: '/login',
      element:  <LogIn/> ,
      exact: true // Add exact match to prevent redirect loop
    },
    {
      path: '/logout',
      element:  <Logout/>
    },
    {
      path: 'profile/*',   //login required
      element: <Profile/> ,
      children: [
        {path: 'posts', element: <Posts/>},
        {path: 'follows', element: <Follows />},
        {path: 'passwords', element: <Password />},
        {path: 'privacy', element: <Privacy />},
        {path: 'myinfo', element: <MyInfo />}
      ]
    },
    {
      path: 'viewpost', // drop
      element: <ViewPost />  // drop
    },
    {
      path: 'user/:id/*',  //login required
      element: <User />
    },
    {
      path: 'post', //login required
      element: <NewPost />
    },
    {
      path: 'post/:id',
      element: <ViewPost />
    },
    {
      path: 'tag/:tag',
      element: <TagPage />
    }
  ]);

  return (
    <div className="App">
        <RouterProvider router={ router } />
    </div>
  );
}

export default App