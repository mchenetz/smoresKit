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
global.turn = 1;
global.marshName = '';

var baseurl = '/smoreskit/api/v32.2/roast';

server.get(baseurl, function(req, res, next) {
    res.send('Smoreskit v32.1');
    return next();
});

server.get(baseurl + '/marshmallow/:guid', function (req,res, next) {
    for (parts in req.params){
        if (req.params.hasOwnProperty('guid')){
            muuid = req.params.guid;
        }
    }
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
            id: muuid ,
            code: 200
        };
        return next();
    },
    function(req, res, next) {
        res.send(req.someData);
        return next();
    }
);

server.put(baseurl + '/turn',
    function(req, res, next) {

            rotation = (360 / global.turn);
            global.turn = global.turn + 1;
            if (global.turn > 4) {
                global.turn = 1;
            }

            for (parts in req.body){
                if (req.body.hasOwnProperty('id')){
                    muuid = req.body.id;
                }
            }
            res.send({
                id: muuid,
                rotation: rotation.toString()

            });
            return next();
    }
);
server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
