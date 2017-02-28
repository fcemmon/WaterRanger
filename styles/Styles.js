import React, { Component, PropTypes } from 'react';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { GlobalStyles } from '../styles/GlobalStyles.js';

// Basic styles

const styles = EStyleSheet.create({
  hidden: {
    height: 0,
    padding: 0,
    width: 0
  },
  scroll_container: {
    flex:1,
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    flex:1,
  },
  tabView: {
    backgroundColor: '#ffffff',
    flex:1
  },
  statusBar: {
    backgroundColor: '#1c3653',
  },
  navBarContainer: {
    backgroundColor: '#1c3653',
    // NavBarContainer styles here (all view styles are valid)
    // unlikely that you will need to add any styles here
  },
  navBar: {
    borderTopWidth: 0,
    borderBottomColor: '#1c3653',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // default iOS styles:
    backgroundColor: '#1c3653',
    //height: IOS_NAV_BAR_HEIGHT,
    paddingLeft: 8,
    paddingRight: 8,

    // default Android styles:
    backgroundColor: '#1c3653',
    //height: ANDROID_NAV_BAR_HEIGHT,
    padding: 16,
  },
  navHidden: {
    position: 'absolute',
    top: Dimensions.get('window').height
  },
  logoContainer: {
    alignItems: 'center',
    height: 19,
    width: 23
  },
  logo: {
    alignSelf: 'center',
    height: 19,
    width: 23
  },
  tabBar: {
    backgroundColor: '#ffffff',
  },
  title: {
    alignItems: 'center',
    flex:1,
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  uploadImage: {
    width:100,
    height:100,
  },
  myCallout: {
    flex: 1,
    width: 100
  },
  map: {
    flex: 2,
    margin: 0,
    borderWidth: 0,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '$colorBrightBlue',
    borderColor: '$colorBrightBlue',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777'
  },
  tabContent: {
      paddingTop: 20,
      flex: 1
  },
  tabText: {
      color: '#4A729F',
      margin: 50
  },
  tabStyle: {
    marginTop: 2,
    marginBottom: 4
  },
  tabTitleStyle: {
    color: '#4A729F'
  },
  selectedTabTitleStyle: {
    color: '#1c3653'
  },
  tabIcon: {
    color: '#4A729F',
    fontSize: 25,
    height: 25,
    marginTop: 0
  },
  tabIconSelected: {
    color: '#1c3653',
    fontSize: 25,
    height: 25,
    marginTop: 20
  },
  mapMarker: {
    height: 24,
    width: 34
  },
  // Forms
  errorTextContainer: {
    backgroundColor: '$colorRed',
    borderRadius: 5,
    height: 36,
    marginTop: 15,
    marginBottom: 15,
    padding: 10
  },
  errorText: {
    color: '$colorWhite',
    textAlign: 'center'
  }
});

// Form Styles

// var t = require('tcomb-form-native');

// t.form.Form.stylesheet.textbox.normal.backgroundColor = '#00FF00';

module.exports = styles;
