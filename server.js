var path = require('path');

var express = require('express'),
    app = express();

module.exports = cb => {
    app.use('/public', express.static(path.join(__dirname, '.public'),{
        index: false,
        extensions: ['js', 'html']
    }));

    app.get('/*', (req, res) => {
       res.sendFile(path.join(__dirname + '/index.html'));
    });

    cb({ app });
};