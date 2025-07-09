import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.init';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const githubProvider = new GithubAuthProvider();
    const provider = new GoogleAuthProvider();
    // loading 
    const [loading, setLoading] = useState(true);
    // user chack
    const [user, setUser] = useState(null);
    console.log(user);

    // create user with name, email, password, photoURL
    const createUserWithEP = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // log in user with email and password
    const loginUserWithEP = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // sign in with google
    const userWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // sign in with github
    const userWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }

    // update user profile (new function)
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // get all courses from the server
    const getAllCourses = () => {
        setLoading(true);
        return axios.get('https://academix-hub-server.vercel.app/all-course')
            .then(response => {
                setLoading(false);
                return response.data;
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
                throw error;
            });
    }

    // user check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);



    const authInformation = {
        user,
        setUser,
        loading,
        setLoading,
        createUserWithEP,
        loginUserWithEP,
        signOutUser,
        getAllCourses,
        userWithGoogle,
        userWithGithub,
        updateUserProfile
    };
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;