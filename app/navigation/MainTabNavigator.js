import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreScreen from "../screens/ExploreScreen";
import BadgeTabIcon from "../components/BadgeTabIcon";

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='pin'
    />
  ),
};

HomeStack.path = '';


const ExploreStack = createStackNavigator(
  {
    Following: ExploreScreen,
  },
  config
);

ExploreStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name='compass'/>
  ),
};

ExploreStack.path = '';


const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({focused}) => (
    <BadgeTabIcon
      focused={focused}
      name='bell'
    />
  ),
};

NotificationStack.path = '';


const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name='menu'/>
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  FollowingStack: ExploreStack,
  NotificationStack,
  SettingsStack,
}, {tabBarOptions: {showLabel: false}});

tabNavigator.path = '';

export default tabNavigator;
