import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { useAuthStore } from 'store/auth';

export function RequireAuth() {
  const isAuth = useAuthStore(state => state.isAuth);
  const location = useLocation();
  const setUser = useAuthStore(state => state.setUser);
  const signIn = useAuthStore(state => state.signIn);

  useEffect(() => {
    const handleAuthStateChange = async (user) => {
      if (user && !isAuth) {
        const { uid: id, displayName: name, email, photoURL: profilePic } = user;
        if (name && email) {
          const newUser = { id, name, email, profilePic: profilePic || '' };
          setUser(newUser);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    return () => {
      // Unsubscribe from the auth state change when the component unmounts
      unsubscribe();
    };
  }, [isAuth, setUser]);

  if (isAuth) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }
}

}
