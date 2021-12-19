import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Gravatar from 'react-circle-gravatar'
/** @jsxImportSource @emotion/react */
import { useState,useContext} from 'react'
import axios from 'axios';
// Layout

export default function ImageAvatars({
 email,
}) {


const [user,setuser]=useState('');
const [avatar,setAvatar] = useState('');


const fetch = async() =>
{

try {
  const user = await axios.get(`http://localhost:3001/users/${email}`)
  setuser(user.data.avatar)

} catch (e) {
  console.log(e);
} finally {

}

}
fetch()
console.log('ok');
console.log(user);

  return (
   <div>
     <Stack direction="row" spacing={2}>
    {user ? (
     <div>
     <img src={user} alt="Logo" css={{borderRadius: '50%',width:'50',height: 50,display: "block"}} />
    </div>
      )
      :
      (
      <div>
        <Gravatar  size={50} email={email}/>
      </div>
      )
    }
    </Stack>
    </div>
  );
}
