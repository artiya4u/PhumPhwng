import React from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import firebase from "../utils/firebase";
import Header from "../components/Header";

class ExploreScreen extends React.Component {
  state = {
    goods: [],
    loading: false,
  };

  async componentDidMount() {
  }

  openTraderScreen = (index) => {
    this.props.navigation.navigate('Trader', this.state.following[index]);
  };

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    this.state.loading = false;
    return (
      <SafeAreaView style={styles.container}>
        <Header title='Explore'/>
      </SafeAreaView>
    );
  }
}


ExploreScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => {
  return {goods: state.goods}
};

const mapDispatchToProps = {};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {paddingBottom: 8},
  listItem: {borderRadius: 12, marginTop: 8, marginLeft: 8, marginRight: 8},
  listItemTitle: {fontSize: 18, color: '#F20519'},
  listItemDescription: {fontSize: 14, color: '#2A2626'},
});


export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
