import React from 'react';
import {signOut} from "../utils/auth";
import Constants from 'expo-constants';
import {StyleSheet, TouchableOpacity, SafeAreaView, Share} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon, Input, Layout, Modal, Text, Toggle} from "react-native-ui-kitten";
import * as WebBrowser from "expo-web-browser";
import firebase from "../utils/firebase";
import {getProfile, reset, saveProfile} from '../reducers/reducer';
import {sendEmail} from "../utils/SendEmail";
import Header from "../components/Header";


export class SettingsScreen extends React.Component {
  state = {
    accessToken: '',
    modalVisible: false,
    profile: {},
  };

  async componentDidMount() {
    const accessToken = await firebase.auth().currentUser.getIdToken();
    this.props.getProfile(accessToken);
    this.setState({accessToken: accessToken})
  }

  onHowPress = () => {
    WebBrowser.openBrowserAsync(
      'https://medium.com/phumphwng/'
    );
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'PhumPhwng - Next Door Market, Download now! https://bootlegsoft.com/phumphwng/',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {style, themedStyle, theme, profile, ...restProps} = this.props;
    this.state.profile = profile;
    return (
      <SafeAreaView style={styles.container}>
        <Header title='Settings'/>
        <Layout
          style={[{borderBottomWidth: 1}]}>
        </Layout>
        <TouchableOpacity onPress={this.onEditProfilePress}>
          <Layout
            style={[styles.section, styles.soundEnabledSection]}>
            <Text
              style={styles.sectionText}
              category='p1'>
              Me
            </Text>
            <Text
              style={styles.sectionText}
              category='p1'>
              {profile.fullname}
            </Text>
          </Layout>
        </TouchableOpacity>
        <Layout
          style={[styles.section, styles.soundEnabledSection]}>
          <Text
            style={styles.sectionText}
            category='p1'>
            Email
          </Text>
          <Text
            style={styles.sectionText}
            category='p1'>
            {profile.email}
          </Text>
        </Layout>
        <Layout
          style={[styles.section, styles.soundEnabledSection]}
          onPress={this.onSoundEnabledChange}>
          <Text
            style={styles.sectionText}
            category='p1'>
            Push Notification
          </Text>
          <Toggle
            checked={profile.notification === 1}
            onChange={this.onSoundEnabledChange}
          />
        </Layout>
        <TouchableOpacity onPress={this.onHowPress}>
          <Layout
            style={[styles.section, styles.iconSection]}
            onPress={this.onHowPress}>
            <Icon name='bulb-outline' width={26} height={26} style={{marginRight: 8}}/>
            <Text
              style={styles.sectionText}
              category='p1'>
              How it work?
            </Text>
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onQuestionPress}>
          <Layout style={[styles.section, styles.iconSection]}>
            <Icon name='question-mark-circle-outline' width={26} height={26} style={{marginRight: 8}}/>
            <Text
              style={styles.sectionText}
              category='p1'>
              Help
            </Text>
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onShare}>
          <Layout
            style={[styles.section, styles.iconSection]}>
            <Icon name='share-outline' width={26} height={26} style={{marginRight: 8}}/>
            <Text
              style={styles.sectionText}
              category='p1'>
              Tell your friends.
            </Text>
          </Layout>
        </TouchableOpacity>
        <Layout style={styles.lowerLayout}>
          <Button style={[styles.buttonSize, styles.inputStyle]} appearance='outline'
                  onPress={this._logout}>LOGOUT</Button>
          <Layout>
            <Text>{Constants.manifest.name} v{Constants.manifest.version}</Text>
          </Layout>
          <Layout>
            <Text>Made With ♥</Text>
          </Layout>
        </Layout>
        <Modal
          allowBackdrop={true}
          backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
          onBackdropPress={this.setModalVisible}
          visible={this.state.modalVisible}>
          {this.renderUpdateNameModalElement()}
        </Modal>
      </SafeAreaView>
    );
  }

  onEditProfilePress = () => {
    this.setState({modalVisible: true});
  };

  onQuestionPress = () => {
    sendEmail(
      'artiya4u@gmail.com',
      'Feedback',
      'My feedback here'
    ).then(() => {
      console.log('Start composing email');
    });
  };

  onSoundEnabledChange = () => {
    let profile = this.state.profile;
    profile.notification = (!profile.notification) ? 1 : 0;
    this.setState({profile: profile});
    firebase.auth().currentUser.getIdToken().then(accessToken => {
      this.props.saveProfile({
        fullname: profile.fullname,
        notification: profile.notification,
      }, accessToken);
    });
  };

  _logout = async () => {
    try {
      this.props.reset();
      await signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e.message);
    }
  };

  setModalVisible = () => {
    const modalVisible = !this.state.modalVisible;
    this.setState({modalVisible});
    const {profile} = this.props;
    firebase.auth().currentUser.getIdToken().then(accessToken => {
      this.props.saveProfile({
        fullname: profile.fullname,
        notification: profile.notification,
      }, this.state.accessToken);
    });
  };

  onChangeFullName = (fullname) => {
    this.state.profile.fullname = fullname;
    this.setState({profile: this.state.profile});
  };

  renderUpdateNameModalElement = () => {
    return (
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text style={[styles.modalText, {marginTop: 20}]} category='p1'>Your Name</Text>
        <Input
          style={[styles.inputStyle]}
          value={this.state.profile.fullname}
          placeholder='Full name'
          onChangeText={this.onChangeFullName}
          icon={this.renderIconPerson}
        />
        <Button style={[styles.inputStyle]} status='primary' appearance='ghost'
                onPress={this.setModalVisible}>OK</Button>
      </Layout>
    );
  };
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {height: 50, width: '90%', marginTop: 5, marginBottom: 5},
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  welcomeImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  lowerLayout: {
    alignItems: 'center',
    marginTop: 60,
  },
  buttonSize: {backgroundColor: '#FFFFFF'},
  section: {
    height: 60,
    padding: 16,
    borderBottomWidth: 1,
  },
  notificationSection: {
    paddingTop: 40,
  },
  soundEnabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalContainer: {
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = {
  getProfile,
  saveProfile,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
