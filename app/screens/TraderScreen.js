import React from 'react';
import {StyleSheet, SafeAreaView} from "react-native";
import {Icon, TopNavigation, TopNavigationAction} from "react-native-ui-kitten";
import firebase from "../utils/firebase";
import {connect} from "react-redux";

class TraderScreen extends React.Component {

  state = {
    trader: {},
    following: false,
    accessToken: '',
  };

  async componentDidMount() {
    const accessToken = await firebase.auth().currentUser.getIdToken(true);
    this.props.getFollowing(accessToken);
    this.setState({accessToken: accessToken});
    let address = this.props.navigation.state.params.trader;
    if (this.props.navigation.state.params.cost === undefined) {
      this.props.getTrader(address);
    }
  }

  BackIcon = (style) => (
    <Icon {...style} name='arrow-ios-back' fill='#2a2626'/>
  );

  navigateBack = () => {
    this.props.navigation.goBack();
  };

  BackAction = () => (
    <TopNavigationAction icon={this.BackIcon} onPress={this.navigateBack}/>
  );


  render() {
    const {style, themedStyle, theme, params, ...restProps} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <TopNavigation title='Trader' leftControl={this.BackAction()}/>
      </SafeAreaView>
    );
  }
}

TraderScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  let following = [];
  if (state.following !== undefined) {
    for (let f of state.following) {
      following.push(f.trader);
    }
  }
  let trader = state.trader;
  let traders = {};
  if (trader !== undefined) {
    let t = state.trader;
    trader = {
      ...t,
      ...formatTrader(t),
    };
    traders[t.trader] = trader;
  }

  return {
    following: following,
    traders: traders,
  };
};

const mapDispatchToProps = {};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TraderScreen);
