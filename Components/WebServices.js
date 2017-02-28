import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    AsyncStorage
} from 'react-native';

// upload a form to the server
export async function uploadForm(formToSubmit)
{
  GLOBAL = require('../Globals');
  var url = GLOBAL.BASE_URL + (formToSubmit["issues"] != null ? "issues" : "observations");
  var TOKEN = await AsyncStorage.getItem("accessToken");
  var loginDetailsJSON = await AsyncStorage.getItem("loginDetails");
  var loginDetails = JSON.parse(loginDetailsJSON);

  console.log(url);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Token': loginDetails["access-token"],
      'Client': loginDetails["client"],
      'Expiry': loginDetails["expiry"],
      'Token-Type': loginDetails["token-type"],
      'UID': loginDetails["uid"]
    },
    body: JSON.stringify(formToSubmit)
  }).then(async(response) => {
    return response;
  }).catch((error) => {
    console.error(error);
    // re-throw back up the chain
    //throw error;
    return Promise.reject(error);
  });
}

// retrieve the list of cached failed submissions
export async function getFailedForms() {
  var formsToSubmitString = await AsyncStorage.getItem(GLOBAL.FORMS_TO_SUBMIT_KEY);
  var formsToSubmit = [];
  if (formsToSubmitString != null)
  {
    console.log("C");
    console.log(formsToSubmitString);
      formsToSubmit = JSON.parse(formsToSubmitString)
  }

  return formsToSubmit;
}

// remove an object from an array by value
function removeFromArray(array, value){
    var idx = array.indexOf(value);
    if (idx !== -1) {
        array.splice(idx, 1);
        console.log("FOUND");
    }
    else {
      console.log("NOT FOUND");
    }
    return array;
}

// remove an object from an array where the object[key] == value[key]
function removeFromArrayByKey(key, array, value) {
    var idx = -1;
    for (var i = 0; i < array.length; i++)
    {
        if (array[i][key] == value[key])
        {
          idx = i;
          break;
        }
    }

    if (idx !== -1) {
        array.splice(idx, 1);
        console.log("FOUND");
    }
    else {
      console.log("NOT FOUND");
    }
    return array;
}

// add a failed form submission to our cache, to upload later
export async function storeFailedForm(dictToSend) {
  var formsToSubmit = await getFailedForms();
  formsToSubmit.push(dictToSend);

  var newForms = JSON.stringify(formsToSubmit);
  //console.log("New forms value: " + newForms);
  await AsyncStorage.setItem(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}

//removeFormFromForms
// remove a failed from submission from our cache, for when it has been re-submitted
export async function removeFailedForm(dictToRemove) {
  var formsToSubmit = await getFailedForms();
  formsToSubmit = removeFromArrayByKey("uid", formsToSubmit, dictToRemove);

  var newForms = JSON.stringify(formsToSubmit);
  await AsyncStorage.setItem(GLOBAL.FORMS_TO_SUBMIT_KEY, newForms);
}