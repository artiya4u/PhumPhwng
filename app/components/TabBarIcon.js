import React from 'react';
import Colors from '../constants/Colors';
import {Icon} from "react-native-ui-kitten";

export default function TabBarIcon(props) {
  return (
    <Icon name={props.name} width={26} height={26}
          fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
