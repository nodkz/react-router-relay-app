var path = require('path');
var express = require('express');
var compression = require('compression');
var proxy = require('http-proxy').createProxyServer();

var app = express();

var environment = require('./environment.config.js');

var staticDirectory = path.resolve(__dirname, '../dist');
console.log('production environment: %s, dir: %s', environment.isProduction, staticDirectory);

if (!environment.isProduction) {
    environment.configureDevServer(app);
}

app.use(compression({}));
app.use(express.static(staticDirectory));

app.use('/graphql', function(req, res){
    return proxy.web(req, res, {
        target: 'http://localhost:8080/graphql'
    })
});

app.get('*', function(req, res) {
    if(environment.isProduction)
        res.sendFile(path.resolve(staticDirectory, 'index.html'));
    else
        res.sendFile(path.resolve(__dirname, 'devserver.html'));
});

app.listen(3000, 'localhost', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000');
});


import Schema from '../data/schema';
import graphqlHTTP from 'express-graphql';
var graphQLServer = express();
graphQLServer.use(express.static(__dirname));

graphQLServer.use('/graphql', graphqlHTTP(() => ({
    schema: Schema,
    pretty: true
})));

graphQLServer.listen(8080, e=>{
    if(e){
        console.error(e);
        return;
    }
    console.log('GraphQL server listening @ http://localhost:8080/');
});