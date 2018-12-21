var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require("./routes/routes.js");
var app = express();
//console.log('...MONGO EVENT ERROR');
//----Kết nối Mongodb bằng mongoose
var mongodb_url = 'mongodb://localhost:27017/DucPham';
mongoose.Promise = global.Promise;
var MongoOptions = {
    poolSize: 10,
    reconnectTries: 3600,
    reconnectInterval: 1000,
    autoReconnect: true,
    useNewUrlParser: true
};
mongoose.set('useCreateIndex', true);
mongoose.connect(mongodb_url, MongoOptions);
var db = mongoose.connection;
db.on('error', function (err) {
    console.log('Ket noi MongoDB loi');
});
db.on('connected', function () {
    console.log('Ket noi MongoDB thanh cong');
    console.log('Dang ket noi Database: ' + db.name);
	console.log('--------------------------------------------');
});
//---------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("Application running on port: ", server.address().port);
});