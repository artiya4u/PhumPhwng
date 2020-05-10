import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl} from "react-native";
import Header from "../components/Header";
import firebase from "../utils/firebase";
import {getNotifications, resetBadgeCount} from "../reducers/reducer";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";

class NotificationScreen extends React.Component {
  state = {
    notifications: [],
    loading: false
  };

  async componentDidMount() {
    const accessToken = await firebase.auth().currentUser.getIdToken();
    this.setState({accessToken: accessToken});
    this.props.getNotifications(accessToken);
  }

  notiItemStyle = (item) => {
    if (item.seen === 1) {
      return [{...styles.listItem}];
    } else {
      return [{...styles.listItem, backgroundColor: '#F4F1EF'}];
    }
  };

  reload = () => {
    firebase.auth().currentUser.getIdToken().then(accessToken => {
      this.state.loading = true;
      this.props.getNotifications(accessToken);
    });
  };

  pullRefresh = () => {
    this.resetBadgeCount();
    this.reload();
  };

  resetBadgeCount = () => {
    if (this.state.notifications.length > 0 && !this.state.notifications[0].seen) {
      firebase.auth().currentUser.getIdToken().then(accessToken => {
        this.props.resetBadgeCount(accessToken);
      });
    }
  };

  render() {
    const {style, themedStyle, theme, notifications, ...restProps} = this.props;
    this.state.notifications = notifications;
    this.state.loading = false;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={this.pullRefresh}>
          <Header title='Your Notifications'/>
        </TouchableOpacity>
        <NavigationEvents
          onWillBlur={payload => {
            this.resetBadgeCount();
          }}
        />
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.pullRefresh}/>}>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

NotificationScreen.navigationOptions = {
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
});

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = {
  getNotifications,
  resetBadgeCount
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

