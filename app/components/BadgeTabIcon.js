import React from "react";
import {View} from 'react-native';
import {Icon, Text} from "react-native-ui-kitten";
import Colors from "../constants/Colors";
import {connect} from "react-redux";
import {getNotifications} from "../reducers/reducer";
import firebase from "../utils/firebase";

class BadgeTabIcon extends React.Component {

  async componentDidMount() {
    const accessToken = await firebase.auth().currentUser.getIdToken();
    this.props.getNotifications(accessToken);
  }

  render() {
    let {name, badgeCount, color, size, ...props} = this.props;
    return (
      <View style={{width: 26, height: 26, margin: 5}}>
        <Icon name={name} width={26} height={26}
              fill={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}/>
        {badgeCount > 0 && (
          <View
            style={{
              // If you're using react-native < 0.57 overflow outside of parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let unseenCount = 0;
  if (state.notifications !== undefined) {
    for (const n of state.notifications) {
      if (n.seen === 0) {
        unseenCount++;
      }
    }
  }
  return {
    badgeCount: unseenCount
  };
};

const mapDispatchToProps = {
  getNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(BadgeTabIcon);
