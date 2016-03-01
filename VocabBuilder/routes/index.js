var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var users = require('../model/vocabList.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sparta' });
});


router.get('/read', function(request, response){
	
	var logValue = request.headers['log'];
	if(logValue && logValue == 'info'){
		console.log("Request received for /read");
	}
 	//var vocab = mongoose.model('vocabs');
	var select = request.query.select;
	//console.log(users);
	console.log("read");

	users.find({}, function(err, foundData){
		if(err){
			console.log(err);
			response.status(500).send();

		}else{

			if(foundData.length == 0){
				var responseObject = undefined;
				if(select && select == 'count'){
					responseObject = {count:0};
				}
				console.log("I'm here");
				response.status(404).send(responseObject);
			}else{
				var responseObject = foundData;
				if(select && select == 'count'){
					responseObject = {count: foundData.length};
				}
				response.json(responseObject);
				// response.render('index',{
				// 	title: responseObject
				// });
			}
		}
	});
});

// router.post('/post', function(req, res) {
//     console.log(req.body);//also possible req.body.name | req.body.email
//     res.end('dfee')
// });

router.post('/post', function(request, response){
	console.log("name ="+request.body.name);
	console.log(" meaning"+request.body.meaning);
	console.log(" sentence"+request.body.sentence);
	console.log(" synonyms"+request.body.synonyms);
 	//console.log(name+meaning+pass);
		    //console.log(request.params.name);
	        var vocab = new users();
	
   		    vocab.name = request.body.name;
		    vocab.meaning = request.body.meaning;
	    	vocab.sentence = request.body.sentence;
	    	vocab.synonyms = request.body.synonyms;
	     	vocab.save(function(err, savedObject){
	    		if(err){
	    		   	console.log(err);
	    			response.status(500).send();
	    		}else{
	    			//response.send(savedObject);
	    			//response.redirect('/');
	    			response.status(200).send();
	    		}
	    	}); 	 

	//  response.json(words);   
 //   	response.send('hihih');
	// response.render('index',{
	// 	title: 'Contact List'
	// });
});

router.post('/removeElement', function(request, response){
	console.log("name ="+request.body.name);
	//users.update( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } } )
	// users.update(
	//   { _id: request.body.id },
	//   { $pull: {name: [request.body.input] } }
	// );
	users.find({ _id:request.body._id }).remove().exec(function(err, data){
		if(err){
			response.status(500).send();
		}else{

			response.status(200).send(data);
		}		
	});
	//users.find({ _id:request.body.id }).remove( callback );
});

router.post('/update', function(request, response){
	users.findOne({ _id:request.body._id}, function(err, user){
		console.log(user)
		user.name = request.body.name;
		user.meaning = request.body.meaning;
		user.sentence = request.body.sentence;
		user.synonyms = request.body.synonyms;
		user.save(function(err){
			if(err){
				response.status(500).send("error");
			}else{
				response.status(200).send("success");
			}
		});
	})
})

module.exports = router;
