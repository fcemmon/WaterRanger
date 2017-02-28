import { GlobalStyles } from '../styles/GlobalStyles.js';

var t = require('tcomb-form-native');

t.form.Form.stylesheet.textbox.normal.backgroundColor = '#ffffff';

// var t = require('tcomb-form-native');
// var _ = require('lodash');
// const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// stylesheet = {
//   fieldset: {
//     flex: 1
//   },
//   formGroup: {
//     normal: {
//       marginBottom: 10
//     },
//     error: {
//       marginBottom: 10
//     }
//   },
//   textbox: {
//     normal: {
//       backgroundColor: '$colorWhite',
//       color: '$colorBlack',
//       fontSize: '$fontSize',
//       height: 36,
//       padding: 10,
//       borderRadius: 5,
//       borderColor: '$lineColor',
//       borderWidth: 1,
//       marginBottom: 5
//     },
//     // the style applied when a validation error occours
//     error: {
//       color: '$colorBlack',
//       fontSize: '$fontSize',
//       height: 36,
//       padding: 10,
//       borderRadius: 5,
//       borderColor: '$errorColor',
//       borderWidth: 1,
//       marginBottom: 5
//     },
//     // the style applied when the textbox is not editable
//     // notEditable: {
//     //   fontSize: FONT_SIZE,
//     //   height: 36,
//     //   padding: 7,
//     //   borderRadius: 4,
//     //   borderColor: BORDER_COLOR,
//     //   borderWidth: 1,
//     //   marginBottom: 5,
//     //   color: DISABLED_COLOR,
//     //   backgroundColor: DISABLED_BACKGROUND_COLOR
//     // }
//   }
// };

// t.form.Form.stylesheet.formGroup.normal.flex = 1;
// t.form.Form.stylesheet.formGroup.error.flex = 1;
// t.form.Form.stylesheet.textbox.normal.backgroundColor = '#ffffff';