import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';
import UserInfo from './UserInfo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('/auth', { withCredentials: true });
        console.log(result.data)
        setUser(result.data);
      } catch(err) {
        console.log(err)
      }
    };

    fetchData();
  },[]);

  return (
    <div className="App">
      <div className="App_Content">
        <h3>Microsoft Auth App using Deno + React</h3>
        <br />
        {
          user === null ?
          <Login />
          :
          <UserInfo user={user} setUser={setUser}/>
        }
      </div>
    </div>
  );
}

export default App;
