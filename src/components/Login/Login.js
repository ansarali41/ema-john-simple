import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFBLogin, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponses(res, true);
            })
    }
    const fBLogin = () => {
        handleFBLogin()
            .then(res => {
                handleResponses(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponses(res, false);
            })
    }

const handleResponses = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
    
}
    const handleOnBlur = (e) => {

        let IsFieldValid = true;
        if (e.target.name === 'email') {
            IsFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const IsPasswordValid = e.target.value.length > 6;
            const IsPasswordHasNumber = /\d{1}/.test(e.target.value)
            IsFieldValid = IsPasswordValid && IsPasswordHasNumber;
        }
        if (IsFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }

    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponses(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponses(res, true);
            })
        }
        e.preventDefault();
    }


    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={signOut}>Sing out</button> :
                    <button onClick={googleSignIn}>Sing in</button>
            }
            <br />
            <button onClick={fBLogin}>Sign in using Facebook</button>
            {
                user.isSignIn && <div>
                    <p>welcome, {user.name}</p>
                    <p>Email, {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1> our own authentication</h1>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
            <label htmlFor="newUser">New User Sign Up</label>

            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" name="name" placeholder="Your name" onBlur={handleOnBlur} />
                }
                <br />
                <input type="text" name="email" id="" onBlur={handleOnBlur} placeholder="Your email address" required />
                <br />
                <input type="password" name="password" id="" onBlur={handleOnBlur} placeholder="Your password" required />
                <br />
                <button type="submit">{newUser ? 'Sign Up' : 'Sign in'}</button>
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>account {newUser ? 'created' : 'logged in '} successfully!</p>
            }
        </div>
    );
}

export default Login;
