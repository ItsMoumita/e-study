import React, {useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import Loading from "../Component/Loading";
import { AuthContext } from "./AuthContext";
import { auth } from "../src/firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);




const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
    if (auth.currentUser) {
      await auth.currentUser.reload();
    }
    return userCredential;
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
       
        await currentUser.reload();
        setUser({ ...currentUser });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    // return <Loading></Loading> 
  }

  const googleProvider = new GoogleAuthProvider();

const googleSignIn = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
};

  const userInfo = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    googleSignIn,
    loading,
    setLoading,
    updateUser,
  
  };
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;