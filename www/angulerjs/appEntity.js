var appEntity = angular.module('appEntity', ['ui.bootstrap', 'ngSanitize'])

appEntity.controller('entityController', function ($window, $http, $scope) {


    /* MAYUR UPDATES
        @18/08/2019
        404 PAGE
    */


   function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
  
$scope.urlParameters = getUrlVars();


    
    
      // Trigger the event (useful on page load).
      

    $scope.verifyUrl = function()
    {


        var existingurl = registerdUrls.filter(function(url){
            return url == location.href;
        });

        // console.log(existingurl);
    }

   /* END */

    //mansi 18-08-2019
    $scope.calldiv = function()
    {
        
    }
   

    $scope.customer = {};

    $scope.internetPlans = [{
        heading: "ROCKET",
        offer_amount: 500,
        period: "/mo.",
        speed: "100 Mbps",
        table_class: "info",
        details: [
            ' <i class="fa fa-angle-double-right"></i>You have to pay only <b>&#8377;  310.00 per month</b> on yearly subscription',
            ' <i class="fa fa-angle-double-right"></i>Monthly @ <b>&#8377;  500.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 6 months @ <b>&#8377;  2,200.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 12 months @ <b>&#8377;  3,710.00</b>',
            '<i class="fa fa-angle-double-right"></i>GST 18% will be extra as applicable to all plans.'
        ]
    }, {
        heading: "ROCKET 2.0",
        offer_amount: 700,
        period: "/mon.",
        speed: "200 Mbps",
        table_class: "success",
        details: [
            ' <i class="fa fa-angle-double-right"></i>You have to pay only <b>&#8377;  400.00 per month</b> on yearly subscription',
            ' <i class="fa fa-angle-double-right"></i>Monthly @ <b>&#8377;  700.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 6 months @ <b>&#8377;  3,100.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 12 months @ <b>&#8377; 4,800.00</b>',
            '<i class="fa fa-angle-double-right"></i>GST 18% will be extra as applicable to all plans.'
        ]
    }, {
        heading: "AGNI 4.0",
        offer_amount: 900,
        period: "/mo.",
        speed: "500 Mbps",
        table_class: "warning",
        details: [
            ' <i class="fa fa-angle-double-right"></i>You have to pay only <b>&#8377;  580.00 per month</b> on yearly subscription',
            ' <i class="fa fa-angle-double-right"></i>Monthly @ <b>&#8377;  900.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 6 months @ <b>&#8377;  4,000.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 12 months @ <b>&#8377;  6,960.00</b>',
            '<i class="fa fa-angle-double-right"></i>GST 18% will be extra as applicable to all plans.'
        ]
    }, {
        heading: "AGNI 7.0",
        offer_amount: 1600,
        period: "/mo.",
        speed: "1 Gbps",
        table_class: "royal",
        details: [
            ' <i class="fa fa-angle-double-right"></i>You have to pay only <b>&#8377;  1,111.00 per month</b> on yearly subscription',
            ' <i class="fa fa-angle-double-right"></i>Monthly @ <b>&#8377;  1,600.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 6 months @ <b>&#8377;  6,960.00</b>',
            '<i class="fa fa-angle-double-right"></i>Pay for 12 months @ <b>&#8377; 13,332.00</b>',
            '<i class="fa fa-angle-double-right"></i>GST 18% will be extra as applicable to all plans.'
        ]
    }];


    $scope.inputType = 'password';

    $scope.togglepasswordField = function()
    {
        if($scope.inputType == 'password')
        {
            $scope.inputType = 'text';
        }
        else
        $scope.inputType = 'password';
    }

    $scope.callLoginApi = function() {
		//const username = document.getElementById('uname').value;
		//const password = document.getElementById('psw').value;
		var data = {
	      username: $scope.customerLogin.txtLogin.toLowerCase().trim(),
	      password: $scope.customerLogin.txtLoginPass,
	      user_type: 'user',
	      request_source: 'portal',
	      request_app: 'selfcare'
	    };
	    var options = {
	      method: 'POST',
	      body: toFormData(data),
	      timeout:6000,
	    };
	    const url = `https://103.252.4.46/l2s/`;
		fetch(`${url}api/selfcareL2sUserLogin`, options).then((res) => {
	      return res.json().then((res) => {
	        setTimeout(() => null, 0);
	        if (res.status != 'ok' && res.code != 200) {
	          throw new Error('Invalid username or password');
	        } 
	        else if(res.code==204)
	        {return ('Content Not Found')}
	        else {
	        	return window.location = `http://localhost:8080/login?token=${res.data.token}&user_id=${res.data.username}`
	        }
	     });
	    })
	    return false;
    }
    

	function toFormData({ ...data }) {
	  var formData = new FormData();
	  for (name in data)
	    formData.append(name, data[name]);
	  return formData;
	}

    $scope.CloseModal = function()
    {
        $('#ms-customer-login-modal').modal('hide');
    }
    $scope.LoginToLogTo = function()
    {
        if(($scope.customerLogin.txtLoginPass != undefined && $scope.customerLogin.txtLoginPass != '' && $scope.customerLogin.txtLoginPass != null) && ($scope.customerLogin.txtLogin != undefined && $scope.customerLogin.txtLogin != '' && $scope.customerLogin.txtLogin != null))
        {
        
             $http({
                method: 'POST',
                url: '/api/loginToLog2Space',
                data: {
                    username: $scope.customerLogin.txtLogin.toLowerCase().trim(),
                    password: $scope.customerLogin.txtLoginPass,
                  }
            })
            .success(function (data) {
                 if(data.status == 'ok')
                {
                    $scope.CloseModal();
                     window.open('https://login.threesainfoway.net/selfcare/login?token='+data.data.token+'&user_id='+data.data.username);
                }
                else{
                        alert(data.message);
                }
            }); 

        }
    }

    document.getElementById("home").focus();

    $scope.AddNewEnquiry = function () {
        $scope.customer.source = 'Website';

        $http({
                method: 'POST',
                url: '/api/AddNewEnquiry',
                data: $scope.customer,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (data) {
                swal({
                    title: "Thank You!",
                    text: data.message,
                });
                $scope.customer = {};
                $('#modal_Enquiries_frenchisies').modal('hide');
            $('#ms-account-modal').modal('hide');
            });
    };

    


    $scope.AddNewComplaints = function () {
        $scope.complaint.createdby = 'From Website';
        $http({
                method: 'POST',
                url: '/api/AddNewComplaints/',
                data: $scope.complaint,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (data) {
                alert(data.message);
                $scope.complaint = {};
            });
            $('#modal_Enquiries_frenchisies').modal('hide');
            $('#ms-account-modal').modal('hide');
    };

    $scope.getPlanDetails = function (plandetails) {
        $scope.customer.comment = "Enquiry for Plan: \n" + plandetails.heading + ' - ' + plandetails.speed + ' - ' + plandetails.offer_amount + ' ' + plandetails.period;
        document.getElementById("ms-form-pass-rn-enq").focus();
    };



$scope.disablepopuphiden = function()
{
    $scope.disablePopup = true;
}
function checkDisableStatus(){
    return $scope.disablePopup; 
}

    function hidepopup()
	{
		
        clearTimeout(ShowFrenchisiesPopup);       
		var hideFrenchisiesPopup = setTimeout(function () {

        $scope.customer.comment = "Enquiry for New franchise";
        if(!checkDisableStatus())
        {
        $('#modal_Enquiries_frenchisies').modal('hide');
        clearTimeout(hideFrenchisiesPopup);
        }
    }, 5000);
		
	}



    if($scope.urlParameters["th"] && $scope.urlParameters["th"] =="5RNya0RBZgMPtxpN3BrLhW9azAKNIP5FxpD201xhSI=")
    {
        $('#ms-account-modal').modal({
            show: true,
            backdrop: 'static',
             keyboard: false
        });
    }
    else{
    var ShowFrenchisiesPopup = setTimeout(function () {

        $scope.customer.comment = "Enquiry for New franchise";

        $('#modal_Enquiries_frenchisies').modal({
            show: true,
            backdrop: 'static',
             keyboard: false
        });
        hidepopup();
    }, 3000);
    }
});
