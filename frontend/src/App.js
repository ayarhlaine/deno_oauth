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
      <h3>Microsoft Auth App using Deno + React</h3>
      <div className="App_Container">
          <br />
          {
            user === null ?
            <Login />
            :
            <UserInfo user={user} setUser={setUser}/>
          }
      </div>
      <footer>
        <p>Supported account types</p>
        <br />
        <ul>
          <li>Personal Microsoft accounts only</li>
        </ul>
        <br />
        <p>Source code can be found at:&nbsp;
          <a href="https://github.com/ayarhlaine/deno_oauth" target="_blank" rel="noopener noreferrer">Github Repo</a>
        </p>
        <br />
        <p>Developed By: Ayar Hlaine</p>
      </footer>
    </div>
  );
}

export default App;
