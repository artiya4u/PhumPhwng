import React from 'react';
import {Button, Icon, Input, Layout, Modal, Text} from 'react-native-ui-kitten';
import {StyleSheet} from 'react-native';

import {signUpWithEmail} from "../utils/auth";
import * as WebBrowser from "expo-web-browser";
import Header from "../components/Header";


export default class SignUpScreen extends React.Component {
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

  handleTerms = () => {
    WebBrowser.openBrowserAsync(
      'https://bootlegsoft.com/bclist/terms/'
    );
  };

  handlePrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(
      'https://bootlegsoft.com/bclist/privacy-policy/'
    );
  };

  termButton = (
    <Text category='p2' onPress={this.handleTerms} style={styles.linkText}>
      Terms of Service
    </Text>
  );

  privacyPolicyButton = (
    <Text category='p2' onPress={this.handlePrivacyPolicy} style={styles.linkText}>
      Privacy Policy
    </Text>
  );

  setModalVisible = () => {
    if (this.message === undefined) {
      return;
    }
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

  renderIconPerson = (style) => {
    return (
      <Icon {...style} name={'person'}/>
    );
  };

  renderIconEmail = (style) => {
    return (
      <Icon {...style} name={'email'}/>
    );
  };

  onChangeFullName = (fullname) => {
    this.setState({fullname});
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

  render() {
    const {style, themedStyle, theme, ...restProps} = this.props;
    return (
      <Layout style={styles.container}>
        <Header title='Sign Up'/>
        <Input
          {...restProps}
          style={[themedStyle, style, styles.inputStyle]}
          value={this.state.fullname}
          placeholder='Full name'
          onChangeText={this.onChangeFullName}
          icon={this.renderIconPerson}
        />
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
        <Button style={[styles.buttonSize, styles.inputStyle]} status='primary'
                onPress={this._signInEmailAsync}>CONTINUE</Button>
        <Text category='p2' style={[styles.termText]}>
          By creating an account you agree to our {this.termButton} and {this.privacyPolicyButton}
        </Text>
        <Text category='p2' style={[styles.haveAccountText]}>
          Already have an account?
        </Text>
        <Button style={[styles.buttonSize, styles.inputStyle]} status='info'
                onPress={this.gotoLogin}>LOGIN</Button>
        <Modal
          allowBackdrop={true}
          backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
          onBackdropPress={this.setModalVisible}
          visible={this.state.modalVisible}>
          {this.renderModalElement()}
        </Modal>
      </Layout>
    );
  }

  _signInEmailAsync = async () => {
    try {
      await signUpWithEmail(this.state.fullname, this.state.email, this.state.password);
      this.props.navigation.navigate('App');
    } catch (e) {
      this.message = e.message;
      this.setModalVisible();
    }
  };

  gotoLogin = () => {
    this.props.navigation.navigate("Login");
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
    marginTop: 30,
    marginBottom: 5,
  },
  modalContainer: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termText: {
    textAlign: 'center',
    width: '70%',
  },
  haveAccountText: {
    marginTop: 50,
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
