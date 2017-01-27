var indexPage = angular.module('Index', ['ngRoute']);
   indexPage.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/AddMembers', {
        templateUrl : 'View/AddMembers.html'
    })
	.when('/Main', {
        templateUrl : 'View/Main.html'
    })
	.when('/AllTeam', {
        templateUrl : 'View/AllTeam.html'
    })
	.when('/DSM', {
        templateUrl : 'View/DSM.html'
    })
	.when('/AddTeams', {
        templateUrl : 'View/AddTeam.html'
    })
	.otherwise({
                    redirectTo: '/Main'
                });
				
				
}]);

indexPage.controller('TeamsCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http) {
    console.log("Hello World from controller");
	
	var refresh =function(){
	$http.get('/contactlist').then(function(response){
		console.log("I get the Data");
		console.log(response);
		$scope.contactList=[];
		for(i=0;i<response.data.length;i++){
  if(response.data[i].name==""){
  $scope.contactList.push(response.data[i]);
  }
		}
	});
	};
	refresh();
	

$scope.edit = function(teamName) {
  console.log(teamName);
    $rootScope.teamName = teamName;
};

}]);






indexPage.controller('AddTeamsCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http) {
    console.log("Hello World from controller");
	
	var refresh =function(){
	$http.get('/contactlist').then(function(response){
		console.log("I get the Data");
		console.log(response);
		$scope.contactList=[];
		for(i=0;i<response.data.length;i++){
  if(response.data[i].name==""){
  $scope.contactList.push(response.data[i]);
  }
		}
		
		var todayDate = new Date().toDateString();
		$scope.contact = {date:todayDate,name:"",today:"",yesterday:"",impediment:"",teamName:""};
	});
	};
	refresh();
	
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(function(response){
			console.log(response);
			refresh();
			});
	};
	
	$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(teamName) {
  console.log(teamName);
    $rootScope.teamName = teamName;
};

	
	$scope.deselect = function() {
  $scope.contact = "";
}
}]);


indexPage.controller('AddMembersCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http) {
    console.log("Hello World from controller");
	
	var refresh =function(){
	$http.get('/contactlist').then(function(response){
		console.log("I get the Data");
		console.log(response);
		$scope.contactList=[];
		console.log($rootScope.teamName);
		for(i=0;i<response.data.length;i++){
  if(response.data[i].name!=""&&response.data[i].teamName==$rootScope.teamName){
  $scope.contactList.push(response.data[i]);
  }
		}
		var todayDate = new Date().toDateString();
		$scope.contact = {date:todayDate,name:"",today:"",yesterday:"",impediment:"",teamName:$rootScope.teamName};
	});
	$scope.isDisabledAdd=false;
	$scope.isDisabledEdit=true;
	};
	refresh();
	
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(function(response){
			console.log(response);
			refresh();
			});
	};
	
	$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $scope.isDisabledAdd=true;
  $scope.isDisabledEdit=false;
  $http.get('/contactlist/' + id).then(function(response) {
    $scope.contact = response.data;
  });
};

  $scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
    refresh();
  })
};
	
	$scope.deselect = function() {
  $scope.contact = "";
  $scope.isDisabledAdd=false;
  $scope.isDisabledEdit=true;
}
}]);



indexPage.controller('DsmCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http) {
    console.log("Hello World from controller");
	
	var refresh =function(){
	$http.get('/contactlist').then(function(response){
		console.log("I get the Data");
		console.log(response);
		var todayDate = new Date().toDateString();
		$scope.contactList=[];
		for(i=0;i<response.data.length;i++){
  if(todayDate==response.data[i].date){
  
  }else{
	  
  response.data[i].yesterday=response.data[i].today;
  response.data[i].today="";
  response.data[i].date=todayDate;
  $http.put('/contactlist/' + response.data[i]._id, response.data[i]).then(function(response) {
  
  })
  
	  }
	  if(response.data[i].name!=""&&response.data[i].teamName==$rootScope.teamName){
		  $scope.contactList.push(response.data[i]);
  }
		}
		
		var todayDate = new Date().toDateString();
		$scope.contact = {date:todayDate,name:"",today:"",yesterday:"",impediment:""};
		$scope.isDisabledEdit=true;
	});
	};
	refresh();
	
	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(function(response){
			console.log(response);
			refresh();
			});
	};
	
	$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $scope.isDisabledEdit=false;
  $http.get('/contactlist/' + id).then(function(response) {
    $scope.contact = response.data;
  });
};

  $scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
    refresh();
  })
};
	
	$scope.deselect = function() {
  $scope.contact = "";
  $scope.isDisabledEdit=true;
}
}]);