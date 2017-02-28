import React from 'react';
import {
  ActivityIndicatorIOS,
  AppRegistry,
  ScrollView,
  Navigator,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  Image,
  StatusBar
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import SvgUri from 'react-native-svg-uri';
import HideableView from 'react-native-hideable-view';
import LoginScene from './Components/LoginScene';
import MapScene from './Components/MapScene';
import AddScene from './Components/AddScene';
import MyObservationsScene from './Components/MyObservationsScene';
import SettingsScene from './Components/SettingsScene';
import NavBarDark from './Components/NavBar';
import { NavigationActions } from 'react-navigation';
import store from 'react-native-simple-store';

export default class WaterRangers extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loadedCookie: false,
      notifCount: 0,
      presses: 0,
      marker: false,
      error: null,
      latitude: 'unknown',
      longitude: 'unknown',
      marker: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  checkLogin() {
    AsyncStorage.getItem("accessToken").then((value) => {
      let isAuthenticated;
      if (value == null) {
        isAuthenticated = false;
      } else {
        isAuthenticated = true;
      }
      this.setState({loggedIn: isAuthenticated, loadedCookie: true});
    }).done();
  }

  componentWillMount() {
    this.checkLogin();
  }

  render() {
    if (this.state.loadedCookie) {
      if (this.state.loggedIn) {
        return (
          <View style={styles.tabView}>
            <NavBarDark/>
            <TabView 
              ref={nav => { this.navigator = nav; }} 
              screenProps={{
                geoLat: this.state.latitude, 
                geoLng: this.state.longitude, 
                checkLogin: this.checkLogin.bind(this)
              }} />
          </View>
        )
      }
    }
    return (<LoginScene checkLogin={this.checkLogin.bind(this)}/>);
  }

}

const TabView = TabNavigator({
  Map: {
    screen: MapScene,
  },
  Add: {
    screen: AddScene,
  },
  Observations: {
    screen: MyObservationsScene,
  },
  Settings: {
    screen: SettingsScene,
  },
}, {
  animationEnabled: true,
  lazyLoad: true,
  tabBarOptions: {
    activeTintColor: '#1c3653',
    inactiveTintColor: '#999999'
  },
});

AppRegistry.registerComponent('WaterRangers', () => WaterRangers);

var styles = require('./styles/Styles');