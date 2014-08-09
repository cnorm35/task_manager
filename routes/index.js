module.exports = function Route(app){
	
	//require the mongo mosule and connect to the db
	var mongoose = require('mongoose');

	//connect to the db!
	var db = mongoose.connect('mongodb://localhost/tasks');

	//make the task schema 
	//having issues with saving items into db passing in required: true for validation.
	var taskSchema = new mongoose.Schema({
		task: {type: String},
		priority: {type: String},
		deadline: {type: Date},
		created: {type: Date, default: Date.now}
		//if there was an existing DB table we needed to connect with
		//add {collection: 'tasks'}
	});

	//make the model we created act on the db.
	var Task = mongoose.model('Task', taskSchema);


	app.get('/', function(req, res){
		Task.find({}, function(errors, all_tasks){
			console.log(all_tasks);
		res.render('index', {title: 'Task Manager', tasks: all_tasks});	
		});
	});

	app.post('/tasks/create', function(req, res){
		console.log(req.body);
		var new_task = Task(req.body);
		//must call back when going into DB
		new_task.save(function(errors){
			if(errors){
				console.log(errors);
				res.redirect('/');
			} else{
				console.log('Saved!');
				res.redirect('/');
			}
		})
	});

	app.get('/tasks/destroy/:id', function(req, res){
		console.log('Gonna rock this task', req.params.id);
		Task.remove({_id: req.params.id}, function(errs){
			console.log('task has been deleted!');
			res.redirect('/');
		});
	});
}




















