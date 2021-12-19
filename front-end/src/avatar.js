import * as React from 'react';
import Stack from '@mui/material/Stack';
import Gravatar from 'react-circle-gravatar'
/** @jsxImportSource @emotion/react */
import { useState} from 'react'
import axios from 'axios';
// Layout

const useStyles = (size) => ({
  pic : {
    borderRadius: '50%',
    width : size,
    height: size,
    display: "block"
 },
 liste : {
   textDecoration: 'none' ,
   borderBottom : '1px solid white',
   borderTop : '1px solid white',
 },
})


export default function ImageAvatars({
 email,
 size,
}) {

const [user,setuser]=useState('');
const styles = useStyles(size)

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
     <img src={user} alt="Logo" css={styles.pic} />
    </div>
      )
      :
      (
      <div>
        <Gravatar  size={size} email={email}/>
      </div>
      )
    }
    </Stack>
    </div>
  );
}
