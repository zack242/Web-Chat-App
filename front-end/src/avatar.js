import * as React from 'react';
import Stack from '@mui/material/Stack';
import Gravatar from 'react-circle-gravatar'
/** @jsxImportSource @emotion/react */
import { useState} from 'react'
import axios from 'axios';
// Layout

export default function ImageAvatars({
 email,
}) {

const [user,setuser]=useState('');

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
