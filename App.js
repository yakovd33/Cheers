import React, { useState, useRef} from 'react'
import Navigator from './utils/AppNav'
import LoginProvider from './utils/LoginProvider'
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { IdContext } from './utils/IdContext';
import FlashMessage from "react-native-flash-message";

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FF5487',
      secondary: '#292929',
    },
  };
  const myLocalFlashMessage = useRef(null)
  const [id, setId] = useState('')
  
  return (
    <PaperProvider theme={theme}>    
      <LoginProvider>
        <IdContext.Provider value={{id, setId}}>
          <Navigator />
          <FlashMessage ref={myLocalFlashMessage} />
        </IdContext.Provider>
      </LoginProvider>
    </PaperProvider>
  )
}


