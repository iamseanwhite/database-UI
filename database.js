var express = require('express');

var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res){
  console.log("get request received");
  //var thing = pool.query ('SELECT * from student');
  	//console.log(thing);
  	//res.send(thing);
  	//return;
  	var context = {};
  	pool.query('SELECT * FROM workouts', function(err, rows, fields){
  		if(err){
  			next(err);
  			return;
  		}
  		context.results = JSON.stringify(rows);
  	res.render('home', context);	
 });
});


app.get('/insert',function(req,res,next){
    var context = {};
    if(req.query.name != ""){
	    pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", 
	    [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
	    if(err){
	      next(err);
	      return;
	    }
	    context.idResults = result.insertId;
	    res.send(context);
		 });
	}
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
  		if(err){
  			next(err);
  			return;
  		}
  	context.results = JSON.stringify(rows);
  	//res.render('home', context);
  	});
    
  });

app.get('/delete',function(req,res){
  console.log("delete request " + req.query.entryId);
  	var context = {};
  	pool.query('DELETE FROM workouts WHERE id = (?)',  [req.query.entryId], function(err, rows, fields){
  		if(err){
  			next(err);
  			return;
  		}
  		context.results = JSON.stringify(rows);
  	//res.render('home', context);	
 });
});




app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/get-request', function(req, res){
//	var params = [];
//	for (var i in req.query){
//		params.push({'name':i, 'value':req.query[i]})
//	}
//	var result = {};
//	result.dataList = params;
//	res.render('get-request', result);
	console.log("get request received");
});

app.post('/post-request', function(req, res){
	var params = [];
	var params2 = [];
	for (var i in req.query){
		params.push({'name':i, 'value':req.query[i]})
	}

	for (var i in req.body){
		params2.push({'name':i, 'value':req.body[i]})
	}
	var result = {};
	result.dataList = params;
	result.dataList2 = params2;
	res.render('post-request', result);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
