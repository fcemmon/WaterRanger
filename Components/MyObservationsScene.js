import React, {Component, PropTypes} from 'react';
import {
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    MapView,
    ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {uploadForm, removeFailedForm, getFailedForms} from './WebServices';

var loadDataOnRender = true;

export default class MyObservationsScene extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Observations',
      icon: ({ tintColor, focused }) => (
        <Icon 
          name={focused ? 'ios-search' : 'ios-search-outline'} style={styles.tabIcon} 
        />
      ),
    },
  }

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      'dataSource': ds.cloneWithRows([]),
      'formsToSubmit':[]
    };
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    var formsToSubmit = await getFailedForms();
    console.log(formsToSubmit);
    this.setState({
      'dataSource': this.state.dataSource.cloneWithRows(formsToSubmit),
      'formsToSubmit':formsToSubmit
    });
  }

  // attempt to upload the first cached form in the list
  async tryAgain() {
    formsToSubmit = this.state["formsToSubmit"];

    console.log("A");
    if (formsToSubmit != null && formsToSubmit.length > 0) {
      console.log("B");
      formToSubmit = formsToSubmit[0];

      uploadForm(formToSubmit).then(async(response) => {

        var error = false;
        if (response.status == 200 || response.status == 204) {
          console.log("Finished uploading");
          this.removeForm(formToSubmit);
        } else {
            console.log("Finished uploading with failure");
        }

        console.log(response);
      }).catch((error) => {
        console.error(error);
        error = "Please check your connection and try again.";
        this.setState({"error": error});
      });
    }
  }

  // remove a form once we have successfully re-uploaded it
  async removeForm(dictToRemove) {
    await removeFailedForm(dictToRemove);
    this.loadData();
  }

  render() {
    return (
      <View>
        <Text>My Observations</Text>
        <Text>Awaiting Internet Connection</Text>
        <TouchableHighlight style={styles.button} onPress={this.tryAgain.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Try uploading again</Text>
        </TouchableHighlight>
        <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{JSON.stringify(rowData)}</Text>}/>
      </View>
    );
  }
}

var styles = require('../styles/Styles');