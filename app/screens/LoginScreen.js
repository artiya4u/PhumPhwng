import React from 'react';
import {Button, Icon, Input, Layout, Modal, Text, TopNavigation, TopNavigationAction} from 'react-native-ui-kitten';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {signInWithEmail} from "../utils/auth";
import Header from "../components/Header";


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    fullname: '',
    email: '',
    password: '',
    secureTextEntry: true,
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
        <Text style={[styles.modalText]} category='p2'>{this.message}</Text>
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

  onChangeText = (password) => {
    this.setState({password});
  };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({secureTextEntry});
  };

  renderIcon = (style) => {
    const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
    return (
      <Icon {...style} name={iconName}/>
    );
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
          <Header title='Login'/>
          <Input
            {...restProps}
            style={[themedStyle, style, styles.inputStyle]}
            value={this.state.email}
            placeholder='Email'
            onChangeText={this.onChangeEmail}
            icon={this.renderIconEmail}
          />
          <Input
            {...restProps}
            style={[themedStyle, style, styles.inputStyle]}
            value={this.state.password}
            placeholder='Password'
            icon={this.renderIcon}
            secureTextEntry={this.state.secureTextEntry}
            onIconPress={this.onIconPress}
            onChangeText={this.onChangeText}
          />
          <Text category='p2' style={[styles.inputStyle]} onPress={this._forgotPassword}>
            Forgot your password?
          </Text>
          <Button style={[styles.buttonSize, styles.inputStyle]} status='primary'
                  onPress={this._signInEmailAsync}>LOGIN</Button>
          <Modal
            allowBackdrop={true}
            backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
            onBackdropPress={this.setModalVisible}
            visible={this.state.modalVisible}>
            {this.renderModalElement()}
          </Modal>
        </Layout>
      </SafeAreaView>
    );
  }

  _signInEmailAsync = async () => {
    try {
      await signInWithEmail(this.state.email, this.state.password);
      this.props.navigation.navigate('App');
    } catch (e) {
      this.message = e.message;
      this.setModalVisible();
    }
  };

  _forgotPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  buttonSize: {width: '90%'},
  inputStyle: {height: 50, width: '90%', marginTop: 5, marginBottom: 5},
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    alignItems: 'center',
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
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  modalText: {
    marginVertical: 16,
    marginHorizontal: 4,
    width: '90%'
  }
});
