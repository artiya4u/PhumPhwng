import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import React, {useState} from 'react';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';
import AppNavigator from './navigation/AppNavigator';
import {theme} from './themes';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {applyMiddleware, createStore} from 'redux';

import reducer from './reducers/reducer';
import {Provider} from "react-redux";

const client = axios.create({
  baseURL: 'https://api.bootlegsoft.com/phumphwng/',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <ApplicationProvider mapping={mapping} theme={theme}>
          <IconRegistry icons={EvaIconsPack}/>
          <AppNavigator/>
        </ApplicationProvider>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/icon.png'),
    ]),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
