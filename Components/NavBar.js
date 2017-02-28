import React, {Component, PropTypes} from 'react';
import {
  View
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

export default class NavBarDark extends React.Component {
  render() {
    return (
      <NavBar style={styles} statusBar={{barStyle: 'light-content'}}>
        <NavTitle style={styles.title}>
          <View style={styles.logoContainer}>
            <SvgUri
              source={require('../images/crossed-oars-white.svg')}
              fill="white"
              height="19"
              width="23"
            />
          </View>
        </NavTitle>
      </NavBar>
    );
  }
}

var styles = require('../styles/Styles');