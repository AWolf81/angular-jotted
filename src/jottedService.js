// jottedService.js
import Jotted from 'jotted';

export default class JottedService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
        this.jotted = undefined; // jotted instance, needed for updating
        this.loadGist = this.loadGist.bind(this);
        this.update = this.update.bind(this);
        // this.userService = userService;
        //this.errorHandler = errorHandler.bind(this);
        //this.tasks = tasks;
    }

    createInst(config) {
        this.config = config;
        this.jotted = new Jotted(document.querySelector('#jotted-editor'), 
            this.config);
        console.log('created config', this.config);
        console.log('create editor', this.jotted._get('editor'));
        return this.jotted;
    }

    update(config) {
        console.log('updating config', config, 'this', this, 'jotted', this.jotted);
        console.log(this.jotted._get('editor'));
        this.config = angular.merge(this.config, config);

        // let newParams = {},
        //     conf = this.config.files;
        // for (let i=0; i < conf.length; i++) {
        //     newParams[i] = {
        //         type: conf[i].type,
        //         content: conf[i].content
        //     };
        // }

        setTimeout(() => {
            for (let i=0; i < this.config.files.length; i++) {
                this.jotted.trigger('change', angular.copy(this.config.files[i]));//this.config.files);
            }
        },  0);
    }

    loadGist(id) {
        return this.$http.get(`https://api.github.com/gists/${id}`)
            .then((response) =>  {
                let data = response.data,
                    config = {files: []}; // config of jotted

                // check if there is a index.html in gist
                // if not return success: false
                let fileNames = Object.keys(data.files);

                if ( fileNames.indexOf('index.html') === -1 ) {
                    return {
                        success: false,
                        message: 'No \'index.html\' in Gist available.'
                    };
                }

                let file = {};

                // jotted file types --> have to match gist types
                /* extracted from source, for now just convert to lowercase
                    var defaultModemap = {
                      'html': 'html',
                      'css': 'css',
                      'js': 'javascript',
                      'less': 'less',
                      'styl': 'stylus',
                      'coffee': 'coffeescript'
                }*/
                const gistLanguageMap = {
                    'javascript': 'js'
                    // 'html': 'htmlmixed'
                };
                let curMappedLang = '', rawLang = '';

                for ( var i = 0; i < fileNames.length; i++ ) {
                    file = data.files[fileNames[i]];
                    rawLang = file.language.toLowerCase();

                    curMappedLang = gistLanguageMap[rawLang] || rawLang;

                    //console.log('loaded types', curMappedLang);
                    //console.log('loaded content', file.content);
                    config.files.push({
                        type: curMappedLang, // mapping where needed
                        content: file.content,
                        play: {
                            // force run on last load item, otherwise css was not loaded properly
                            forceRun: (fileNames.length - 1 === i)
                        }
                        // should there be an option to load the file?
                        // --> content is better, no new requests.
                    });
                }

                // pick relevant data
                // --> with link we can direct user to gist, so we don't need
                //     to use everything
                return {
                    success: true,
                    message: 'Gist loaded.',
                    url: data.url,
                    description: data.description,
                    files: data.files,
                    config: config
                };
            }, (response) => response);
    }

    static jottedServiceFactory($http){
        'ngInject';
        return new JottedService($http);
    }
}