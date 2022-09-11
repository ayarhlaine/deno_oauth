import React from 'react';
import axios from 'axios';

const UserInfo = (props) => {
    const { user } = props;
    const onLogout = async () => {
        try {
            await axios.post('/auth/logout', { withCredentials: true });
            props.setUser(null);
          } catch(err) {
            console.log(err)
          }
    }
    return (
        <div>
            <h4>Current Logined User</h4>
            <br />
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <br />
            <button className='Logout_Button' onClick={onLogout}>Logout</button>
        </div>
    )
}

export default UserInfo