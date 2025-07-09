import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase/Firebase';

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logOutUser = () => {
    return signOut(auth);  // Firebase sign-out function
  };

  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photo,
    });
    setUser(result.user);
    setLoading(false);
    return result;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logOutUser,  // Add logOutUser to context value
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
