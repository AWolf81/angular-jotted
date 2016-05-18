// export default class Library {
//   constructor() {
//     this._name = 'Library';
//   }
//   get name() {
//     return this._name;
//   }
// }

// index.js
import JottedDir from './jottedDir';
import JottedSvc from './jottedService';

import ngUib from 'angular-ui-bootstrap';
import ngMarked from 'angular-marked';

export default angular.module('aw-jotted', [
        ngUib,
        ngMarked
    ])
    .directive('jotted', JottedDir)
    .service('jottedService', JottedSvc.jottedServiceFactory)
    .service('jottedMinErr', function() {
        // error handler to throw exceptions
        var minErr = angular.$$minErr('aw-jotted');
            return function() {
                var error = minErr.apply(this, arguments);
                var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
                return new Error(message);
        }
    }).name;