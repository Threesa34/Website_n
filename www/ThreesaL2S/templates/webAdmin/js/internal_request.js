/* The following function creates an XMLHttpRequest object... */

function createRequestObject(){
	var request_o; //declare the variable to hold the object.
	request_o = '';
	var browser = navigator.appName; //find the browser name
	if(browser == "Microsoft Internet Explorer"){
		/* Create the object using MSIE's method */
		request_o = new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		/* Create the object using other browser's method */
		request_o = new XMLHttpRequest();
	}
	return request_o; //return the object
}

/* The variable http will hold our new XMLHttpRequest object. */
var http = null; 
var http2 = null; 
var http = createRequestObject(); 
var http2 = createRequestObject(); 
//function getadvertise(id)


//function get_data(action, object_name, id)
function get_city(action,country_code)
{
	 
	/* Create the request. The first argument to the open function is the method (POST/GET),
		and the second argument is the url... 
		document contains references to all items on the page
		We can reference document.form_category_select.select_category_select and we will
		be referencing the dropdown list. The selectedIndex property will give us the 
		index of the selected item. 
	*/

	switch(action)
	{
		case 'City' :

			http.open('get', '../ajax_function/getajaxscript.php?action='+action+'&country_code='+country_code);
			break;
		default :
			break;
			
	}
	/* Define a function to call once a response has been received. This will be our
		handleProduct function that we define below. */
		
	//OLD; Commented by nirmal
	//http.onreadystatechange = handlegetadvertiser ; 
	
	//NEW : We, now don't require to write handlegetadvertiser function separately
	
	http.onreadystatechange = function() {
		
		//alert(object_name);
		
		/* Make sure that the transaction has finished. The XMLHttpRequest object 
			has a property called readyState with several states:
			0: Uninitialized
			1: Loading
			2: Loaded
			3: Interactive
			4: Finished */
		if(http.readyState == 4)
		{
			//Finished loading the response
			/* We have got the response from the server-side script,
				let's see just what it was. using the responseText property of 
				the XMLHttpRequest object. */
			
			var response = http.responseText;
			
			/* And now we want to change the product_categories <div> content.
				we do this using an ability to get/change the content of a page element 
				that we can find: innerHTML. */
			
			document.getElementById('div_get_city').innerHTML = response;
		}
	} 
	
	/* Send the data. We use something other than null when we are sending using the POST
		method. */
	http.send(null);
}

function get_AllPlan(action, value, username, adminname)
{
	http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&plan_value='+value+'&username='+username+'&adminname='+adminname);
	
	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{				
			var response = http.responseText;			
			document.getElementById('Plan_List_div_'+username).innerHTML = response;
		}
	} 		
	http.send(null);
}

function changeAmount(UserName, PlanName){

        var action = 'ChangePlanAmount';
        var PlanName = PlanName;
        var UserName = UserName;
        http.open('get', '../db_scripts/get_ajax_script.php?PlanName='+PlanName+'&action='+action);

        http.onreadystatechange = function(){
                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        document.getElementById('amountpage_'+UserName).innerHTML = response;
                }
        }
        http.send(null);
}

function get_user_invoice_detail(UserName,Page)
{

                http.open('get', '../db_scripts/getajaxscript.php?UserName='+UserName+'&Page='+Page);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {

                        var response = http.responseText;

                        document.getElementById('div_get_user_invoice').innerHTML = response;
                        if($("#div_get_user_invoice tr").length != "1" ){
                        document.getElementById('UserInvoiceTable').style.visibility = "visible";
                        }
                }
        }

        http.send(null);
}

function show_residual_payment_detail(UserName,Page)
{

                http.open('get', '../db_scripts/getajaxscript.php?UserName='+UserName+'&Page='+Page);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {

                        var response = http.responseText;

                        document.getElementById('div_get_residual_amount').innerHTML = response;
                        document.getElementById('show_table').style.visibility = "visible";
                }
        }

        http.send(null);
}

function fillZone(SiteId)
{

                http.open('get', '../db_scripts/getajaxscript.php?SiteId='+SiteId);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;

                        document.getElementById('div_get_zone').innerHTML = response;

                }
        }

        http.send(null);
}

function get_site(action,object)
{
	city_code = object.value;
	
	switch(action)
	{
		case 'SiteList' :
			//alert('../db_scripts/get_ajax_script.php?action='+action+'&city_code='+city_code);		
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&city_code='+city_code);
			
			break;
		default :
			break;
			
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			
			document.getElementById('div_get_site').innerHTML = response;
		}
	} 

	http.send(null);
}

function get_zones(action, object, admin)
{
	admin_name = admin.value;
	site_id = object.value;
	
	switch(action)
	{
		case 'ZoneList' :

			//alert('../db_scripts/get_ajax_script.php?action='+action+'&admin_name='+admin_name+'&site_id='+site_id)
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&admin_name='+admin_name+'&site_id='+site_id);
			/*
			if(document.frm1 && typeof(document.frm1.iptype1) == "object")
			{
				alert(1)
				document.frm1.iptype[0].checked=true;
				toggle('staticpool', 0);
			}
			alert('get_zones');
			*/
			
			break;
			
		default :
			break;
			
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			
			document.getElementById('div_get_zone').innerHTML = response;
		}
	} 

	http.send(null);
}

function get_static_pools(action, object)
{
	site_id = object.value;
	
	switch(action)
	{
		case 'StaticPool' :
			if(document.frm1.PoolName && document.frm1.SiteName && document.frm1.SiteName.value!='' && document.frm1.iptype[1] && document.frm1.iptype[1].checked)
			{
				http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			}
			else
			{
				return false;
			}

			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			
			document.getElementById('div_get_staticpool').innerHTML = response;
		}
	} 

	http.send(null);
}

//function get_multiple_lco(action,object)
function get_multiple_lco(action,object,admin_name)
{

	switch(action)
	{
		case 'MultipleLCO' :
		
			var site_id;
			site_id = "";
			for (i = 0; i < object.length; i++)
			{
				if (object.options[i].selected && object.options[i].value!='') 
				{		
					site_id += object.options[i].value + ",";
				}
			}
			site_id = site_id.substring(0, site_id.length-1);
			
			//for edit admin page -- LinkedOperator loads selected
			if(admin_name != '')
			{
				//alert('../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id+'&admin_name='+admin_name);
				http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id+'&admin_name='+admin_name, true);
			}
			else
			{
				//alert('/db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
				http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			}

			break;

		case 'MultipleLCO_Edit' :

			var site_id;
			site_id = object.value;

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4 && http.status == 200)
		{
			var response = http.responseText;
			document.getElementById('div_get_lcos').innerHTML = response;
		}
	} 
	
	http.send(null);
}

function get_lco(action,object)
{
	switch(action)
	{
		case 'SiteWiseLCO' :

			site_id  = object.value;
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);

			break;
		case 'DistributorWiseLCO' :
			
			site_id  = object.value;
			var SiteName = document.getElementById('SiteName').value;	
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id+'&SiteName='+SiteName);
			break;	

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('div_get_lcos').innerHTML = response;
		}
	} 
	
	http.send(null);
	document.getElementById('div_get_lcos').innerHTML = 'Please wait...';

	var found=0;
	for(i = 0; i < document.forms[0].elements.length; i++)
  	{
		if(document.forms[0].elements[i].id == 'iptype1')
		{
			// element of name "foo" exists
			found=1;
			break;
		}
	}
	
	//For Add User Page.
	//if(document.frm1.iptype1 != 'undefined')
	if(found == 1)
	{
		// IP Address Type Dynamic - Checked = TRUE
		document.getElementById('iptype1').checked=true;
	}
	/**/
}

function get_all_admin(action,object,multiple)
{
	switch(action)
	{
		case 'SiteWiseAdmin' :

			site_id  = object.value;

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id+'&allocated='+multiple);

			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('div_get_admins').innerHTML = response;
		}
	} 
	
	http.send(null);
}

function get_lco_plans(action, object)
{
	switch(action)
	{
		case 'LCOWisePlan' :

			admin_name = object.value;

			http2.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&admin_name='+admin_name);
			break;

		default :
			break;
			
	}

	http2.onreadystatechange = function() {
		
		if(http2.readyState == 4)
		{
			var response = http2.responseText;
			document.getElementById('div_get_plans').innerHTML = response;
		}
	} 
	
	http2.send(null);
	var str = window.location.pathname;
	if( (str.search(/viewedusr/) > 0 || str.search(/usedpin/) > 0 || str.search(/unusedpin/) > 0 || str.search(/viewusr/) > 0) && document.getElementById('ZoneName'))
        {
                alert('Working inside..\r\r Click OK');
        }
}


function get_user(action,object)
{
	switch(action)
	{
		case 'SiteWiseUser' :

			site_id  = object.value;

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);

			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('div_get_users').innerHTML = response;
		}
	} 
	
	http.send(null);
}

function get_dist(action,object)
{
	switch(action)
	{
		case 'SiteWiseDist' :

			site_id  = object.value;

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);

			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('div_get_dist').innerHTML = response;
		}
	} 
	
	http.send(null);
	
}


//function get_multiple_zone(action,object)
function get_multiple_zone(action,object)
{
	switch(action)
	{
		case 'MultipleZone' :
		
			var site_id;
			site_id=object.value;
			/*
			site_id = "";
			for (i = 0; i < object.length; i++)
			{
				if (object.options[i].selected && object.options[i].value!='') 
				{
					site_id += object.options[i].value + ",";
				}
			}				
			site_id = site_id.substring(0, site_id.length-1);
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			*/
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			
			break;

		case 'MultipleZone_Edit' :

			var site_id;
			site_id = object.value;

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
			break;

		default :
			break;
			
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('div_get_zones').innerHTML = response;
		}
	} 
	
	http.send(null);
}

function get_level_wise_admins(action,object)
{
        switch(action)
        {
                case 'LevelWiseAdmin' :
                        alevel  = object.value;
                        http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&alevel='+alevel);
                        break;
                default :
                        break;
        }

        http.onreadystatechange = function() {
                if(http.readyState == 4) {
                        var response = http.responseText;
                        document.getElementById('div_get_admins').innerHTML = response;
                }
        }
        http.send(null);
}


/*function SetFranchiseeWisePlanAmount( plan_name, planAmount,  AlterNativeValue )
{
							
	var action = "FranchiseeWisePlanAmount";
	var PlanDiscountValue = document.getElementById('discountId_'+plan_name).value;
	var PlanFlatValue = document.getElementById('flatId_'+plan_name).value;
	var PercentageServiceTaxVal = document.getElementById('TotalServiceTax').value;		
	
	if($("input[type='radio'].test").is(':checked')) {
		var InvoiceCalcType = $("input[type='radio'].test:checked").val();		
	}	
	
    $('#flatId_'+plan_name).change(function(){
		$('#discountId_'+plan_name).val('0');
    });

	$('#discountId_'+plan_name).change(function() {		
		$('#flatId_'+plan_name).val('0');
    });	
	
	if(PlanDiscountValue > 0 || PlanFlatValue > 0){
		http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&InvoiceCalcType='+InvoiceCalcType+'&flatvalue='+PlanFlatValue+'&discountvalue='+PlanDiscountValue+'&AlterNativeValue='+AlterNativeValue+'&PlanName='+plan_name+'&Amount='+planAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal);
	}else if(PlanDiscountValue ==  0 && PlanFlatValue == 0){
		var action = "FranchiseeWiseAmount";
		http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&InvoiceCalcType='+InvoiceCalcType+'&discountvalue='+PlanDiscountValue+'&AlterNativeValue='+AlterNativeValue+'&PlanName='+plan_name+'&Amount='+planAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal);
	}			
	
	http.onreadystatechange = function(){		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('franchisee_total_'+plan_name).innerHTML = response;
		}
	} 
	http.send(null);
}*/




function SetFranchiseeWisePlanAmount( plan_name, planAmount,  AlterNativeValue )
{
							
	var action = "FranchiseeWisePlanAmount";
	var PlanDiscountValue = document.getElementById('discountId_'+plan_name).value;
	var PlanFlatValue = document.getElementById('flatId_'+plan_name).value;
	var PercentageServiceTaxVal = document.getElementById('TotalServiceTax').value;		
	
	if($("input[type='radio'].test").is(':checked')) {
		var InvoiceCalcType = $("input[type='radio'].test:checked").val();		
	}

	var DiscountType = $("input[name='perflatdiscount']:checked").val();		
	if (DiscountType=="PercentageDiscount")
	     AlterNativeValue= "Discount";
    $('#flatId_'+plan_name).change(function(){
		$('#discountId_'+plan_name).val('0');
    });

	$('#discountId_'+plan_name).change(function() {		
		$('#flatId_'+plan_name).val('0');
    });	
	
	if(PlanDiscountValue > 0 || PlanFlatValue > 0){		
		http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&InvoiceCalcType='+InvoiceCalcType+'&flatvalue='+PlanFlatValue+'&discountvalue='+PlanDiscountValue+'&AlterNativeValue='+AlterNativeValue+'&PlanName='+plan_name+'&Amount='+planAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal,false);
	}else if(PlanDiscountValue ==  0 && PlanFlatValue == 0){
		var action = "FranchiseeWiseAmount";
		http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&InvoiceCalcType='+InvoiceCalcType+'&discountvalue='+PlanDiscountValue+'&AlterNativeValue='+AlterNativeValue+'&PlanName='+plan_name+'&Amount='+planAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal,false);
	}			

	http.onreadystatechange = function() {		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('franchisee_total_'+plan_name).innerHTML = response;
		}
	} 
	http.send(null);
}

function SetOperatorAndPlanwiseInvoiceAmount(plan_name)
{
	/*alert(plan_name);
	//alert(document.getElementByName('EntryType[+'plan_name]).value);
	alert(document.getElementById('EntryType_'+plan_name).value);
	alert(document.getElementById('AlterValue_'+plan_name).value);
	alert(document.getElementById('amount_'+plan_name).value);
	alert(document.getElementById('InvoiceCalcType_'+plan_name).value);*/
	var action = "OperatorWiseInvoice";
	
	var EntryType = document.getElementById('EntryType_'+plan_name).value;
	var AlterValue = document.getElementById('AlterValue_'+plan_name).value;
	var Amount = document.getElementById('amount_'+plan_name).value;
	var InvoiceCalcType = document.getElementById('InvoiceCalcType_'+plan_name).value;
	var OperatorPlanAmount = document.getElementById('OperatorPlanAmount_'+plan_name).value;
	var PercentageServiceTaxVal = document.getElementById('PercentageServiceTaxVal').value;	
	
	if(Amount>=0)
	{
		http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&EntryType='+EntryType+'&AlterValue='+AlterValue+'&InvoiceCalcType='+InvoiceCalcType+'&InvoiceCalcType='+InvoiceCalcType+'&PlanName='+plan_name+'&Amount='+Amount+'&OperatorPlanAmount='+OperatorPlanAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal);
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;
			document.getElementById('invoice_amt_'+plan_name).innerHTML = response;
		}
	} 
	http.send(null);
}



function SetUserwiseInvoiceAmount(user_name,plan_name)
{
        var action = "UserWiseInvoice";

        var EntryType = document.getElementById('EntryType_'+user_name).value;
        var AlterValue = document.getElementById('AlterValue_'+user_name).value;
        var Amount = document.getElementById('amount_'+user_name).value;
        var InvoiceCalcType = document.getElementById('InvoiceCalcType_'+user_name).value;
        var OperatorPlanAmount = document.getElementById('OperatorPlanAmount_'+user_name).value;
        var PercentageServiceTaxVal = document.getElementById('PercentageServiceTaxVal').value;

        if(Amount>0)
        {
                http.open('get', '../db_scripts/getajaxscript.php?action='+action+'&EntryType='+EntryType+'&AlterValue='+AlterValue+'&InvoiceCalcType='+InvoiceCalcType+'&InvoiceCalcType='+InvoiceCalcType+'&PlanName='+plan_name+'&Amount='+Amount+'&OperatorPlanAmount='+OperatorPlanAmount+'&PercentageServiceTaxVal='+PercentageServiceTaxVal);
                http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;

                        document.getElementById('invoice_amt_'+user_name).innerHTML = response;
                }
                }
                http.send(null);

        }else{
                document.getElementById('invoice_amt_'+user_name).innerHTML = OperatorPlanAmount;


        }

}



function get_roads(action,location_code)
{
        if(location_code == "new") {
                document.getElementById("new_loc").innerHTML = "<input name='new_location' id='new_location'>";
        } else {
			document.getElementById("new_loc").innerHTML = "";
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&location_code='+location_code);
			http.onreadystatechange = function() {
				if(http.readyState == 4) {
					var response = http.responseText;
					document.getElementById('div_get_roads').innerHTML = response;
				}
			}
			http.send(null);
        }
}

function get_buildings(action,road_code)
{		      		
	
	if(road_code == "new") {
			document.getElementById("new_rd").innerHTML = "<input name='new_road' id='new_road'>";
	} else {
		document.getElementById("new_rd").innerHTML = "";
		http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&road_code='+road_code);
		http.onreadystatechange = function() {
			if(http.readyState == 4) {
					var response = http.responseText;
					document.getElementById('div_get_buildings').innerHTML = response;
			}
		}
		http.send(null);
	}
}


function get_area(action,admin_name)
{
	http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&admin_name='+admin_name);
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			var response = http.responseText;
			document.getElementById('div_get_area').innerHTML = response;
		}
	}
	http.send(null);
}

function get_location(action,admin_name,area_name)
{
	http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&admin_name='+admin_name+'&area_name='+area_name);
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			var response = http.responseText;
			document.getElementById('div_get_location').innerHTML = response;
		}
	}
	http.send(null);
}

function GetPoolName(action,site_id)
{
	http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id);
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			var response = http.responseText;
			document.getElementById('div_get_poolname').innerHTML = response;
		}
	}
	http.send(null);
}

function getFreeStaticPool(action,pool_name)
{
	 
	http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&pool_name='+pool_name);
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			var response = http.responseText;
			document.getElementById('div_get_static_ip').innerHTML = response;
		}
	}
	http.send(null);
}

function get_distributor(action,object,adminlevel="")
{
	switch(action)
	{
		case 'SiteWiseDistributor' :
			site_id  = object.value;
			
			http2.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_id='+site_id+'&admin_level='+adminlevel);

			break;

		default :
			break;
	}

	http2.onreadystatechange = function() {
		
		if(http2.readyState == 4)
		{
			var response = http2.responseText;
			document.getElementById('div_get_distributor').innerHTML = response;
		}
	} 
	
	http2.send(null);
}


function check_data(action,value,returnelement)
{
	 switch(action)
	{
			case 'CheckUserName' :
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&UserName='+value);
			break;

			case 'CheckMemberShipNo' :
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&MemberShipNo='+value);
			break;
			
			case 'CheckEmail' :
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&email='+value);
			break;

			case 'CheckMobile' :
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&mobile='+value);
			break;
			case 'CheckPhone' :
			
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&phone='+value);
			break;
			case 'CheckPlanGroup' :
			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&planGroupname='+value);
			break;

		default :
			break;
			
	}

	http.onreadystatechange = function() {
		
		
		if(http.readyState == 4)
		{
		    
			var response = http.responseText;
			
			document.getElementById(returnelement).innerHTML = response.trim();
		}
	} 
	
	http.send(null);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////  SSLPCRM API
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ssllpcrmApi_baseurl= "http://crm-gpx.l2s.biz/ssllpapi/";
function get_subcategory(val)
{
        //http.open("POST", ssllpcrmApi_baseurl +"getssllpcrminfo" );
        http.open('POST', '../db_scripts/get_ajax_script.php');
        http.onreadystatechange = function() {
	//alert(http.readyState); return false;

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        document.getElementById('problemsubcategory').innerHTML=response;
                }
        }
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("action=getProblemSubCategory&categoryId=" + $(val).val());
}

function  saveserver()
{
        var server_name =  document.getElementById('server_name').value;
        var server_type =  document.getElementById('server_type').value;
        var Linked_with =  document.getElementById('server_id').value;
        var company_id =  document.getElementById('company_id').value;
        var server_ip =  document.getElementById('server_ip').value;
        var group_id =  document.getElementById('group_id').value;
        var added_by =  document.getElementById('L2sUserId').value;

        var postFields = "&action=addServer&server_name=" + server_name +'&server_type='+ server_type +'&linked_with=' + Linked_with +
        '&company_id=' + company_id +"&server_ip=" + server_ip +'&group_id=' + group_id + "&added_by=" + added_by;

        //http.open("POST", ssllpcrmApi_baseurl +"adddatacrm" );
        http.open('POST', '../db_scripts/get_ajax_script.php');
        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        if (response == "0")
                        {
                                alert("ServerIP is already configured/Added ");
                        }
                        else
                        {
                                alert("ServerIP is added Sucessfully ");
                                var skillsSelect = document.getElementById("server_type");
                var selectedText = skillsSelect.options[skillsSelect.selectedIndex].text;
                                document.getElementById("Server").innerHTML += "<option selected value='" + parseInt(response) + "' > "+ server_ip + " - " + selectedText +" </option>"
                            document.getElementById("Server").focus();
                            hide_add_server();
                        }
                }
        }
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(postFields);
}


function  savecontact()
{
        var contact_person =  document.getElementById('contact_person').value;
        var contact_number1 =  document.getElementById('contact_number1').value;
        var contact_email =  document.getElementById('contact_email').value;
        var company_id =  document.getElementById('company_id').value;
        var group_id =  document.getElementById('group_id').value;
        var added_by =  document.getElementById('L2sUserId').value;

        var postFields = "&action=addCaller&contact_person=" + contact_person +'&contact_number1=' + contact_number1 +'&company_id=' +
                       company_id + "&contact_email=" + contact_email + '&group_id=' + group_id + "&created_by=" + added_by +"'";

    http.open('POST', '../db_scripts/get_ajax_script.php');
        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        if (response == 0)
                        {
                                alert("Caller Adding Fail");
                        }
                        else
                        {
                                alert("Caller is added Sucessfully ");
                                document.getElementById("caller").value =  contact_person;
                                document.getElementById("callerId").value = parseInt(response);
                                document.getElementById("caller").focus();
                                hide_add_person();
                        }
                }
        }
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(postFields);
}

function get_site_city_wise(action,object)
{	
	switch(action)
	{

		case 'CityWiseSite' :

			city  = object.value;			

			http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&city='+city);

			break;

		default :
			break;
	}

	http.onreadystatechange = function() {
		
		if(http.readyState == 4)
		{
			var response = http.responseText;			
			document.getElementById('div_get_sites_city_wise').innerHTML = response;
		}
	} 
	
	http.send(null);
}

function get_Sitewise_frenchise(action,object)
{

       switch(action)
        {
                case 'SitwiseMultipleFrenchise' :
                                var site_ids;
                                site_ids = "";
                                var site_val = object.value;
                                if( site_val != 'all' ){
                                        for (i = 0; i < object.length; i++)
                                        {
                                                if (object.options[i].selected && object.options[i].value!='')
                                                {
                                                        site_ids += object.options[i].value + ",";
                                                }
                                        }
                                        site_ids = site_ids.substring(0, site_ids.length-1);
                                        http.open('get', '../db_scripts/get_ajax_script.php?action='+action+'&site_ids='+site_ids,0);
                                }else{
                                        http.open('POST', '../db_scripts/get_ajax_script.php?action='+action+'&site_ids='+site_val,0);
                                }
                                break;
                default :
                                break;
        }

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;

                        document.getElementById('div_sitewise_frenchises').innerHTML = response;
                }
        }

        http.send(null);
}


function get_Frenshisewise_Zone(action,object)
{

        switch(action)
        {
                case 'FrenchisewiseMultipleZone' :
                                var admin_ids;
                                admin_ids = "";

                                var admin_val = object.value;
                                if( admin_val != 'all' ){
                                        for (i = 0; i < object.length; i++)
                                        {
                                                if (object.options[i].selected && object.options[i].value!='')
                                                {
                                                        admin_ids += object.options[i].value + ",";
                                                }
                                        }
                                        admin_ids = admin_ids.substring(0, admin_ids.length-1);
                                        http.open('POST', '../db_scripts/get_ajax_script.php?action='+action+'&admin_ids='+admin_ids,0);
                                }else{
                                        http.open('POST', '../db_scripts/get_ajax_script.php?action='+action+'&admin_ids='+admin_val,0);
                                }
                                break;
                default :
                                break;
        }

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;

                        document.getElementById('div_frenchises_zone').innerHTML = response;
                }
        }

        http.send(null);
}


function get_tempalte_content( templateId )
{

        http.open('get', '../db_scripts/get_ajax_script.php?action=get_tempalte_content&templateId='+templateId);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        document.getElementById('TemplateContent').innerHTML = response;
                }
        }
        http.send(null);
}

function get_AreawiseLocation(object)
{
        areaIds="";
        for (i = 0; i < object.length; i++)
        {
                if (object.options[i].selected && object.options[i].value!='')
                {
                        areaIds += object.options[i].value + ",";
                }
        }
        areaIds = areaIds.substring(0, areaIds.length-1);

        http.open('get', '../db_scripts/get_ajax_script.php?action=AreawiseLocation&area_ids='+areaIds,0);
        http.onreadystatechange = function() {
                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        document.getElementById('div_AreawiseLocation').innerHTML = response;
                }
        }
        http.send(null);
}


function get_LocationwiseBuilding(object)
{

        locationIds="";
        for (i = 0; i < object.length; i++)
        {
                if (object.options[i].selected && object.options[i].value!='')
                {
                        locationIds += object.options[i].value + ",";
                }
        }
        locationIds = locationIds.substring(0, locationIds.length-1);

        http.open('get', '../db_scripts/get_ajax_script.php?action=LocationwiseBuilding&location_ids='+locationIds,0);
        http.onreadystatechange = function() {
                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        document.getElementById('div_LocationwiseBuilding').innerHTML = response;
                }
        }
        http.send(null);
}

function getUserslist()
{

        var site = document.form1.SiteName
        Site_ids="";
        for (i = 0; i < site.length; i++)
        {
                if (site.options[i].selected && site.options[i].value!='')
                {
                        Site_ids += site.options[i].value + ",";
                }
        }
        Site_ids = Site_ids.substring(0, Site_ids.length-1);

        var AdminName = document.form1.AdminName
        Admins="";
        for (i = 0; i < AdminName.length; i++)
        {
                if (AdminName.options[i].selected && AdminName.options[i].value!='')
                {
                        Admins += AdminName.options[i].value + ",";
                }
        }

 Admins = Admins.substring(0, Admins.length-1);

        var ZoneName = document.form1.ZoneName
        Zones="";
        for (i = 0; i < ZoneName.length; i++)
        {
                if (ZoneName.options[i].selected && ZoneName.options[i].value!='')
                {
                        Zones += ZoneName.options[i].value + ",";
                }
        }
        Zones = Zones.substring(0, Zones.length-1);



        var AreaName = document.form1.AreaName
        Areas="";
        for (i = 0; i < AreaName.length; i++)
        {
                if (AreaName.options[i].selected && AreaName.options[i].value!='')
                {
                        Areas += AreaName.options[i].value + ",";
                }
        }
        Areas = Areas.substring(0, Areas.length-1);

        var Location = document.form1.Location
        Locations="";
        for (i = 0; i < Location.length; i++)
        {
                if (Location.options[i].selected && Location.options[i].value!='')
                {
                        Locations += Location.options[i].value + ",";
                }
        }
        Locations = Locations.substring(0, Locations.length-1);

        var Building = document.form1.Building
        Buildings="";
        for (i = 0; i < Building.length; i++)
        {
                if (Building.options[i].selected && Building.options[i].value!='')
                {
                        Buildings += Building.options[i].value + ",";
                }
        }
        Buildings= Buildings.substring(0, Buildings.length-1);
       fromdate = document.form1.date_from.value;
        todate   = document.form1.date_to.value;
        usertype = document.form1.UserType.value;
        SendType = document.form1.SendType.value;
        UserName = document.form1.UserName.value;


        http.open('get', '../db_scripts/get_ajax_script.php?action=getUserCountforSMS&usertype='+usertype +'&Site_ids='+Site_ids+'&Admins='+Admins+'&Zones='+Zones

+'&Areas='+Areas+'&Locations='+Locations+'&Buildings='+Buildings+'&fromdate='+fromdate+'&todate='+todate+'&SendType='+SendType +'&UserName='+UserName,0);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        console.log(response);
                        document.getElementById('div_smsuserscount').innerHTML = response.trim();
	        document.getElementById('div_smsusers').innerHTML= '';
	        document.form1.SMSUsers.value='All';
                }
        }

        http.send(null);
        console.log(Site_ids);
}

function getUserslist1()
{

        var site = document.form1.SiteName
        Site_ids="";
        for (i = 0; i < site.length; i++)
        {
                if (site.options[i].selected && site.options[i].value!='')
                {
                        Site_ids += site.options[i].value + ",";
                }
        }
        Site_ids = Site_ids.substring(0, Site_ids.length-1);

        var AdminName = document.form1.AdminName
        Admins="";
        for (i = 0; i < AdminName.length; i++)
        {
                if (AdminName.options[i].selected && AdminName.options[i].value!='')
                {
                        Admins += AdminName.options[i].value + ",";
                }
        }
        Admins = Admins.substring(0, Admins.length-1);
       var ZoneName = document.form1.ZoneName
        Zones="";
        for (i = 0; i < ZoneName.length; i++)
        {
                if (ZoneName.options[i].selected && ZoneName.options[i].value!='')
                {
                        Zones += ZoneName.options[i].value + ",";
                }
        }
        Zones = Zones.substring(0, Zones.length-1);



        var AreaName = document.form1.AreaName
        Areas="";
        for (i = 0; i < AreaName.length; i++)
        {
                if (AreaName.options[i].selected && AreaName.options[i].value!='')
                {
                        Areas += AreaName.options[i].value + ",";
                }
        }
        Areas = Areas.substring(0, Areas.length-1);

        var Location = document.form1.Location
        Locations="";
        for (i = 0; i < Location.length; i++)
        {
                if (Location.options[i].selected && Location.options[i].value!='')
                {
                        Locations += Location.options[i].value + ",";
                }
        }
        Locations = Locations.substring(0, Locations.length-1);

        var Building = document.form1.Building
        Buildings="";
        for (i = 0; i < Building.length; i++)
        {
                if (Building.options[i].selected && Building.options[i].value!='')
                {
                        Buildings += Building.options[i].value + ",";
                }
        }
        Buildings = Buildings.substring(0, Buildings.length-1);
       fromdate = document.form1.date_from.value;
        todate   = document.form1.date_to.value;
        usertype = document.form1.UserType.value;
        SendType = document.form1.SendType.value;
        UserName = document.form1.UserName.value;

        http.open('get', '../db_scripts/get_ajax_script.php?action=getUserforSMS&usertype='+usertype +'&Site_ids='+Site_ids+'&Admins='+Admins+'&Zones='+Zones

+'&Areas='+Areas+'&Locations='+Locations+'&Buildings='+Buildings+'&fromdate='+fromdate+'&todate='+todate+'&SendType='+SendType+'&UserName='+UserName,0);

        http.onreadystatechange = function() {

                if(http.readyState == 4)
                {
                        var response = http.responseText;
                        console.log(response);
                        document.getElementById('div_smsusers').innerHTML =  response.trim();
                }
        }

        http.send(null);
}
