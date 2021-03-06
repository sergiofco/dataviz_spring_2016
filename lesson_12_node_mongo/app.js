/*
A) Node Setup
1. create folder
2. create app.js
3. On terminal
	npm init
	npm install mongodb --save

B) Mongo Setup
1. sudo mongod
2. new window > mongo tvshows
3. db.createCollection("records")
*/

/*-------------------- MODULES --------------------*/
// Load the mongodb module
var	MongoClient = require('mongodb').MongoClient;
var db;

// Data
var myShows = [
		{	title: 'Black Mirror',
			channel: 'Netflix',
			genre: ['Sci-fi', 'Drama', 'Critical Design'],
			year: 2012,
			number_of_seasons: 2
		},
		{	title: 'Sopranos',
			channel: 'HBO',
			genre: ['Drama', 'Mafia'],
			year: 2000,
			number_of_seasons: 7
		},
		{	title: 'Mad Men',
			channel: 'AMC',
			genre: ['Drama', 'History'],
			year: 2008,
			number_of_seasons: 7
		},
		{	title: 'Breaking Bad',
			channel: 'AMC',
			genre: ['Action', 'Drama'],
			year: 2009,
			number_of_seasons: 6
		},
		{	title: 'Portlandia',
			channel: 'AMC',
			genre: ['Comedy', 'Hipster'],
			year: 2011,
			number_of_seasons: 5
		}
];
    
initMongo();

// 0. Connect
function initMongo(){
	// 0.1 localhost:mongoDbPort/dbsName
	MongoClient.connect('mongodb://localhost:27017/tvshows', function(err, _db) {
		// 0.2 Will return two objects: err and db
		// we'll make operations on db if successfully connected
		if(err === null){
			console.log("Connected correctly to server");

			db = _db;

			// CRUD: Create, Read, Update, Delete

			// 1. Create
			// 1.1 db was returned by the connect function
			
			// createSingleRecord(myShows[2]);			
			// createManyRecords(myShows);
			
			// 2. Read
			// 2.1 No query
			readRecords();
			
			// 2.2 With query
			// Equals to
			// readRecords({'number_of_seasons': 5});

			// Greater than
			// readRecords({'year': {'$gte': 2011}});

			// AND conditionals
			// readRecords(
			// 	{
			// 		'number_of_seasons': {'$gte': 5},
			// 		'channel': 'AMC',
			// 		'year': {'$in': [2007, 2008]}
			// 	}
			// );

			// OR conditionals
			// readRecords(
			// 	{'$or':
			// 		[
			// 			{'number_of_seasons': {'$gte': 5}},
			// 			{'channel': 'AMC'},
			// 			{'year': {'$in': [2007, 2008]}}
			// 		]
			// 	}
			// );	

			// 3. Update
			// updateRecords(
			// 	{'channel': 'AMC'},
			// 	{'$set': {'channel': 'ABC'}
			// });

			// 4. Delete
			// deleteRecords({'number_of_seasons': 7});

			// 0.3 Always remember to close the connection
			// db.close();
		}else{
			console.log(err);
		}
	});	
};

// // 1.2
function createSingleRecord(newRecord){
	console.log('Called createSingleRecord');

	// db is being passed by the initMongo function
	// 'records' is the name of the collection we're saving to
	// 2 parameters: obj to save, callback function
	db.collection('records').insert(
		newRecord,
		function(err, result) {
	    	if(err === null){
	    		console.log(result);
	    	}else{
				console.log(err);
	    	}
	    	// db.close();
	});
}

// 1.3 Modifying the function so we can save more than one record
function createManyRecords(newRecords){
	console.log('Called createManyRecords');
	db.collection('records').insert(
		newRecords,
		function(err, result) {
	    	if(err === null){
	    		console.log(result);
	    	}else{
				console.log(err);
	    	}
	    	// db.close();
	});
}

// 2.1
function readRecords(query){
	console.log('Called readRecords.');

	// Meaning: If query === undefined, query = {}
	// else, query keeps the same
	query = query || {};
	// console.log(query);
	db.collection('records').find(query).toArray(function(err, _docs){
	    	if(err === null){
	    		console.log(docs);
	    	}else{
				console.log(err);
	    	}
	    	// db.close();
	});
}

// 3.1
function updateRecords(query, update){
	console.log('Called updateRecords.');

	query = query || {};
	// console.log(query);
	// console.log(update);

	db.collection('records').update(
		query,
		update,
		{multi: true},
		function(err, result){
	    	if(err === null){
	    		console.log(result);
	    	}else{
				console.log(err);
	    	}
    	// db.close();
	});
}

// 4.1 Delete
function deleteRecords(query){
	console.log('Called deleteRecords.');

	query = query || {};
	// console.log(query);

	db.collection('records').remove(
		query,
		function(err, result){
	    	if(err === null){
	    		console.log(result);
	    	}else{
				console.log(err);
	    	}
    	// db.close();
	});
}