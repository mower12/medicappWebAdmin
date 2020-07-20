import React, { useState, useEffect } from 'react';
import Login from "./login/Login";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './utils/contexts';
import { ToastContainer } from 'react-toastify';
import { isUserLoger }  from './api/auth'
import Routing from './routers/routing';

export default function App(){
  const [user, setUser] = useState();

  useEffect(() => {
   // setUser();
   isUserLoger(setUser)
  }, []);

return (
<AuthContext.Provider value={user} >
  {user ?  <div><Routing/></div> : <Login/> }
  
  <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
       />
</AuthContext.Provider>
);
}