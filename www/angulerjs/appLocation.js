  var Locationapp = angular.module('Locationapp', []).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
}); 

Locationapp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);



  Locationapp.controller('locationController', function($scope,$http,$window,$rootScope) {
       var socket = io();
       
                $window.localStorage.setItem("username", "admin")
                $window.localStorage.setItem("Userlevel", "HO")
                $window.localStorage.setItem("userid", 1)

	        $scope.username = $window.localStorage["username"];
			$scope.username=$scope.username.replace(/\"/g,""); 
			$scope.userid = $window.localStorage["userid"];
			$scope.userlevel = $window.localStorage["Userlevel"];
			$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
			$scope.supervisor = $window.localStorage["supervisor"];
			
			$scope.cartlength = 0;
			$scope.notificationcount = 0;
			
			$scope.CheckAttendanceStatus = function()
			{
				$http({
              method: 'GET'
              , url: '/api/getattendancestatus/'+$scope.userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.AttendanceStatus = response.data;
			  if($scope.AttendanceStatus[0] != undefined)
			  {
			  if($scope.AttendanceStatus[0].status == 'in')
			  {
				  document.getElementById("attendance").style.color = "#4cff00";
			  }
			  }
		  });
			};
			
			 
			$scope.setMyAttendance = function()
			{
				navigator.geolocation.getCurrentPosition(showPosition);
				function showPosition(position) {
						  $http(
								{
									method: 'GET',
									url: "https://maps.googleapis.com/maps//api/geocode/json?latlng=" + position.coords.latitude + ","+ position.coords.longitude + "&sensor=true",
									dataType: 'jsonp'
								 }
							)
						  .then(function(response){
							  $scope.address=response.data.results[0].formatted_address;
						 
  
					   currentLocation = {
							userid : $scope.userid,
							lat : position.coords.latitude,
							lan : position.coords.longitude,
							address:$scope.address
						}; 
				$http({
				 method  : 'POST',
				 url     : '/api/userAttendance/',
				 data    : currentLocation,
				 headers : {'Content-Type': 'application/json'} 
			})
			.success(function(data) {
				$scope.CheckAttendanceStatus();
				if(data.status == 4)
				{
					localStorage.clear();
					$window.location.href="index.html";
					
				}
			});
			});
						  };
			};
			
			$scope.checkcurrpage=function(myValue){ 
			if(myValue == null)
				myValue = 1;
		if(!myValue){
		 window.document.getElementById("mypagevalue").value = $scope.currentPage+1;
		 var element = window.document.getElementById("mypagevalue");
		 if(element)
			 element.focus();
		$scope.currentPage = $scope.currentPage;
		$scope.myValue = null;
		}
		
		else{$scope.dispval = "";
		if(myValue-1 <= 0){
			$scope.currentPage=0;
		}else{$scope.currentPage=myValue-1;
				if(!$scope.currentPage){$scope.currentPage=0;}			}
		}};
		
		
		
		$scope.ListUser = function () {
          $http({
              method: 'GET'
              , url: '/api/userList/'
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.userList = response.data;
          });
		  
      };

		$scope.CheckAthentication = function()
		{
					if($window.sessionStorage["trackingstatus"] == 0)
				   {
					$('#myModalAuthenticate').modal('hide');  
				   }
				   else
				   {
						$('#myModalAuthenticate').modal({show:true,backdrop: 'static', keyboard: false});        
				   }
		};
		
	  $scope.AuthenticateAdmin = function (password) {
          $http({
              method: 'GET'
              , url: '/api/AuthenticateAdmin/'+$scope.userlevel+'/'+password
              , dataType: 'jsonp'
          }).then(function (response) {
			  console.log(response);
              if(response.data.status === 0)
			  {
					$window.sessionStorage["trackingstatus"] = response.data.status;
					$scope.CheckAthentication();
			  }
			  else
			  {
					$scope.authError = response.data.message;
			  }
          });
		  
      };
	  
/* 	  $scope.getOrderTrack = function (selecteduserid,orderdate) {
		  if(orderdate == undefined)
			  orderdate = new Date();
		  
		  var dd = orderdate.getDate();
		  if(dd < 10)
			  dd = "0"+dd;
		  var mm = orderdate.getMonth()+1;
		  if(mm < 10)
			  mm = "0"+mm;
		  var yy = orderdate.getFullYear();
		  orderdate = yy+"-"+mm+"-"+dd;
          
		  if(selecteduserid == undefined)
		  {	
				var url = window.location.href;
				var qparts = url.split("?");
				var passvar=qparts[1];
				selecteduserid = passvar;
		  }
		  location.href="./tracking.html?"+selecteduserid+"?"+orderdate;
		  
		  
      };
 */


 /**
 * Moves the map to display over Berlin
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function moveMapToBerlin(map){
    map.setCenter({lat:19.0760, lng:72.8777});
    map.setZoom(14);
  }
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: "9hTOdeAw0F2AfaLWOxPncs2kfsXJ2hiR623ZvJXcvpI"
  });
  var defaultLayers = platform.createDefaultLayers();
  
  // Create the parameters for the routing request:

  

  var routingParameters = {
    // The routing mode:
    'mode': 'fastest;car',
    // The start point of the route:
    'waypoint0': 'geo!50.1120423728813,8.68340740740811',
    // The end point of the route:
    'waypoint1': 'geo!52.5309916298853,13.3846220493377',
    // To retrieve the shape of the route we choose the route
    // representation mode 'display'
    'representation': 'display'
  };
  
  //Step 2: initialize a map - this map is centered over Europe
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:19.0760, lng:72.8777},
    zoom: 14,
    pixelRatio: window.devicePixelRatio || 1
  });
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  
  // Define a callback function to process the routing response:
  var onResult = function(result) {
    var route,
      routeShape,
      startPoint,
      endPoint,
      linestring;
    if(result.response.route) {
    // Pick the first route from the response:
    route = result.response.route[0];
    // Pick the route's shape:
    routeShape = route.shape;
  
    // Create a linestring to use as a point source for the route line
    linestring = new H.geo.LineString();
  
    // Push all the points in the shape into the linestring:
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      linestring.pushLatLngAlt(parts[0], parts[1]);
    });
  
    // Retrieve the mapped positions of the requested waypoints:
    startPoint = route.waypoint[0].mappedPosition;
    endPoint = route.waypoint[1].mappedPosition;
  
    // Create a polyline to display the route:
    var routeLine = new H.map.Polyline(linestring, {
      style: { strokeColor: 'blue', lineWidth: 3 }
    });
  
    // Create a marker for the start point:
    var startMarker = new H.map.Marker({
      lat: startPoint.latitude,
      lng: startPoint.longitude
    });
  
    // Create a marker for the end point:
    var endMarker = new H.map.Marker({
      lat: endPoint.latitude,
      lng: endPoint.longitude,
    
    });
    
  
    // Add the route polyline and the two markers to the map:
    map.addObjects([routeLine, startMarker, endMarker]);
  
    // Set the map's viewport to make the whole route visible:
    map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    }
  };
  
  // Get an instance of the routing service:
  var router = platform.getRoutingService();


  $scope.getUserTracking = function (selecteduserid,trackdate) {
	if(trackdate == undefined)
	{trackdate = new Date();}

var dd = trackdate.getDate();
if(dd < 10)
  dd = "0"+dd;
var mm = trackdate.getMonth()+1;
if(mm < 10)
  mm = "0"+mm;
var yy = trackdate.getFullYear();
modifiedtrackdate = yy+"-"+mm+"-"+dd;

$http({
  method: 'GET'
  , url: '/api/getUserTracking/'+selecteduserid+'/'+modifiedtrackdate
  , dataType: 'jsonp'
}).then(function (response) {
console.log(response.data)

var  locationPoints = [];

locationPoints = response.data;


locationPoints.map(function(value)
    {   
		if(value.waypoint0 != null && value.waypoint1 != null)
		{
        	router.calculateRoute(value, onResult,
            function(error) {
       //       alert(error.message);
			});
		}
    })

});
  }


	  $scope.getOrderTrack = function (selecteduserid,trackdate) {
				if(trackdate == undefined)
				{trackdate = new Date();}
		  
		  var dd = trackdate.getDate();
		  if(dd < 10)
			  dd = "0"+dd;
		  var mm = trackdate.getMonth()+1;
		  if(mm < 10)
			  mm = "0"+mm;
		  var yy = trackdate.getFullYear();
		  modifiedtrackdate = yy+"-"+mm+"-"+dd;
          
		   $http({
              method: 'GET'
              , url: '/api/TrackCurentPossitionWithUser/'+selecteduserid+'/'+modifiedtrackdate
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.userTrackList = response.data;
			  if($scope.userTrackList.status === 1)
			  {
				  alert($scope.userTrackList.message);
				  
			  }
		  else
		  {
			  
			//   console.log($scope.userTrackList)
					var map;
					var polyline;
					var markers = [];
					var i = $scope.userTrackList.length -1;
						
					// for(var i = 0 ; i < $scope.userTrackList.length;i++)
					{
						
						markers.push(new google.maps.LatLng($scope.userTrackList[i].orderlat,$scope.userTrackList[i].orderlan));
					}
					
					var moptions = {
        center: new google.maps.LatLng($scope.userTrackList[0].orderlat,$scope.userTrackList[0].orderlan),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"), moptions);
	
    var iconsetngs = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var polylineoptns = {
        path: markers,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: map,
		icons: [{
			repeat: '70px',
            icon: iconsetngs,
            offset: '100%'}]
			
    };
	
	

	var infowindow = new google.maps.InfoWindow({Width: 1000});
    polyline = new google.maps.Polyline(polylineoptns);
var z = 0;
    var path = [];
    path[z] = polyline.getPath();
    for (var i = 0; i < $scope.userTrackList.length; i++) //LOOP TO DISPLAY THE MARKERS
    {
        var pos = markers[i];
        marker = new google.maps.Marker({
											position: new google.maps.LatLng($scope.userTrackList[i].orderlat,$scope.userTrackList[i].orderlan),
											map: map
										  });

										  google.maps.event.addListener(marker, 'click', (function(marker, i) {
											return function() {
											  infowindow.setContent("<table><tr><td><img src='images/usericon.png' style='height:55px;width:65px;padding-left:-10%;' class='img-responsive'/></td><td></td><td>"+" <p>Address:"+$scope.userTrackList[i].address+"<br> Username: "+$scope.userTrackList[i].username+"<br> Time: "+$scope.userTrackList[i].timing+"</p></td></tr></table>");
											  infowindow.open(map, marker);
											}
										  })(marker, i));
  //      path[z].push(marker.getPosition()); //PUSH THE NEWLY CREATED MARKER'S POSITION TO THE PATH ARRAY
    }
		  }  
          });
		 
      };
	  
	
				$scope.SendRequestToLocation= function(userid)
			{
				if(userid == undefined)
				{
					alert("Please select User First..");
				}
				else
				{
							socket.emit('Locationrequest',userid);
				}
			};
		
					socket.on('NewComplaint', function(data){
							$scope.getDashboardCount('Today'); 
							$scope.getAnualsalereport(); 
							$scope.getPopulerPlans(); 
					});	
					
					socket.on('Locationrequest', function(userid){
						
							if($window.localStorage["userid"] == userid)
							{
								 var options = {
						enableHighAccuracy: true,
						maximumAge: 3600000
					}
					
				navigator.geolocation.getCurrentPosition(showPosition, onError, options);
				function showPosition(position)
				{
					
					$http(
								{
									method: 'GET',
									url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ","+ position.coords.longitude + "&sensor=true",
									dataType: 'jsonp'
								 }
							)
						  .then(function(response){
							  $scope.address=response.data.results[0].formatted_address;
								currentLocation = {
											userid : $window.localStorage["userid"],
											lat : position.coords.latitude,
											lan : position.coords.longitude,
											address:$scope.address
									}; 
					$http({
							    method  : 'POST',
								url     : '/api/UpdateCurrentLocation/',
								data    : currentLocation,
								headers : {'Content-Type': 'application/json'} 
					})
					.success(function(data) {
					});
					});
				};
				 function onError(error) {
				//	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
				}
				
				 update_trackdata();
				
							}
					});	
			
  });
  
  
  //COMMENTED CODE FOR GEO TRACKING User
  
  /* 
		 $(document).ready(function() {
								 
								  function update_trackdata() {

								$.getJSON('api/listCurentPossition/',function(data) { 
								
								console.log(data);
												for(var i = 0 ;i <data.length;i++)
												{
												if(data[i].loginstatus == 0 || data[i].loginstatus == null)
												{
													data[i].cin = 'images/redmarker.png'
												}
												else
												{
													data[i].cin = 'images/greenmarker.png'
												}
												}

										//var map = new google.maps.Map(document.getElementById('map'), {
										  //zoom: 10,
										 // center: new google.maps.LatLng(19.226662,72.983833),
										 // mapTypeId: google.maps.MapTypeId.ROADMAP
										//});

																					
var map;
var polyline;
var markers = [];
	
	
			polyline = new google.maps.Polyline(polylineoptns);
		var z = 0;
		var path = [];
		path[z] = polyline.getPath();
	
	
	for(var i = 0 ; i < data.length;i++)
	{
		
		markers.push(new google.maps.LatLng(data[i].lat,data[i].lan));
	}
	

    var moptions = {
        center: new google.maps.LatLng(19.226662,72.983833),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"), moptions);
	
    var iconsetngs = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var polylineoptns = {
        path: markers,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: map,
		icons: [{
			repeat: '70px',
            icon: iconsetngs,
            offset: '100%'}]
			
    };
	
	
	var infowindow = new google.maps.InfoWindow({Width: 1000});
	
	
										
										var infowindow = new google.maps.InfoWindow();

										var marker, i;

										for (i = 0; i < data.length; i++) {  
										  marker = new google.maps.Marker({
											position: new google.maps.LatLng(data[i].lat, data[i].lan),
											map: map,
											icon:data[i].cin
										  });

										  google.maps.event.addListener(marker, 'click', (function(marker, i) {
											return function() {
											  infowindow.setContent("<table><tr><td><img src='images/usericon.png' style='height:55px;width:65px;padding-left:-10%;' class='img-responsive'/></td><td></td><td>"+" <p>Address:"+data[i].address+"<br> Username: "+data[i].username+"<br> Time: "+data[i].timing+"</p></td></tr></table>");
											  infowindow.open(map, marker);
											}
										  })(marker, i));
										}
									
					
					});
										return false;
										}
										
								
									$( "#refreshMap" ).click(function() {
									$( "#myselect" ).val('');
											update_trackdata();
											
									});
									$( ".target" ).change(function() {
								var selecteduserid = $( "#myselect" ).val();
						$.getJSON('api/listCurentPossitionWithUser/'+selecteduserid,function(data) { 
							for(var i = 0 ;i <data.length;i++)
								{
								if(data[i].loginstatus == 0 || data[i].loginstatus == null)
									{
										data[i].cin = 'images/redmarker.png'
									}
								else
									{
									data[i].cin = 'images/greenmarker.png'
									}
								}		
var map;
var polyline;
var markers = [];
	
	for(var i = 0 ; i < data.length;i++)
	{
		
		markers.push(new google.maps.LatLng(data[i].lat,data[i].lan));
	}
	

    var moptions = {
        center: new google.maps.LatLng(19.226662,72.983833),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"), moptions);
	
    var iconsetngs = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var polylineoptns = {
        path: markers,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: map,
		icons: [{
			repeat: '70px',
            icon: iconsetngs,
            offset: '100%'}]
			
    };
	
	
	var infowindow = new google.maps.InfoWindow({Width: 1000});
	
		polyline = new google.maps.Polyline(polylineoptns);
		var z = 0;
		var path = [];
		path[z] = polyline.getPath();
		for (var i = 0; i < data.length; i++) //LOOP TO DISPLAY THE MARKERS
		{
			var pos = markers[i];
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i].lat,data[i].lan),
			map: map,
			icon:data[i].cin
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() 
	{
				infowindow.setContent("<table><tr><td><img src='images/usericon.png' style='height:55px;width:65px;padding-left:-10%;' class='img-responsive'/></td><td></td><td>"+" <p>Address:"+data[i].address+"<br> Username: "+data[i].username+"<br> Time: "+data[i].timing+"</p></td></tr></table>");
		infowindow.open(map, marker);
				}
			})(marker, i));
				  path[z].push(marker.getPosition()); //PUSH THE NEWLY CREATED MARKER'S POSITION TO THE PATH ARRAY
				  }
										});
										return false;
										
												});
												
											<!-- var interval = setInterval(update_trackdata, 40000); -->
										
										});
  */