import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import TraderScreen from "../screens/TraderScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const AuthStack = createStackNavigator({
  SignUp: SignUpScreen,
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen
});


const RootStack = createStackNavigator(
  {
    App: {
      screen: MainTabNavigator,
    },
    Trader: {
      screen: TraderScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      Root: RootStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
