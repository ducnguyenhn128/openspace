const sample = {
    "id" : "417238413274412345" ,
    "username" : "peter12b" ,
    "password" : "3142fhads8345yc1324hfdsa" ,
    "info" : {
        "fullname" : "Peter Pan Rosen",
        "DOB" : "11-03-1995",
        "gerder" : "male",
        "location" : {
            "city" : "Hanoi",
            "country" : "Vietnam"
        },
        "bio" : "Some text here ..."
    },
    "stats" : {
        "follower" : "30",
        "following" : "50",
        "posts" : "3",
        "friends" : "40"
    },
    "avatar": {
        "profile_pic": {
            "url": "https://example.com/profile_pic.jpg",
            "width": 800,
            "height": 600,
            "caption": "Profile picture"
        },
        "cover_photo": {
            "url": "https://example.com/cover_photo.jpg",
            "width": 1200,
            "height": 800,
            "caption": "Cover photo"
        }
    },
    "follow" : {
        "follower" : ["413298517325", "124713247413241", "4713247134714"],
        "following" : ["0127348741235", "71235981632598", "1324883216513265"] ,
        "blocked" : ["913745071325", "57819325711325", "5718375243871323"] 
    },
    "privacy" : {
        "who_can_view" : "everyone",
        "who_can_comment" : "friend"
    },
    "posts " : [
        {
            "id": "57103457340957",
            "time" : "20 Mar 2023",
            "content" : "Hello world",
            "hasgtag" : ["football", "fifaworld"],
            "user_liked" : [],
            "user_shared" : [],
            "comment" : {}
        } ,
        {
            "id": "2375012357891357",
            "time" : "4 May 2023",
            "content" : "In coming today",
            "hasgtag" : ["cars", "speed"],
            "user_liked" : [],
            "user_shared": [],
            "comment" : {}
        }
    ] 
}

const userProtype = 
{
    "info" : {
        "fullname" : "",
        "DOB" : "",
        "gerder" : "",
        "location" : {
            "city" : "",
            "country" : ""
        },
        "bio" : ""
    },
    "stats" : {
        "follower" : 0,
        "following" : 0,
        "posts" : 0,
        "friends" : 0
    },
    "avatar": {
        "profile_pic": {
            "url": "https://example.com/profile_pic.jpg",
            "width": 800,
            "height": 600,
            "caption": "Profile picture"
        },
        "cover_photo": {
            "url": "https://example.com/cover_photo.jpg",
            "width": 1200,
            "height": 800,
            "caption": "Cover photo"
        }
    },
    "follow" : {
        "follower" : [],
        "following" : [] ,
        "blocked" : [] 
    },
    "privacy" : {
        "who_can_view" : "everyone",
        "who_can_comment" : "friend"
    },
    "posts " : [
    ] 
}

module.exports = userProtype;


// username: phuonglinh1
// pass: abc12345
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY3MzM0NTczYzgwOTA3MjkxMjViYTYiLCJ1c2VybmFtZSI6InBodW9uZ2xpbmgxIiwiaWF0IjoxNjg0NTExMzU1LCJleHAiOjE2ODcxMDMzNTV9._O3BKi7nstpBlDzKbBM37Wa9yfh3HMtuK3mhsyljfvI