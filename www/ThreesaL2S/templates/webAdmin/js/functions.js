//====================================================================================================
//	File Name		:	functions.js
//----------------------------------------------------------------------------------------------------
//	Purpose			:	Javascript Utility functions
//	Author			:	Nirmal Patel
//	Creation Date	:	05-May-2004
//	Copyright		:	Copyrights � 2004 Spacecom
//	Email			:	nirmal_909@yahoo.com
//	History			:
//						Date						Author						Remark
//						05-May-2004					Nirmal Patel				Initial Release
//
//====================================================================================================

//====================================================================================================
//	Function Name	:	popupWindowURL
//	Purpose			:	Whenever you wanna open a link into a new window just call this function
//								you need to pass some arguemnts as described below.
//	Parameters		:
//								url  = url to be open in the new window
//								winname = winname is the window name for the reference of that window
//								w is the width
//								h is the height
//								menu is the parameter, if you want menubar to be enabled on the window
//								resize if you wanna resize the window
//								scroll i fyou needed
//	Return			:	true or false
//	Author			:	Nirmal Patel
//	Creation Date	:	05-May-2004
//----------------------------------------------------------------------------------------------------

function popupWindowURL(url, winname,  w, h, menu, resize, scroll) {

    var x = (screen.width-w)/2;
    var y = (screen.height-h)/3;

	if (winname == null) winname = "newWindow";
	if (w == null) w = 800;
	if (h == null) h = 600;
	if (resize == null) resize = 1;

	menutype   = "nomenubar";
	resizetype = "noresizable";
	scrolltype = "noscrollbars";
	if (menu) menutype = "menubar";
	if (resize) resizetype = "resizable";
	if (scroll) scrolltype = "scrollbars";

    cwin=window.open(url,winname,"top=" + y + ",left=" + x + ",screenX=" + x + ",screenY=" + y + "," + "status," + menutype + "," + scrolltype + "," + resizetype + ",width=" + w + ",height=" + h);

	if (!cwin.opener) cwin.opener=self;
	cwin.focus();

	return true;
}

//====================================================================================================
//	Function Name	:	sprintf
//	Purpose			:	Provide the functionality of sprintf
//	Parameters		:		
//	Return			:	true or false
//	Author			:	
//	Creation Date	:	01-July-2004
//----------------------------------------------------------------------------------------------------
/*
function sprintf()
{
    if (!arguments || arguments.length < 1 || !RegExp)
    {
        return;
    }
    var str = arguments[0];
    var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
    var a = b = [], numSubstitutions = 0, numMatches = 0;
    while (a = re.exec(str))
    {
        var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
        var pPrecision = a[5], pType = a[6], rightPart = a[7];

        //alert(a + '\n' + [a[0], leftpart, pPad, pJustify, pMinLength, pPrecision);

        numMatches++;
        if (pType == '%')
        {
            subst = '%';
        }
        else
        {
            numSubstitutions++;
            if (numSubstitutions >= arguments.length)
            {
                alert('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');
            }
            var param = arguments[numSubstitutions];
            var pad = '';
                   if (pPad && pPad.substr(0,1) == "'") pad = leftpart.substr(1,1);
              else if (pPad) pad = pPad;
            var justifyRight = true;
                   if (pJustify && pJustify === "-") justifyRight = false;
            var minLength = -1;
                   if (pMinLength) minLength = parseInt(pMinLength);
            var precision = -1;
                   if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
            var subst = param;
                   if (pType == 'b') subst = parseInt(param).toString(2);
              else if (pType == 'c') subst = String.fromCharCode(parseInt(param));
              else if (pType == 'd') subst = parseInt(param) ? parseInt(param) : 0;
              else if (pType == 'u') subst = Math.abs(param);
              else if (pType == 'f') subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision): parseFloat(param);
              else if (pType == 'o') subst = parseInt(param).toString(8);
              else if (pType == 's') subst = param;
              else if (pType == 'x') subst = ('' + parseInt(param).toString(16)).toLowerCase();
              else if (pType == 'X') subst = ('' + parseInt(param).toString(16)).toUpperCase();
        }
        str = leftpart + subst + rightPart;
    }
    return str;
}
*/


//====================================================================================================
//	Function Name	:	Record_Focus
//	Purpose			:	Provide the functionality for record selection
//	Parameters		:	mouseState		-	State of the mouse	
//						rowLostFocus	-	Class name to be use when row lost focus
//						rowGetFocus		-	Class name to be use when row get focus
//						rowSelected		-	Class name to be use when row get selectd
//						curRow			-	Id of current row
//						lastSelection	-	Id of last selection
//	Return			:	None
//	Author			:	
//	Creation Date	:	18-July-2004
//----------------------------------------------------------------------------------------------------
function Record_Focus(mouseState, rowLostFocus, rowGetFocus, rowSelected, curRow, lastSelection)
{
	switch(mouseState)
    {
    	case 0:		// Row Get Focus
        	if(curRow.className != rowSelected)
				curRow.className = rowGetFocus;
        	break;
        case 1:		// Row Lost Focus
        	if(curRow.className != rowSelected)
				curRow.className = rowLostFocus;
        	break;
        case 2:		// Row Get clicked
        	if(curRow.className != rowSelected)
            {
				curRow.className = rowSelected;
                if(lastSelection.value)
		            document.getElementById(lastSelection.value).className = rowLostFocus;

	            lastSelection.value = curRow.id;
            }
            else
			{
	            curRow.className = rowGetFocus;
                if(lastSelection.value)
		            lastSelection.value = '';
			}				

        	break;
    }
}

//====================================================================================================
//	Function Name	:	toggleMenu
//	Purpose			:	Show Hide menu
//	Parameters		:	ID
//	Return			:	None
//	Author			:	
//	Creation Date	:	12-Sep-2004
//----------------------------------------------------------------------------------------------------
function toggleMenu(obj)
{
	if(obj.style.display == "block")
		obj.style.display = "none";
	else
		obj.style.display = "block";
}

function generateYearList()
{
	thisDate = new Date();
	strHTML = "";

	for(var i=thisDate.getYear()-1; i < thisDate.getYear()+10; i++)
		strHTML += "<option value='" + i + "'>" + i + "</option>";

	return strHTML;
}

function changeSelect(obj)
{
	var mdy = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
	var mdyShort = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28);
	var mdyShortLeap = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29);
	var mdyLong = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31);
	var myLeap = new Array(2000,2004,2008,2012,2016,2020,2024,2028,2032,2036,2040,2044,2052,2056,2060,2064);
	var myMonths = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	var myDaze = new Array(mdyLong,mdyShortLeap,mdyShort,mdy);
	var showyrs = 30;
	
	var startyr = 2002; // set this to the first year you want this to use (ie 1999)
	var oldSortDate = "";// this is the date you want displayed, otherwise todays date is shown
}

function CurrentSysDate()
{
	var now=new Date();
	var str="";
	var mon=now.getMonth()+1;
	str=(now.getDate()<10)?("0"+now.getDate()):(now.getDate());
	str+="/";
	str+=(mon<10)?("0"+mon):mon;
	str+="/"+now.getYear();
	return str;
}

//====================================================================================================
//	Function Name	:	focusLogin()
//	Purpose			:	This function will focus username field 
//	Parameters		:	none
//	Return				:	none
//	Author				:	
//	Creation Date	:	18-Sep-2004
//----------------------------------------------------------------------------------------------------
function focusLogin()
{
	if(document.frmLogin)
		document.frmLogin.username.focus();
}

function ConvRs(frm,TName,DescNo,Round)
{	
	with(frm)
    {		
		var DNo=0;
		var k=0;
		var m=0;
		var CDesc= -1;
		var charset="0123456789";
		
		if(TName.value == "")
		{
			TName.value = 0;
			return;
		}

		for (var i=0;i<TName.value.length;i++)
		{
			if (charset.indexOf(TName.value.substr(i,1))<0) 
			{	
				if (((TName.value.substr(i,1))=="-") && i==0)
				{
					if (ChkIsNumZero(frm,TName)==true) 
					{
						TName.value = 0;
						return ;
					}
				}
				else
				{
					if (DescNo==0) 
					{
						var St="";
						for (var j=0;j<i;j++)
						{
							St = St + (TName.value.substr(j,1));
						}
						TName.value = St;
						return ;	
					}
					if ((TName.value.substr(i,1))!=".") 
					{
						var St="";
						for (var j=0;j<i;j++)
						{
							St = St + (TName.value.substr(j,1));
						}
						if ((DNo==0) && (DescNo!=0))
						{
							St = St + (".");
							CDesc++
						}
						for (var j=0;j<DescNo-CDesc;j++)
						{
							St = St + ("0");
						}
						TName.value = St;
						return ;	
					}
					if (((TName.value.substr(i,1))==".") && (DNo==0) && (DescNo!=0) )
					{
						DNo = 1 ;
					}
				}
			}
			if (DNo==1)
			{
				CDesc++
				if (DescNo+1==CDesc)
				{
					k=i;
					if (k<TName.value.length)
					{
						if (charset.indexOf(TName.value.substr(k,1))<0)
						{
						}
						else
						{
							if ((TName.value.substr(k,1))>=5)
							{
								m=1;
							}
						}
					}
 					var St="";
					for (var j=0;j<i;j++)
					{
						if (j==(i-1))
						{
							if (m==1)
							{
								m=(TName.value.substr(j,1));
								m++
								if (m==10)
								{
									m--
								}
							}
							else
							{
								m=(TName.value.substr(j,1));
							}
							St = St + (m);
						}
						else
						{
							St = St + (TName.value.substr(j,1));
						}
					}
					TName.value = St;
					return ;
				}
			}
		}
		var St="";
		St = St + (TName.value);
		if ((DNo==0) && (DescNo!=0))
		{
			St = St + (".");
			CDesc++	
		}
		if (DescNo!=0)
		{
			for (var j=CDesc;j<DescNo;j++)
			{
				St = St + ("0");
			}
		}
		TName.value = St;
		return ;	
	}
}

<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->


function EmptyBox(obj)
{
	if(obj.value == "Username")
		obj.value="";
}

function EmptyText(obj)
{
        obj.value="";
}

function checkAll(frm, flag)
{
	alert("nirmal here" + frm + " " + flag)
        if(flag)
        {
                if(document.all["chkUser[]"].length == undefined)
                {
                        document.all["chkUser[]"].checked = true;
                }
                else
                {
                        for(i=0;i<document.all["chkUser[]"].length;i++)
                                document.all["chkUser[]"][i].checked = flag;
                }
        }
        else
        {
                if(document.all["chkUser[]"].length == undefined)
                {
                        document.all["chkUser[]"].checked = false;
                }
                else
                {
                        for(i=0;i<document.all["chkUser[]"].length;i++)
                                document.all["chkUser[]"][i].checked = flag;
                }
        }

}

// CHECK ALL CHECK BOX AND UN CHECKED

function chkAll(frmName,objName)
{
	
	with (frmName) 
	{
		for (var i=0; i < elements.length; i++) 
		{
			if (elements[i].type == 'checkbox' && elements[i].name == objName)
			{
				if (elements[i].checked)
					elements[i].checked = false;
				else
					elements[i].checked = true;
			}
		}
	}
}

/////////Cooooooooooooooooooooooooooooooooookieeeeeeeeeeeeeeeeeeeeeeeeee

function getCookieVal (offset) 
{
   var endstr = document.cookie.indexOf (";", offset);

   if (endstr == -1)
      endstr = document.cookie.length;

   return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) 
{
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;

   while (i < clen) 
   {
      var j = i + alen;

      if (document.cookie.substring(i, j) == arg)
         return getCookieVal (j);

      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) 
         break; 
   }
   return null;
}

function SetCookie (name, value) 
{
   //alert('nirmal here');
   var argv = SetCookie.arguments;
   var argc = SetCookie.arguments.length;

   document.cookie = name + "=" + escape (value) ;
   
}

/////////Cooooooooooooooooooooooooooooooooookieeeeeeeeeeeeeeeeeeeeeeeeee
// Toggling Menu left right
function toggle(id, action)
{
	//alert("nirmal here");
	el = document.getElementById(id);
	var display = (action) ? '' : 'none';
	el.style.display = display;
}

/*function toggle(id, action)
{
	el = document.getElementById(id);
	//var display = el.style.display ? '' : 'none';
	var display = (action) ? '' : 'none';
	//alert(el.style.display);
	el.style.display = display;
}*/
