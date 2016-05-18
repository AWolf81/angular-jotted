// jottedDir.js
import Jotted from 'jotted';
import Marked from 'marked';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'jotted/jotted.css';

import codemirror from 'codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/htmlmixed/htmlmixed';

import jottedConfig from './jottedConfig';
import './jottedDir.css';

class JottedDir {
    constructor($window, $uibModal, marked, jottedMinErr, jottedService) {
        // console.log('test', CodeMirror, window.CodeMirror);
        $window.Marked = Marked; // global for jotted
        $window.CodeMirror = codemirror; // dito
        this.$uibModal = $uibModal;
        this.marked = marked; // marked angular service
        this.jottedMinErr = jottedMinErr;
        this.jottedService = jottedService;

        this.scope = {};
        this.bindToController = {
            config: '=?'
        };
        this.template = require('./partials/main.html');

        console.log('test', angular.isObject(this.config));
        this.config = this.config || angular.copy(jottedConfig);

        this.controller = () => {
        }; // later controller for handling clicks etc.
        this.controllerAs = 'jottedCtrl';

    }

    link(scope, element, attrs, ctrl) {
        // console.log('jotted config', ctrl, JottedDir.instance.config);
        let self = JottedDir.instance;
        let config = angular.merge(ctrl.config, JottedDir.instance.config);
        // console.log(config, JottedDir.instance.config, ctrl.config);
        // ctrl.config = config;

        // console.log('got ctrl.config', ctrl.config);
        if ( ctrl.config instanceof Array ) {
            // throw an error --> we need an object not an array to work with
            throw self.jottedMinErr('config', 'Expected Object but got \'{0}\'.', 'Array');
        }
        // let jottedInst = new Jotted(element[0], JottedDir.instance.config);
        // Jotted.plugin('awDirPlugin', (jotted, options) => {
        //     // do stuff
        //     console.log('plugin started');
        //     options.files = JottedDir.instance.files;
        // });

        console.log('jotted config', config);
        // let jotted = new Jotted(document.querySelector('#jotted-editor'), config);
        // self.jottedService.setInstance(jotted);
        let jotted = self.jottedService.createInst(config);
        console.log(jotted);
        
        // var pluginDemo = Jotted.plugin('demoPlugin', function (jotted, options) {
        //     // do stuff
        //     options.pane = 'html';
        //     console.log('plugin', jotted, options);
        // });

        // Jotted.register('demoPlugin', pluginDemo);

        // add help icon for modal showing some infos to the ediot
        var $button = document.createElement('button');
        $button.className = 'jotted-button jotted-button-help';
        $button.innerHTML = '?';

        jotted.$container.appendChild($button);
        console.log(jotted.$container);
        $button.addEventListener('click', self.showHelp.bind(self));

        // update angular model on change
        jotted.on('change', function (params, callback) {
            // params.content += 'Content added by plugin.'
            // params.content not working with codemirror and playplugin
            // --> use codemirror.doc.getValue()
            let type = params.type,
                index = -1,
                newParams = {
                    type: type,
                    content: params.cmEditor.doc.getValue(), //params.content,
                    file: params.file
                    // no forceRun needed here --> only in loadGist
                };

            // array files = [{type:'html', content: '', file:''},...]
            
            for (var i=0; i < ctrl.config.files.length; i++) {
                if ( ctrl.config.files[i].type === type ) {
                    index = i;
                    i = ctrl.config.files.length; // exit loop 
                }
            }

            if ( index === -1 ) {
                // not in array
                ctrl.config.files.push(newParams);
            }
            else {
                angular.extend(ctrl.config.files[index], newParams);
            }
            
            //console.log('params changed', params, ctrl.config.files, params.cmEditor.doc.getValue());

            scope.$apply();
            callback(null, params)
        });
    }

    showHelp() {
        this.$uibModal.open({
            template: '<div class="modal-header">'+
            '<h3 class="modal-title">Help</h3>'+
            '</div><div class="modal-body">'+ 
                this.marked(require('./static/help.md')) + '</div>' + 
            '<div class="modal-footer">'+
            '<button class="btn btn-primary" type="button" ng-click="helpModalCtrl.cancel()">Close</button>'+
            '</div>',
            controllerAs: 'helpModalCtrl',
            controller: function($uibModalInstance) {
                'ngInject';
                this.cancel = () => {
                    $uibModalInstance.dismiss();
                };
            }
        });
    }
    // Create an instance so that we can access this inside link
    static directiveFactory($window, $uibModal, marked, jottedMinErr, jottedService) {
        'ngInject';
        JottedDir.instance = new JottedDir($window, $uibModal, marked, jottedMinErr, jottedService);
        return JottedDir.instance;
    }
}

export default JottedDir.directiveFactory;