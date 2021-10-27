import React from 'react'
import { GoogleOutlined} from "@ant-design/icons";
import "firebase/app";

import {auth} from "./Firebase"
import firebase from 'firebase/app';
const Login = () => {
    return (
      <div id='login-page'>
        <div id='login-card'>
          <h2>Welcome to skychat!</h2>
          <div className='login-button google' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
            <GoogleOutlined />
            Sign In With Google
          </div>
          <br />
        </div>
      </div>
    );
}
 
export default Login;