//====================================================================================================
//	File Name		:	validate.js
//----------------------------------------------------------------------------------------------------
//	Purpose			:	Client side validation in JavaScript.
//	Author			:	Lamrin 
//	Creation Date	:	23-Apr-2004
//	Copyright		:	Copyrights � 2004 Spacecom
//	Email			:	nirmal_909@yahoo.com
//	History			:
//						Date				Author					Remark
//						23-Apr-2004			Lamrin 		Initial Release
//
//====================================================================================================

var ie4=document.all&&navigator.userAgent.indexOf("Opera")==-1;
var ns6=document.getElementById&&navigator.userAgent.indexOf("Opera")==-1;
var ns4=document.layers;

//====================================================================================================
//	Function Name	:	IsEmpty
//	Purpose			:	checks whether a field has value or is blank, it returns false if a field
//						is empty otherwise true.
//	Parameters		:	fld	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function IsEmpty(fld,msg)
{
	if((fld.value == "" || fld.value.length == 0) && (msg == ''))
	{
		return false;
	}
	if(fld.value == "" || fld.value.length == 0)
	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}

/****************************************************************/

function isEmpty1(s)
{ return ((s == null) || (s.length == 0)) }

/****************************************************************/

function isWhitespace(s) {
    var whitespace = " \\t\\n\\r";
    var i, white;
    var valid=true;
    // Is s empty?
//    if (isEmpty1(s)) return true;
    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.
    for (white=0,i= 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        valid = false;
        var c = s.charAt(i);
        if ( (c >= 'a' && c <= 'z') || ( c>='A' && c<='Z') || (c >=0 && c<=9 ) || c=='\@' || c=='.' || c=='_' || c=='-') valid = true;
        if(c==' ') valid=false;
        if ( ! valid ) white++;
    }

    if (white >0 ) return true;
    // All characters are whitespace.
    return false;

}

/****************************************************************/


//====================================================================================================
//	Function Name	:	IsEmail
//	Purpose			:	checks Email validity. Email must have character @ followed by one or more
//						dots. It returns flase if Email is invalid otherwise true.
//	Parameters		:	fld	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function IsEmail(fld,msg)
{
	var regex = /^[\w]+(\.[\w]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ ;
	if(!regex.test(fld.value))
	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}
function IsMobile(fld,msg)
{
        var regex = /^\d{10}$/;
        if(!regex.test(fld.value))
        {
                alert(msg);
                fld.focus();
                return false;
        }
        return true;
}
//====================================================================================================
//	Function Name	:	isValidNetmaskAddress
//	Purpose			:	checks Netmask validity.  It returns flase if Netmask is invalid otherwise true.
//	Parameters		:	ipaddr	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Vipul
//	Creation Date	:	23-Jun-2004
//----------------------------------------------------------------------------------------------------

function isValidIPAddress(ipaddr) {
   var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
   var ipaddress = ipaddr.value;
   if (re.test(ipaddress)) {
      var parts = ipaddress.split(".");
      if(ipaddress == '0.0.0.0' || ipaddress == '255.255.255.255')
	  {
	  	alert(ipaddress + " is a special IP address and cannot be used here");
		ipaddr.focus();
		return false;
	  }
	  if (parseInt(parseFloat(parts[0])) == 0) { 
	    alert("Please Enter Valid IP Address.");	
		ipaddr.focus();
		return false; 
	  }
      for (var i=0; i<parts.length; i++) {
         if (parseInt(parseFloat(parts[i])) > 255) { 
		 	alert("Please Enter Valid IP Address.");
			ipaddr.focus();
			return false; 
		}
      }
      return true;
   } else {
      alert("Please Enter Valid IP Address.");
	  ipaddr.focus();
	  return false;
   }
}
//====================================================================================================
//	Function Name	:	isValidNetmaskAddress
//	Purpose			:	checks Netmask validity.  It returns flase if Netmask is invalid otherwise true.
//	Parameters		:	ipaddr	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Vipul
//	Creation Date	:	23-Jun-2004
//----------------------------------------------------------------------------------------------------

function isValidNetmaskAddress(ipaddr,msg) {
   var re = /^255\.255\.255\.\d{1,3}$/;
   var ipaddress = ipaddr.value;
   if (re.test(ipaddress)) {
	  var parts = ipaddress.split(".");
	  if (parseInt(parseFloat(parts[3])) > 255) { alert(msg); ipaddr.focus();return false; }
	  return true;
   } else {
	  alert(msg);
	  ipaddr.focus();
	  return false;
   }
}

//====================================================================================================
//	Function Name	:	isValidDevice
//	Purpose			:	checks Devicename Validity.  It returns false if device is invalid otherwise true.
//	Parameters		:	ipaddr	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Vipul
//	Creation Date	:	23-Jun-2004
//----------------------------------------------------------------------------------------------------

function isValidDevice(dev,msg) {
   var re = /^eth\d{1,}$/;
   var device = dev.value;
   if (!re.test(device)) {
	  alert(msg);
	  dev.focus();
	  return false;
   }
   return true;
}

//====================================================================================================
//	Function Name	:	IsValidString
//	Purpose			:	checks if field value contains only alphanumeric and '_' charactes. Also checks
//						that alphabetical chars. and '_' must have to be come first and followed by
//						numbers. It returns false if above conditions will not satisfy otherwise true.
//	Parameters		:	fld	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function IsValidString(fld,msg)
{
	var regex = /^[0-9]*[_]*[0-9a-zA-Z_]+[a-zA-Z0-9_.]*$/;
	if(!regex.test(fld.value))
	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}

//====================================================================================================
//	Function Name	:	IsValidString
//	Purpose			:	checks if field value contains only alphanumeric and '_' charactes. Also checks
//						that alphabetical chars. and '_' must have to be come first and followed by
//						numbers. It returns false if above conditions will not satisfy otherwise true.
//	Parameters		:	fld	-	field name to be checked
//					    msg -   error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function IsPassword(fld,msg)
{
	var regex = /^[_]*[a-zA-Z]+[a-zA-Z0-9]*$/;
	if(!regex.test(fld.value))
  	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}

//====================================================================================================
//	Function Name	:	IsLen
//	Purpose			:	checks if field value has number of characters between two specified limits.
//						It returns false if no. of chars. is < min. length or > max. length
//						otherwise true.
//	Parameters		:	fld	   - field name to be checked
//						minlen - minimum length of a field
//						maxlen - maximum length of a field
//					    msg    -   error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function IsLen(fld, minlen, maxlen, msg)
{
	if(fld.value.length < minlen || fld.value.length > maxlen)
	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}


//====================================================================================================
//	Function Name	:	IsDate
//	Purpose			:	checks if date is valid according to month selected.
//						i.e. Feb must have 28 or 29 days and also April, June, Sept. and Nov. have
//						30 days. It returns false if above condition will not satisfy otherwise true.
//	Parameters		:	m	-  month field
//						d   -  day field
//						y   -  year field
//					    msg -  error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	23-Apr-2004
//----------------------------------------------------------------------------------------------------
function daysInFebruary (year)
{
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) 
{
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function IsDate(dtStr)
	{
		var dtCh= "/";
		var minYear=1900;
		var maxYear=2100;
		var daysInMonth = DaysArray(12)
		var pos1=dtStr.indexOf(dtCh)
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		var strMonth=dtStr.substring(0,pos1)
		var strDay=dtStr.substring(pos1+1,pos2)
		var strYear=dtStr.substring(pos2+1)
		strYr=strYear
		if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
		if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
		for (var i = 1; i <= 3; i++) {
			if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
		}
		month=parseInt(strMonth)
		day=parseInt(strDay)
		year=parseInt(strYr)
		if (pos1==-1 || pos2==-1){
			alert("The date format should be : mm/dd/yyyy")
			return false
		}
		if (strMonth.length<1 || month<1 || month>12){
			alert("Please enter a valid month")
			return false
		}
		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > 		daysInMonth[month]){
			alert("Please enter a valid day")
			return false
		}
		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
			alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
			return false
		}
		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
			alert("Please enter a valid date")
			return false
		}
	return true
}

function IsDateYYYYMMDD(dtStr)
	{
		var dtCh= "-";
		var minYear=1900;
		var maxYear=2100;
		var daysInMonth = DaysArray(12)
		var pos1=dtStr.indexOf(dtCh)
		var pos2=dtStr.indexOf(dtCh,pos1+1)
		var strYear=dtStr.substring(0,pos1)
		var strMonth=dtStr.substring(pos1+1,pos2)
		var strDay=dtStr.substring(pos2+1)
		strYr=strYear
		if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
		if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
		for (var i = 1; i <= 3; i++) {
			if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
		}
		month=parseInt(strMonth)
		day=parseInt(strDay)
		year=parseInt(strYr)
		if (pos1==-1 || pos2==-1){
			alert("The date format should be : YYYY-MM-DD")
			return false
		}
		if (strMonth.length<1 || month<1 || month>12){
			alert("Please enter a valid month")
			return false
		}
		if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > 		daysInMonth[month]){
			alert("Please enter a valid day")
			return false
		}
		if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
			alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
			return false
		}
		if (dtStr.indexOf(dtCh,pos2+1)!=-1 || IsNumeric(stripCharsInBag(dtStr, dtCh))==false){
			alert("Please enter a valid date")
			return false
		}
	return true
}

function IsDate1(m,d,y,msg)
{
  var val1= m.value;
  var val2= d.value;
  var val3= y.value;

	if(val2 > daysInFebruary(val3) && val1 == 02)
	{
		alert(msg);
		d.focus();
		return false;
	}
	if((val1 == 04 || val1 == 06 || val1 == 09 || val1 == 11 ) && (val2 > 30))
	{
		alert(msg);
		d.focus();
		return false;
	}

  dt= val1 + '/' + val2 + '/' + val3;
  return true;
}

function daysInFebruary (year)
{
	// February has 29 days in any year evenly divisible by four,
	// EXCEPT for centurial years which are not also divisible by 400.
	return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}

function IsNumeric(str)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

   for (i = 0; i < str.length && IsNumber == true; i++) 
   { 
      Char = str.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
	  {
	  	alert('Please Enter Numbers Only');
         IsNumber = false;
      }
   }
   return IsNumber;
}

function IsNumeric1(str)
{
   if((window.event.keyCode<48) || (window.event.keyCode>57) )
   {
   	  if(window.event.keyCode!=46)
	  {
	  	window.event.keyCode=0;
	  }
   }
}

function allDigits(str)
{
	//alert(str)
	//alert(inValidCharSet(str,"0123456789"));
	return inValidCharSet(str,"0123456789");
}

function inValidCharSet(str,charset)
{
	var result = true;
	for (var i=0;i<str.length;i++)
		if (charset.indexOf(str.substr(i,1))<0)
		{
			result = false;
			break;
		}
	return result;
}

function stripCharsInBag (s, bag)
{
    var i;
    var returnString = "";
    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}

//====================================================================================================
//	Function Name	:	checkFileType
//	Purpose			:	It checks the file type. It must be either doc or pdf.
//	Parameters		:	fld -  field name containig file name
//						msg -  error message to be displayed
//	Return			:	true or false
//	Author			:	Lamrin
//	Creation Date	:	29-Apr-2004
//----------------------------------------------------------------------------------------------------
function checkFileType(fld,msg)
{
	var regex = /(.doc|.pdf)$/;
	if(!regex.test(fld.value))
	{
		alert(msg);
		fld.focus();
		return false;
	}
	return true;
}
function debugln(s) {
  if(DEBUG) {STDOUT.writeln(s+"<BR>");}
}
function debug(s) {
  if(DEBUG) {STDOUT.writeln(s);}
}
// Object type
function isObject(o) {
  return (typeof(o)=="object");
}
function isArray(o) {
  return (isObject(o) && (o.length) &&(!isString(o)));
}
function isFunction(o) {
  return (typeof(o)=="function");
}
function isString(o) {
  return (typeof(o)=="string");
}
// getArgs


/*******************************************************************
	Following is the code which will deny user to select the text written on page
//====================================================================================================
//	Utility Name	:	selectDeny
//	Purpose			:	It ckecks if user try to select the text on the page.
//	Parameters		:	None
//	Return				:	false
//	Author				:	
//	Creation Date	:	03-Oct-2004
//----------------------------------------------------------------------------------------------------
*******************************************************************/
//document.addEventListener('contextmenu', event => event.preventDefault());
//var nDoesAll = (null != document.all)

//function returnFalse()
//{
//	window.event.returnValue = false 
//}

//if (!nDoesAll) {
//	document.onselectstart = returnFalse
//}

/*******************************************************************/

// general sort function passing as datafield with form name form1

function sort()
{
	var argv=sort.arguments;
	document.form1.soryBy.value=argv[0];
//      alert(document.form1.hidden4.value);
	document.form1.action="";
	document.form1.submit();
}

// check for radio button
function IsRadioBtnChecked(fld,msg)
{
	if(fld.length)
	{
		for(i=0 ; i<fld.length ; i++ )
			if(fld[i].checked)
				return true;
	}
	else
	{
		if(fld.checked)
			return true;
	}
	alert(msg);
	return false;
}

function isNumericKey()
{
	if (window.event.keyCode < 48 || window.event.keyCode > 57)
	{
		window.event.keyCode = 0;
	} 
}
// converts to a desired decimal point number
function roundNumber(num, dec)
{
        var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
        return result;
}
