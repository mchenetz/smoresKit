var restify = require('restify');
const uuidv1 = require('uuid/v1');


var server = restify.createServer();
server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.bodyParser({
    mapParams: true
}));
server.use(restify.plugins.acceptParser(server.acceptable));

var muuid = "";
var baseurl = '/smoreskit/api/v32.1/roast';

server.get(baseurl, function(req, res, next) {
    res.send('Smoreskit v32.1');
    return next();
});

server.get(baseurl + '/marshmallow', function (req,res, next) {
    if (muuid==="") {
        res.send({
            error: 'No Marshmallow found!',
            code: 404
        });
    } else {
    res.send({
        action:'retrieved marshmallow',
        id: muuid,
        code: 200
    });}
    return next();

});

server.post(baseurl + '/new',
    function(req, res, next) {
        muuid = uuidv1();
        req.someData = {
            action: 'Add Marshmallow',
            id: muuid,
            code: 200,
            name: req.body.name
        };
        return next();
    },
    function(req, res, next) {
        res.send(req.someData);
        return next();
    }
);

server.put('/roast/turn',
    function(req, res, next) {
        muuid = uuidv1();
        req.someData = {
            action: 'Add Marshmallow',
            id: muuid,
            code: 200 };
        return next();
    },
    function(req, res, next) {
        res.send(req.params.id);
        return next();
    }
);
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
