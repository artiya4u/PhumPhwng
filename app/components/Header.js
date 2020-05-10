import React from 'react';
import {Layout, Text} from "react-native-ui-kitten";
import {StyleSheet} from "react-native";

export default class Header extends React.Component {

  async componentDidMount() {
  }

  render() {
    const {style, themedStyle, theme, title, ...restProps} = this.props;
    return (
      <Layout style={styles.Header}>
        <Text category='h4'>{title}</Text>
      </Layout>
    );
  }
}

export const styles = StyleSheet.create({
  Header: {
    paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20
  },

});
