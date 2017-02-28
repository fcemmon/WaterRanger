import React, {Component, PropTypes} from 'react';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    AsyncStorage,
    Image,
    StatusBar
} from 'react-native';

import HideableView from 'react-native-hideable-view';
import store from 'react-native-simple-store';

var t = require('tcomb-form-native');
var _ = require('lodash');
var Form = t.form.Form;

var Gender = t.enums({M: 'Male', F: 'Female'});

var LoginForm = t.struct({email: t.String, password: t.String});

// clone the default stylesheet
// const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// Overiding our other form styles
// stylesheet.textbox.normal.backgroundColor = '#ffffff';
// stylesheet.textbox.normal.borderColor = '#ffffff';
// stylesheet.textbox.error.backgroundColor = '#ffffff';

var options = {
  fields: {
    email: {
      autoCapitalize: 'none'
    },
    password: {
      password: true,
      secureTextEntry: true
    }
  },
  auto: 'placeholders'
}

export default class LoginScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error : '',
      visible : false
    };
  }

  render() {
    return (
      <View style={loginstyles.loginContainer}>
        <StatusBar barStyle={'light-content'}/>
        <View style={loginstyles.loginLogoContainer}>
          <Image
            style={loginstyles.loginLogo}
            source={require('../images/rangers-logo.png')}
          />
        </View>
        <View style={[styles.errorTextContainer, this.state.error ? {} : styles.hidden]}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
        <Form ref="form" type={LoginForm} options={options} style={styles.loginFormContainer}/>
        <TouchableHighlight style={styles.button} onPress={this.login.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }

  async login() {
    
    var value = this.refs.form.getValue();
    if (!value)
        return;

    GLOBAL = require('../Globals');
    return fetch(GLOBAL.BASE_URL + "auth/sign_in", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": value.email, "password": value.password})
    }).then(async(response) => {
      var accessToken = null;
      var client = null;
      var expiry = null;
      var tokenType = null;
      var uid = null;
      try {
        accessToken = response["headers"]["map"]["access-token"][0];
        client = response["headers"]["map"]["client"][0];
        expiry = response["headers"]["map"]["expiry"][0];
        tokenType = response["headers"]["map"]["token-type"][0];
        uid = response["headers"]["map"]["uid"][0];
      } catch (e) {}

      var error = false;
      if (response.status == 200) {
        if (accessToken != null) {
          try {
            var loginDetails = {
              "access-token": accessToken,
              "client": client,
              "expiry": expiry,
              "token-type": tokenType,
              "uid": uid
            };
            let value = await AsyncStorage.setItem('accessToken', accessToken);
            let value2 = await AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
          } catch (e) {}
          this.props.checkLogin();
        }
        //error = "Please check your login and try again.";
      } else {
          error = "Please check your login and try again.";
      }

      if (error != null) {
          this.setState({"error": error});
      }

      console.log(response);
    }).catch((error) => {
      console.error(error);
      error = "Please check your connection and try again.";
      this.setState({"error": error});
    });
  }

}

var formStyles = require('../styles/FormStyles');
var loginstyles = require('../styles/LoginStyles');
var styles = require('../styles/Styles');
