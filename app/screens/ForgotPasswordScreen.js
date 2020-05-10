import React from 'react';
import {Button, Icon, Input, Layout, Modal, Text, TopNavigation, TopNavigationAction} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';
import firebase from "../utils/firebase";
import {SafeAreaView} from "react-navigation";


export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    modalVisible: false,
    message: '',
  };


  setModalVisible = () => {
    const modalVisible = !this.state.modalVisible;
    this.setState({modalVisible});
  };

  renderModalElement = () => {
    return (
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text category='p2'>{this.message}</Text>
        <Button style={[styles.inputStyle]} status='primary' appearance='ghost'
                onPress={this.setModalVisible}>OK</Button>
      </Layout>
    );
  };

  renderIconEmail = (style) => {
    return (
      <Icon {...style} name={'email'}/>
    );
  };

  onChangeEmail = (email) => {
    this.setState({email});
  };

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
    const {style, themedStyle, theme, ...restProps} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation leftControl={this.BackAction()}/>
        <Layout style={styles.container}>
          <Text style={[themedStyle, style]}>Please enter your email address</Text>
          <Input
            {...restProps}
            style={[themedStyle, style, styles.inputStyle]}
            value={this.state.email}
            placeholder='Email'
            onChangeText={this.onChangeEmail}
            icon={this.renderIconEmail}
          />
          <Button style={[styles.buttonSize, styles.inputStyle]}
                  status='primary'
                  onPress={this._sendResetPassword}>RESET PASSWORD</Button>
          <Modal visible={this.state.modalVisible}>
            {this.renderModalElement()}
          </Modal>
        </Layout>
      </SafeAreaView>
    );
  }

  _sendResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      this.props.navigation.navigate("Login");
    } catch (e) {
      this.message = e.message;
      this.setModalVisible();
    }
  };
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  buttonSize: {width: '90%'},
  inputStyle: {height: 50, width: '90%', marginTop: 5, marginBottom: 5},
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  modalContainer: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: '#F20519',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  socialButton: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});
