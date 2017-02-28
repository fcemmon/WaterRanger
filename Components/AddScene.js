import React, {Component, PropTypes} from 'react';
import {
    Image,
    ActivityIndicatorIOS,
    AppRegistry,
    Navigator,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    AsyncStorage,
    MapView,
    ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import {uploadForm, storeFailedForm} from './WebServices';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

Form.i18n = {
  optional: '',
  required: ' *' // inverting the behaviour: adding a postfix to the required fields
};

var imagePickerOptions = {
  title: 'Choose Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

var WildlifeType = t.enums({
  Mammal: 'Mammal',
  Reptile: 'Reptile',
  Amphibian: 'Amphibian',
  Fish: 'Fish',
  Plant: 'Plant',
  Insect: 'Insect',
  Bird: 'Bird',
  Species: 'Species at risk'
});

var InvasiveSpeciesType = t.enums({
  Phragmites: 'Phragmites',
  Loosestrife: 'Loosestrife',
  "Dog-Strangling Vine": 'Dog-Strangling Vine',
  "Introduced Honeysuckle": 'Introduced Honeysuckle',
  "Zebra Mussels": 'Zebra Mussels',
  "Other Invasive": 'Other Invasive',
  "Eurasian Milfoil": 'Eurasian Milfoil',
  Goldfish: 'Goldfish'
});

var AddObservationForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  wildlife: t.maybe(t.list(WildlifeType)),
  invasiveSpecies: t.maybe(t.list(InvasiveSpeciesType)),
  waterQualityPh: t.maybe(t.Number),
  waterQualityWaterTemp: t.maybe(t.Number),
  waterQualityAirTemp: t.maybe(t.Number),
  waterQualityDissolvedOxygen: t.maybe(t.Number),
  waterQualityEColi: t.maybe(t.Number),
  waterQualityConductivity: t.maybe(t.Number),
  waterQualityAlkalinity: t.maybe(t.Number),
  waterQualityHardness: t.maybe(t.Number),
  waterQualityTurbidity: t.maybe(t.Number),
  waterQualityKjeldahlNitrogen: t.maybe(t.Number),
  waterQualityPhosphorus: t.maybe(t.Number),
  waterQualitySalinity: t.maybe(t.Number),
  waterQualityPhosphates: t.maybe(t.Number),
  waterQualitySecchiDepth: t.maybe(t.Number),
  waterQualityNitrites: t.maybe(t.Number),
  waterQualityNitrates: t.maybe(t.Number),
  iceWatch: t.maybe(t.Boolean),
  notes: t.maybe(t.String)
});

var IssueType = t.enums({
  algae: 'Algae',
  water_quality: 'Water Quality',
  pollution: 'Pollution',
  shoreline: 'Shoreline',
  wildlife: 'Wildlife',
  other: 'Other'
});

var AddIssueForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  category: IssueType,
  description: t.maybe(t.String),
  weather: t.maybe(t.String),
  seenBefore: t.maybe(t.Boolean),
  notifiedAgencies: t.maybe(t.String),
  contactEmail: t.maybe(t.String),
  contactPhone: t.maybe(t.String)
});

var options = {
  fields: {
    wildlife: {
      factory: t.form.select
    }
  }
};

export default class AddScene extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Add',
      icon: ({ tintColor, focused }) => (
        <Icon 
          name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} style={styles.tabIcon} 
        />
      ),
    },
  }

  constructor(props) {
    super(props);
    const {state} = this.props.navigation;
    this.state = {
      'form': 'observation',
      'marker': state.params.marker
    };
    console.log('Marker:', state.params.marker)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({'marker': nextProps.navigation.state.params.marker})
  }

  onChooseObservation() {
    this.setState({'form': 'observation'});
  }

  onChooseIssue() {
    this.setState({'form': 'issue'});
  }

  render() {
    
    console.log('Add props: ', this.props);

    options = {
      fields: {
        wildlife: {
          factory: t.form.select
        }
      }
    };

    var defaultValue = {};

    if (this.state.marker.id != '-1') {
      options["fields"]["bodyOfWater"] = {
        "editable": false
      };
      options["fields"]["locationName"] = {
        "hidden": true
      };
      options["fields"]["locationDescription"] = {
        "hidden": true
      };

      defaultValue = {
        bodyOfWater: this.state.marker.title.length ? this.state.marker.title : "Not added",
        locationName: "ignore",
        locationDescription: "ignore"
      };
    }

    var formComponent = this.state.form == 'issue'
        ? (<Form ref="form" type={AddIssueForm} value={defaultValue} options={options}/>)
        : (<Form ref="form" type={AddObservationForm} value={defaultValue} options={options}/>);

    return (
      <View style={styles.container}>
        <Text>Latitude {this.state.marker.latitude}</Text>
        <Text>Longitude {this.state.marker.longitude}</Text>
        <TouchableHighlight onPress={this.onChooseObservation.bind(this)}>
          <Text>Observation</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onChooseIssue.bind(this)}>
          <Text>Issue</Text>
        </TouchableHighlight>
        <ScrollView>
          <View style={styles.scroll_container}>
            {formComponent}
            <TouchableHighlight style={styles.button} onPress={this.choosePicture.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableHighlight>
            <Image source={this.state.avatarSource} style={styles.uploadImage}/>
            <TouchableHighlight style={styles.button} onPress={this.submit.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }

  choosePicture() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can display the image using either data...
        const source = {
          uri: 'data:image/jpeg;base64,' + response.data,
          isStatic: true
        };

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {
            uri: response.uri.replace('file://', ''),
            isStatic: true
          };
        } else {
          const source = {
            uri: response.uri,
            isStatic: true
          };
        }

        var newState = this.state;
        newState['avatarSource'] = source;

        this.setState(newState);
      }
    });
  }

  takePicture() {
    this.camera.capture().then((data) => console.log(data)).catch(err => console.error(err));
  }

  async submit() {

    var value = this.refs.form.getValue();
    if (!value)
        return;

    GLOBAL = require('../Globals');

    var url = GLOBAL.BASE_URL + "observations";
    var dictToSend = {};
    var dateString = new Date().toJSON();

    // these need to be populated from the form fully
    if (this.state.form == 'issue') {
      url = GLOBAL.BASE_URL + "issues";
      dictToSend = {
        "issues": [
          {
            "observed_on": dateString,
            "group_tokens": "",
            "category": value.category,
            "notes": {
              "details": "",
              "weather": "",
              "seen_before": "",
              "notified_agencies": ""
            },
            "contact_info": {
              "email": value.contactEmail,
              "phone": value.contactPhone
            }
          }
        ]
      };
    } else {
      url = GLOBAL.BASE_URL + "observations";
      dictToSend = {
        "observations": [
          {
            "observed_on": dateString,
            "notes": "",
            "group_tokens": "3",
            "data": {
              "wildlife": [""],
              "invasive_species": [""],
              "ph": "",
              "water_temperature": "",
              "air_temperature": "",
              "oxygen": "",
              "ecoli": "",
              "conductivity": "",
              "alkalinity": "",
              "hardness": "",
              "turbidity": "",
              "total_kjeldahl_nitrogen": "",
              "total_phosphorus": "",
              "salinity": "",
              "water_depth": "",
              "ice": ""
            }
          }
        ]
      };
    }

    var dictKey = (this.state.form == 'issue')
        ? "issues"
        : "observations";
    if (this.state.marker.id != '-1') {
      dictToSend[dictKey][0]["location_id"] = this.state.marker.id;
    } else {
      dictToSend[dictKey][0]["location_attributes"] = {
        "lat": this.state.marker.latitude,
        "lng": this.state.marker.longitude,
        "body_of_water": value.bodyOfWater,
        "name": value.locationName,
        "description": value.locationDescription
      };
    }
    dictToSend["uid"] = "" + new Date();
    //console.log(dictToSend);

    uploadForm(dictToSend).then(async(response) => {

    console.log(response);
      var error = false;
      if (response.status == 200 || response.status == 204) {
        // success, show some message and return?
      } else {
        storeFailedForm(dictToSend);
        error = "Please check your connection and try again.";
        this.setState({"error": error});
      }

    }).catch((error) => {
      console.error(error);
      storeFailedForm(dictToSend);
      error = "Please check your connection and try again.";
      this.setState({"error": error});
    });
  }
}

var formStyles = require('../styles/FormStyles');
var styles = require('../styles/Styles');
