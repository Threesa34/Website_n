/****************************************************************/

function isEmpty(s)
{ return ((s == null) || (s.length == 0)) }

/****************************************************************/


function isWhitespace (s) {
    var whitespace = " \\t\\n\\r";
    var i, white;
    var valid=true;
    // Is s empty?
    if (isEmpty(s)) return true;
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

function verifyIP (IPvalue) 
{
	errorString = "";
	theName = "IPaddress";

	var ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
	var ipArray = IPvalue.match(ipPattern);

	if (IPvalue == "0.0.0.0")
	errorString = errorString + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';
	else if (IPvalue == "255.255.255.255")
	errorString = errorString + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';
	if (ipArray == null)
	errorString = errorString + theName + ': '+IPvalue+' is not a valid IP address.';
	else {
	for (i = 0; i < 4; i++) 
	{
	thisSegment = ipArray[i];
	if (thisSegment > 255) {
	errorString = errorString + theName + ': '+IPvalue+' is not a valid IP address.';
	i = 4;
	}
	if ((i == 0) && (thisSegment > 255)) {
	errorString = errorString + theName + ': '+IPvalue+' is a special IP address and cannot be used here.';
	i = 4;
        }

   }
}
extensionLength = 3;
if (errorString == "")
{
//alert ("That is a valid IP address.");
return true;
}
else{
alert (errorString);
return false;
}
}


/****************************************************************/

function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++)
      {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1)
         {
         IsNumber = false;
         }
      }
   return IsNumber;

}
/****************************************************************/

function IsPhone(sText)
{
   var ValidChars = "0123456789-/,";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++)
      {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1)
         {
         IsNumber = false;
         }
      }
   return IsNumber;

}

/****************************************************************/

function confirPasswd(lText,cText)
{
   if(lText != cText) return true;
}
/****************************************************************/
