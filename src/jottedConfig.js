// jottedConfig.js

const jottedConfig = {
    files: [{
            type: 'css',
            content: ''
        },
        {
            type: 'js',
            // content: ''
            content: 'console.log(\'Hello world\');'
        }, 
        {
            type: 'html',
            content: '<h1>Demo</h1>'
        }
    ],
    // showBlank: true,
    debounce: 500,
    plugins: [
    {
        name: 'play',
        options: {
          // to start with a blank preview when initializing the plugin,
          // and only run the initial content after the first Run press.
          // firstRun: false
        }
    },
    // 'demoPlugin',
    // 'markdown',
    {
        name: 'codemirror',
        options: {
            lineNumbers: true,
            autoRefresh: true,
            extraKeys: {'Ctrl-Space': 'autocomplete'}
        }
        // value: document.documentElement.innerHTML
    }
    ]
};

export default jottedConfig;