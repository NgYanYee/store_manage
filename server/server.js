var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var route = require('./route/index.js');
var app = express();



// 设置视图
app.set('views', path.join(__dirname, 'views')); //设置 views文件夹为视图文件夹, __dirname 为全局变量，为当前脚本地址
app.set('view engine', 'ejs'); //设置视图引擎为 ejs
app.set('port', 8081);

app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));
app.use(bodyParser.json()); //解析 json
app.use(bodyParser.urlencoded({
	extended: false
})); //加载解析urlencoded请求体的中间件

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/homepage/register', route.homepage.register);
app.post('/api/homepage/login', route.homepage.login)

/* app.use(function(req, res, next) {
	if(req.session.user === undefined) {
		res.redirect(302, '/html/login.html');
	}else {
		next()
	}
}) */

app.post('/api/homepage/exit', route.homepage.exit)
app.post('/api/homepage/info', route.homepage.info)
app.post('/api/homepage/beInStore', route.homepage.beInStore)
app.post('/api/homepage/beOutStore', route.homepage.beOutStore)
app.post('/api/homepage/addItem', route.homepage.addItem)
app.post('/api/homepage/addProducer', route.homepage.addProducer)
app.post('/api/homepage/addCustomer', route.homepage.addCustomer)
app.post('/api/homepage/getItemList', route.homepage.getItemList)
app.post('/api/homepage/getInList', route.homepage.getInList)
app.post('/api/homepage/getOutList', route.homepage.getOutList)






// 404 error
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 错误控制

//将错误打印到网页上
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//生产环境打印错误
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

var server = http.createServer(app);
server.listen(8081, function() {
	console.log('The server is ready in http://localhost:8081');
});

module.exports = app;