import React from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from "react-native";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {connect} from "react-redux";
import firebase from "../utils/firebase";
import registerForPushNotificationsAsync from "../utils/Notification";
import {Notifications} from "expo";

class HomeScreen extends React.Component {
  state = {
    accessToken: '',
    loading: false,
    markers: [{key: 1, title: 'AAAA', description: 'AAAAAAAAAAAA', latlng: {latitude: 10, longitude: 10}}],
    location: undefined,
  };

  async getLocation() {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState(location);
  }

  async componentDidMount() {
    const accessToken = await firebase.auth().currentUser.getIdToken();
    await this.getLocation();
    // TODO fetch trader locations

    await registerForPushNotificationsAsync(accessToken);
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    // Reload list of notification when the a push notification.
    this.reloadNotification();
  };

  reloadNotification = () => {
    firebase.auth().currentUser.getIdToken().then(accessToken => {
      this.state.loading = true;
      this.props.getNotifications(accessToken);
    });
  };

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    this.state.loading = false;
    return (
      <SafeAreaView style={styles.container}>
        <MapView style={styles.mapStyle}>
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = {};

HomeScreen.navigationOptions = {
  header: null,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {paddingBottom: 8},
  listItem: {borderRadius: 12, marginTop: 8, marginLeft: 8, marginRight: 8},
  listItemTitle: {fontSize: 18, color: '#F20519'},
  listItemDescription: {fontSize: 14, color: '#2A2626'},
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
