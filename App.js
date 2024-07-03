import { StatusBar } from 'expo-status-bar';
import { useMemo, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './views/Auth';
import { PaperProvider } from 'react-native-paper';
import AppNavigation from './navigation/AppNavigation';
import AuthContext from './context/AuthContext';
import { setTokenApi, getTokenApi, removeTokenApi } from './api/Token';

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          authenticated: true,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user);
    setAuth({
      token: user,
      authenticated: true,
    })
  }

  const logout = () => {
    if (auth) {
      removeTokenApi()
      setAuth(null)
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout
    }), [auth]
  )

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? <AppNavigation /> : <Auth />}
      </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
