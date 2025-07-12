import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/firebase.init';


const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    // loading 
    const [loading, setLoading] = useState(true);
    // user chack
    const [user, setUser] = useState(null);
    const axio

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


    // update user profile (new function)
    const updateUserProfile = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    }

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    // get all posts from the server
    const getAllPosts = () => {
        setLoading(true);
        return axioss.get('https://academix-hub-server.vercel.app/all-posts')
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
        userWithGoogle,
        updateUserProfile,
        signOutUser,
    };
    return (
        <AuthContext.Provider value={authInformation}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;