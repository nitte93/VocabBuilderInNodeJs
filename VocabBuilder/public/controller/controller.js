var myApp = angular.module('vocabularyApp', []);

myApp.controller('wordList', function($http){
	
	var word = this;
	word._id = null;
	word.name = null;
	word.meaning = null;
	word.sentence = undefined;
	word.synonyms = undefined; 
	word.list = [];
	word.updateData = null;
	$http.get('/read').success(function(response){
		 //console.log(response);
		//console.log("response received");
		// for(int i=0; i<response.length;i++){
		// 	word.list.push(response[i]);
		// }
		word.list = response;
	});

	word.init = function(){
			word._id = null;
			word.name = null;
			word.meaning = null;
			word.sentence = undefined;
			word.synonyms = undefined; 
			word.updateData = null;
	}
	word.add = function(){
	console.log(word.sentence );

		 // $http({ method: 'POST', url: 'http://localhost/post/', data: JSON.stringify(word.name) }).
   //          success(function (data, status, headers, config) {
   //              console.log(data);
   //              console.log('success');
   //          }).
   //          error(function (data, status, headers, config) {
   //              console.log('error');
   //          });
	   	var data = {
	   		name:word.name,
	   		meaning: word.meaning, 
	   		sentence: word.sentence, 
	   		synonyms: word.synonyms
	   	} 		
		$http.post('/post', data).success(function(response) {
	           console.log("success");
	           word.list.unshift(data);
	          }).error(function(err){
	             console.log("failure")
	          });
	};
	
	word.removeWord = function(input){
		//console.log(input);
		//console.log(word.list.indexOf(input));
		var index = word.list.indexOf(input);
		if (index > -1) {
 		   word.list.splice(index, 1);
		}
		
		$http.post('/removeElement', input).success(function(response){
			console.log(response);
			console.log("success");
		}).error(function(err){
			console.log("failure");
		});
	};
//			data :{name:word.name, meaning: word.meaning, sentence: word.sentence, synonyms: word.synonyms}
	word.edit = function(editData){
		word.updateData = editData;
		word._id = editData._id;
		word.name = editData.name;
		word.meaning  = editData.meaning;
		word.sentence = editData.sentence;
		word.synonyms = editData.synonyms;
	}

	word.update = function(updateData){
		console.log(updateData);
		var index = word.list.indexOf(word.updateData);
		word.list[index].name = updateData.name;
		word.list[index].meaning = updateData.meaning;
		word.list[index].sentence = updateData.sentence;
		word.list[index].synonyms = updateData.synonyms;
		//word.init();
		$http.post('/update', updateData).success(function(response){
			console.log("success");
		}).error(function(){
			console.log("failure while updating");
		});
	}
});