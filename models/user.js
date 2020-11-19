var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var smtpConfig = {
    host: 'smtp.rediffmailpro.com'
    , port: 587,
    auth: {
        user: 'support@deeptrack.in'
        , pass: 'Deep@123'
    }
};
function user() {
    this.userList = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,(select a.username from user a where a.id = user.supervisor) as supervisorname FROM `user` order by id desc', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.getUserDetails1 = function (userid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,(select a.username from user a where a.id = user.supervisor) as supervisorname FROM `user` where id = '+userid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	this.getSrsDetails = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT `id`,`username`,(SELECT a.username FROM user a WHERE a.id = user.supervisor) as supervisorname,IFNULL(0,(SELECT SUM(ordermaster.netamount) FROM ordermaster WHERE ordermaster.createdby = user.id)) as netamount FROM `user` WHERE userlevel != "HO"', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	/* this.getUserdetails = function (userid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `user` where id = '+userid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    }; */
	
	this.ResetUUID = function (userdata, res) {
        connection.acquire(function (err, con) {
            con.query('UPDATE user SET uuid = NULL WHERE  id = '+userdata[0].id, function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to update user'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'User Update Successfully'
                    });

                }
            });
        });
    };
	
	this.userdelete = function (userid, res) {
        connection.acquire(function (err, con) {
            con.query('delete FROM `user` where id = '+userid, function (err, result) {
                con.release();
                if (err) {
                     res.send({
                        status: 1,
                        message: 'Failed to delete user'
                    });
                } else {
                     res.send({
                        status: 1,
                        message: 'User Deleted Successfully'
                    });

                }
            });
        });
    };
	this.getSupervisordetails = function (userlevel,res) {
        connection.acquire(function (err, con) {
			userlevel = userlevel.replace(/\%20/g," ");
			if(userlevel == 'OFFICE' || userlevel == 'HO' || userlevel == 'SUPERVISOR' || userlevel == 'STOCK MANAGER'|| userlevel == 'SALES EXICUTIVE'|| userlevel == 'ACCOUNT HEAD'|| userlevel == 'COLLECTION MAN')
			{
				var sql = 'SELECT `id`,`username` FROM `user` WHERE `userlevel` = "HO"';
			}
			if(userlevel == 'FIELD')
			{
				var sql = 'SELECT `id`,`username` FROM `user` WHERE `userlevel` = "SUPERVISOR"';
			}
			if(userlevel == 'SHOP MANAGEMENT')
			{
				var sql = 'SELECT `id`,`username` FROM `user` WHERE `userlevel` = "SALES EXICUTIVE"';
			}
            con.query(sql, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.getattendancestatus = function (userid,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `userattendance` WHERE DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE() AND `userid` ='+userid, function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.resetAttendance = function (userid,res) {
		console.log(userid);
        connection.acquire(function (err, con) {
            con.query('UPDATE userattendance set `outaddress` = NULL, outtime	 = NULL,`status` = 1 where `userid` ='+userid+' and DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE()', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.resetAttendanceintime = function (details,res) {
        connection.acquire(function (err, con) {
            var sql = con.query('UPDATE userattendance SET `intime` = "'+details[0].intime+'",`reason` = "'+details[0].reason+'" WHERE `id` = '+details[0].id, function (err, result) {
                con.release();
				
				console.log(sql);
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send({status:0,message:'Intime reset successfully'});

                }
            });
        });
    };
	
	
	this.GetAttendancerecord = function (userid,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT *,(SELECT user.username FROM user WHERE user.id = userattendance.userid) as username FROM `userattendance` where `userid` ='+userid+' and DATE_FORMAT(attdate,"%Y-%m-%d") =  CURDATE()', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	this.userAttendance = function (user, res) {
		console.log(user);
        connection.acquire(function (err, con1) {
	var sql = con1.query('SELECT * FROM `userattendance` WHERE DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE() AND `userid` ='+user.userid, function (err, result1) {
		console.log(sql);
		console.log(err);
			con1.release();
                if (result1!=undefined && result1.length == 0) {
					
					connection.acquire(function (err, con) {
						con.query('INSERT INTO userattendance (`userid`,`attdate`,`intime`,`inaddress`, `status`) SELECT * FROM (SELECT '+user.userid+',CURDATE(),NOW(),"'+user.address+'",1) AS tmp WHERE NOT EXISTS (SELECT userid FROM userattendance WHERE attdate = CURDATE() AND userid = '+user.userid+')', function (err, result) {
							con.release();
							console.log(err);
							if (err) {
								res.send({
									status: 1,
									message: 'Somthing went wrong Your Attendance Not Registred.'
								});
							} else {
								res.send({
									status: 0,
									message: 'Your Attendance Successfully Registred'
								});

                }
            });
            });
					
					
				}
               
				else {
						connection.acquire(function (err, con) {
                    con.query('UPDATE userattendance set `outaddress` = "'+user.address+'", outtime	 = now(),`status` = 0 where `userid` ='+user.userid+' and DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE()', function (err, result) {
							con.release();
							if (err) {
								res.send({
									status: 3,
									message: 'Somthing went wrong Your Out Time Not Registred.'
								});
							} else {
								res.send({
									status: 4,
									message: 'Your Out Time Successfully Registred'
								});
							}
					});
					});
				  }
            });
        });
    };
	
	this.UploadUsers = function (user, res) {
		var ss = '';
							for(var i = 0 ; i < user.length;i++)
							{
								
								if(user[i].DTDS3 == undefined)
								{user[i].DTDS3 = 0;}
								if(user[i].DTDS4 == undefined)
								{user[i].DTDS4 = "N.A.";}
								if(user[i].DTDS5 == undefined)
								{user[i].DTDS5 = 0;}
								if(user[i].DTDS6 == undefined)
								{user[i].DTDS6 = 0;}
								if(user[i].DTDS7 == undefined)
								{user[i].DTDS7 = "N.A.";}
								if(user[i].DTDS8 == undefined)
								{user[i].DTDS8 = 0;}
								if(user[i].DTDS9 == undefined)
								{user[i].DTDS9 = 0;}
								
								
								ss = ss + '("'+user[i].DTDS0+'","'+user[i].DTDS1+'","'+user[i].DTDS2+'","'+user[i].DTDS3+'",'+user[i].DTDS4+','+user[i].DTDS5+',"'+user[i].DTDS6+'","'+user[i].DTDS7+'",'+user[i].DTDS8+'),';
							}
							ss = ss.substr(0, ss.length - 1);
        connection.acquire(function (err, con) {
            con.query('INSERT INTO `user`(`username`, `password`, `fullname`,`address`, `mobile1`, `mobile2`, `email`, `userlevel`, `supervisor`) VALUES '+ss,function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send({
                        status: 1,
                        message: ' User creation failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: ' User created successfully'
                    });

                }
            });
        });
    };
	
	this.createuser = function (user, res) {
		delete user.entityname;
        connection.acquire(function (err, con) {
            con.query('insert into user set ?', user, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send({
                        status: 1,
                        message: ' User creation failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: ' User created successfully'
                    });

                }
            });
        });
    };
	
		this.Edituser = function (user, res) {
			console.log(user);
        connection.acquire(function (err, con) {
            con.query('update user set ? where id = '+user[0].id, user[0], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send({
                        status: 1,
                        message: 'Failed To Update User Details'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: ' User Details Updated Successfully'
                    });

                }
            });
        });
    };

	
	this.authuserOnuuid = function (uuid,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user WHERE uuid = "'+uuid+'"', function (err, result) {
             console.log(err)
                if (err) {
                    res.end('Error querying:' + err + '\n');
                } else {
                    if (result.length < 1) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. User not found.'
                        });
                    } else {
                        console.log('Authenticating User found.');
                       
							var sql = con.query('SELECT * FROM `userattendance` WHERE DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE() AND `userid` ='+ result[0].id, function (err, result1) {
								con.release();
							
								if(result1.length == 0 || result1[0].status == '1')
								{
								 var token = jwt.sign(result[0].username, 'secr3t');
								console.log('Authenticated.');
											
												res.json({
														success: true,
														message: 'Enjoy your token!',
														username: result['0'].username,
														Email: result['0'].email,
														Userlevel: result['0'].userlevel,
														supervisor: result['0'].supervisor,
														fullname: result['0'].fullname,
														mobile1: result['0'].mobile1,
														mobile2: result['0'].mobile2,
														userId: result['0'].id,
														photo: result['0'].photo,
														token: token
												});
								
								}
								else
									{
									console.log("Attendance out");
									res.send({status:404,message:'Your Working Session Has Been Completed , Thank You !'})
								}
							
								
							});
							
                            
                        
                    }
                }
            });
        });
    };
	
	
    this.authuser = function (userdetails,res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user WHERE username = ? AND password = ?', [userdetails.username,userdetails.password], function (err, result) {
             
                if (err) {
                    res.end('Error querying:' + err + '\n');
                } else {
                    if (result.length < 1) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. User not found.'
                        });
                    } else {
                        console.log('Authenticating User found.');
                       
						  
					   if(userdetails.uuid)
					   {
						    if(result[0].uuid == null)
					   {
						    con.query('UPDATE user SET uuid = "'+userdetails.uuid+'" WHERE id = '+result[0].id, function (errupdate, resultupdate) {
								if(errupdate)
								{
									console.log(errupdate)
								}
								else
								{
									
									var sql = con.query('SELECT * FROM `userattendance` WHERE DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE() AND `userid` ='+ result[0].id, function (err, result1) {
								con.release();
							
								if(result1.length == 0 || result1[0].status == '1')
								{
								 var token = jwt.sign(userdetails.username, 'secr3t');
								console.log('Authenticated.');
											
												res.json({
														success: true,
														message: 'Enjoy your token!',
														username: result['0'].username,
														Email: result['0'].email,
														Userlevel: result['0'].userlevel,
														supervisor: result['0'].supervisor,
														fullname: result['0'].fullname,
														mobile1: result['0'].mobile1,
														mobile2: result['0'].mobile2,
														userId: result['0'].id,
														photo: result['0'].photo,
														token: token
												});
								
								}
								else
									{
									console.log("Attendance out");
									res.send({status:404,message:'Your Working Session Has Been Completed , Thank You !'})
								}
							
								
							});
							
									
								}
							});
					   }
					   else
					   {
						  res.send({status:405,message:'User Already LogedIn In Another Device..!'}) 
					   }
					   }
					   else{
							var sql = con.query('SELECT * FROM `userattendance` WHERE DATE_FORMAT(attdate,"%Y-%m-%d") = CURDATE() AND `userid` ='+ result[0].id, function (err, result1) {
								con.release();
							
								if(result1.length == 0 || result1[0].status == '1')
								{
								 var token = jwt.sign(userdetails.username, 'secr3t');
								console.log('Authenticated.');
											
												res.json({
														success: true,
														message: 'Enjoy your token!',
														username: result['0'].username,
														Email: result['0'].email,
														Userlevel: result['0'].userlevel,
														supervisor: result['0'].supervisor,
														fullname: result['0'].fullname,
														mobile1: result['0'].mobile1,
														mobile2: result['0'].mobile2,
														userId: result['0'].id,
														photo: result['0'].photo,
														token: token
												});
								
								}
								else
									{
									console.log("Attendance out");
									res.send({status:404,message:'Your Working Session Has Been Completed , Thank You !'})
								}
							
								
							});
                    }
                }
                }
            });
        });
    };
    
//    FORGOT PASSWORD
    
    this.usercheck = function (usercheck, res) {
    connection.acquire(function (err, con) {
        con.query('select * from user where username like ?', [usercheck], function (err, result) {
            con.release();
            res.send(result);
        });
    });
};   
	  
this.emailcheck = function (usercheck,emailcheck, res) {
    connection.acquire(function (err, con) {
        con.query('select * from user where username like ? AND email like ?', [usercheck,emailcheck], function (err, result) {
            con.release();
            res.send(result);
        });
    });
};
    
    /* forget pwd */
this.forgetpwd = function (user, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT username,password,email FROM user where username = ? AND email = ?', [user.username,user.email], function (err, result) {
           console.log(err);
           if (result.length > 0) {
                var mailTransport = nodemailer.createTransport(smtpConfig);
                
                var mailbodytext = 'Dear ' + result[0].username + ', \n\n  A request was made to send your password for your Sales Force Automation Tool,';
                mailbodytext = mailbodytext + ' Please find below details. \n\n Password :' + result[0].password + '\n\n\ Thank you for contacting US \n\n If you did not ask for your password to be changed, please ignore this Email. \n\n Regards, \n Admin.';
                var mailOptions = {
                    from: "Deeptrack <support@deeptrack.in",
                    to: result[0].email,
                    subject: 'Sales Force Automation (Forgot Password)',
                    text: mailbodytext
                    /* html: <b> Test email with node.js </b>'*/
                };
                mailTransport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log(" Congratulations Mail sent from deeptrack developped  application----" + info.response);
					res.send(info.response);
                });
            }
            con.release();
            
        });
    });
};

    /* 
    this.GetUserDetails = function (userid, res) {
    connection.acquire(function (err, con) {
        con.query('select * from user where id = ?', [userid], function (err, result) {
            con.release();
            res.send(result);
        });
    });
}; */     

    this.UpdateUserProfile = function (field,value,id, res) {
		console.log(field);
		var updtQury = 'UPDATE `user` SET '+field+'="'+value+'" where `userId`='+id;
    connection.acquire(function (err, con) {
        con.query(updtQury, function (err, result) {
            con.release();
            res.send(result);
        });
    });
}; 
  
    /* reste pass */
   this.getuserpsswd = function(oldpassw,username, res) {
	   username.replace(/\"/g,"");
    connection.acquire(function(err, con) {
      con.query('SELECT * FROM user where username = ? and password = ?',[username, oldpassw], function(err, result) {
         con.release();
        res.send(result);
      });
    });
  };

 this.resetuserpsswd = function(userpwd, res) {
	 userpwd.username=userpwd.username.replace(/\"/g,"");
     
	   connection.acquire(function(err, con) {
	   con.query('update user set password = "'+userpwd.newpassw+'" where username = "'+userpwd.username+'"', function(err, result) {
        con.release();	
        if (err) {
          res.send({status: 1, message: 'Sorry, something wrong...'});
        } else {
          res.send({status: 0, message: 'Your Password has been changed...'});
	  
        }
      });
    });
  };
  
  this.userAttendanceList = function(fulldate, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT `id`,`userid`,(select username from user where id = userattendance.userid) as username,`attdate`,`intime`,`inaddress`,`outtime`,`outaddress` FROM `userattendance` WHERE DATE_FORMAT(attdate,"%d-%m-%Y") = "'+fulldate+'"', function(err, result) {
         con.release();
        res.send(result);
      });
    });
  };
  
  this.getAbenceList = function(fulldate, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT user.id,user.username,user.address,user.mobile1 FROM user WHERE user.id NOT in (SELECT userattendance.userid FROM userattendance WHERE DATE_FORMAT(attdate,"%d-%m-%Y") = "'+fulldate+'")', function(err, result) {
         con.release();
		 console.log(err);
        res.send(result);
      });
    });
  };
  
  this.ListDeliveryBoys = function(req, res) {
    connection.acquire(function(err, con) {
      con.query('SELECT `id`,`username` FROM `user` WHERE `userlevel` = "DELIVERY BOY"', function(err, result) {
         con.release();
        res.send(result);
      });
    });
  };

  this.Depolist = function(custtype, res) {
	  if(custtype == 'Distributor')
	  {
		  var depofield = 'DEPO'
	  }
	  else
	  {
		  var depofield = 'DISTRIBUTOR'
	  }
    connection.acquire(function(err, con) {
      con.query('SELECT `id`,`username` as deponame FROM `user` WHERE `userlevel` = "'+depofield+'"', function(err, result) {
         con.release();
        res.send(result);
      });
    });
  };
  
  /*----monisha code--------*/
  
   this.allorderreport = function(res) {
    connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as ordid,DATE_FORMAT(a.orderdate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname,(select taxpercent from products where b.productid=products.id) as taxpercent,(select entityname from entitymaster where a.orderfrom=entitymaster.id) as customername,(select entityname from entitymaster where a.orderfrom=entitymaster.id) as entityname,(select entitytype from entitymaster where a.orderfrom=entitymaster.id) as entitype  from ordermaster a,orderdetails b where a.id=b.orderid',function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 
	  this.orddatesearchreport = function(fromdate,todate,res) {
    connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as ordid,DATE_FORMAT(a.orderdate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname,(select entityname from entitymaster where a.orderfrom=entitymaster.id) as customername,(select entityname from entitymaster where a.orderfrom=entitymaster.id) as entityname,(select entitytype from entitymaster where a.orderfrom=entitymaster.id) as entitype from ordermaster a,orderdetails b where a.id=b.orderid and a.orderdate BETWEEN  ?  AND ? ',[fromdate,todate],function(err, result) {
	   con.release();
	    res.send(result);
      });
	});
	 }
	 
	
		
		this.purdatesearchreport = function(fromdate,todate,vendorid,res) {
    connection.acquire(function(err, con) {
			if(todate == "undefined" && vendorid != "undefined")
			{
			var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and DATE_FORMAT(a.createddate,"%Y-%m-%d") = "'+fromdate+'" and a.vendor = '+vendorid+' order by a.id desc';
			}
			
			if(todate == "undefined" && vendorid == 'undefined')
			{
			var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and DATE_FORMAT(a.createddate,"%Y-%m-%d") = "'+fromdate+'" order by a.id desc';
			}
		
		
			if(todate != 'undefined' && vendorid != 'undefined')
			{
				var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and and a.vendor = '+vendorid+' and (DATE_FORMAT(a.createddate,"%Y-%m-%d") BETWEEN  "'+fromdate+'"  AND "'+todate+'" ) order by a.id desc';
			}
			if(todate != 'undefined' &&  vendorid == 'undefined')
			{
				var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and (DATE_FORMAT(a.createddate,"%Y-%m-%d") BETWEEN  "'+fromdate+'"  AND "'+todate+'") order by a.id desc';
			}
		
		console.log(sql)
		con.query(sql,function(err, result) {
	   con.release();
	    res.send(result);
      });
	});
	 };
		
		
		
		

this.allvendorreports = function(res) {
	  connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid order by a.id desc', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 };
	 
this.GetVendorviseReport = function(vendorid,fromdate,todate,res) {
	  connection.acquire(function(err, con) {
		  
		  if(todate == "undefined" && fromdate == "undefined")
			{
			var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and a.vendor = '+vendorid+' order by a.id desc'
			
			
			}
			
			if(todate == "undefined" && fromdate != 'undefined')
			{
				
				var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid and DATE_FORMAT(a.createddate,"%Y-%m-%d") = "'+fromdate+'" and a.vendor = '+vendorid+' order by a.id desc';
				
			}
		
		
			if(todate != 'undefined' && fromdate != 'undefined')
			{
				var sql= 'select a.*,b.*,a.id as purchaseid,DATE_FORMAT(a.createddate,"%d %b %Y")as doe,(select name from products where b.productid=products.id)as productname,(select name from vendor where id=a.vendor)as vendorname,(select vendor.name from vendor where id=a.vendor)as vendorsrchname from pomaster a,podetails b where a.id=b.poid  and a.vendor = '+vendorid+' and (DATE_FORMAT(a.createddate,"%Y-%m-%d") BETWEEN  "'+fromdate+'"  AND "'+todate+'" ) order by a.id desc';
			}
			
		  
		con.query(sql, function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 };

	 
	 this.productreport = function(res) {
	  connection.acquire(function(err, con) {
		con.query('select * from  products', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 
	 this.salereturnreport = function(res) {
	  connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as saleid,DATE_FORMAT(a.createddate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname from salesreturnmaster a,salesreturndetails b where a.id=b.salesreturnid', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
 this.salereturndatereport = function(fromdate,todate,res) {
	  connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as saleid,DATE_FORMAT(a.createddate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname from salesreturnmaster a,salesreturndetails b where a.id=b.salesreturnid  and a.createddate between ? and ?',[fromdate,todate], function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	  this.purreturnreport = function(res) {
	  connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as purid,DATE_FORMAT(a.createddate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname from poreturnmaster a,poreturndetails b where a.id=b.poreturnid', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 this.purreturndatereport = function(fromdate,todate,res) {
	  connection.acquire(function(err, con) {
		con.query('select a.*,b.*,a.id as purid,DATE_FORMAT(a.createddate,"%d %b %Y") as doe,(select name from products where b.productid=products.id) as productname from poreturnmaster a,poreturndetails b where a.id=b.poreturnid  and a.createddate between ? and ?',[fromdate,todate], function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 
	 
	  this.productsalereport = function(res) {
	  connection.acquire(function(err, con) {
		con.query('select a.orderid, a.productid,a.unitprice,sum(a.qty)as qty,sum(a.netprice)as netprice,b.name,(SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = a.orderid) as ordefrom,(SELECT ordermaster.orderdate FROM ordermaster WHERE ordermaster.id = a.orderid) as doe from products b,orderdetails a where a.productid=b.id AND a.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Distributor")) group by a.productid ', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 
	  this.productsalesrchreport = function(fromdate,todate,res) {
	  connection.acquire(function(err, con) {
		con.query('select a.orderid, a.productid,a.unitprice,sum(a.qty)as qty,sum(a.netprice)as netprice,b.name,(SELECT ordermaster.orderfrom FROM ordermaster WHERE ordermaster.id = a.orderid) as ordefrom,(SELECT ordermaster.orderdate FROM ordermaster WHERE ordermaster.id = a.orderid) as doe from products b,orderdetails a where a.productid=b.id AND a.orderid in (SELECT ordermaster.id FROM ordermaster WHERE ordermaster.orderfrom in (SELECT entitymaster.id FROM entitymaster WHERE entitymaster.entitytype = "Distributor"))   and ordermaster.orderdate between ? and ? group by a.productid',[fromdate,todate], function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 }
	 
	 
	 /* BEAT  */
				
				
				this.Listbeat = function(req,res) {
	  connection.acquire(function(err, con) {
		con.query('select *,(select user.username from user where user.id = beatmaster.userid) as username from beatmaster', function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 };
	 
	 this.getBeatDetails = function(beatid,res) {
	  connection.acquire(function(err, con) {
		con.query('select *,beatmaster.id as beatmasterid , beatdetails.id as beatdetailsid,(select user.username from user where user.id = beatmaster.userid) as user,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = beatdetails.week1) as week1area,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = beatdetails.week2) as week2area from beatmaster,beatdetails WHERE beatmaster.id = '+beatid+' AND beatdetails.beatid = '+beatid, function(err, result) {
	   con.release();
        res.send(result);
      });
	});
	 };
	 
	 this.deleteBeatDetails = function(beatid,res) {
	  connection.acquire(function(err, con) {
		con.query('delete from beatmaster WHERE beatmaster.id = '+beatid+';DELETE FROM `beatdetails` WHERE beatdetails.beatid = '+beatid+';', function(err, result) {
	   con.release();
	   if(err)
	   {
		   res.send({status:0,message:'Something went wrong,Please try again'});
	   }
	   else
	   {
		   res.send({status:1,message:'Record Deleted Successfully'});
	   }
      });
	});
	 };
			
			
			this.SetRgIdForPush = function(regid,res) {
	  connection.acquire(function(err, con) {
		con.query('UPDATE user SET registrationid = "'+regid.registrationId+'" WHERE user.id ='+regid.userid, function(err, result) {
	   con.release();
	   if(err)
	   {
		   res.send({status:0,message:'Something went wrong,Please try again'});
	   }
	   else
	   {
		   res.send({status:1,message:'Record Saved Successfully'});
	   }
      });
	});
	 };
				
				
	  this.AddNewBeat = function(beat,res) {
	  connection.acquire(function(err, con) {
		con.query('INSERT INTO `beatmaster`(`beatname`, `userid`) VALUES (?,?)',[beat[0].beatname,beat[0].beatuserid], function(err, result) {
			if(err)
			{}
			else
			{
				var ss ='';
				for(var i = 0 ; i < beat.length;i++)
				{
					if(beat[i].week1.id)
					{
						beat[i].week1area = beat[i].week1.id;
					}
					else
					{
						beat[i].week1area = 0;
					}
					
					if(beat[i].week2.id)
					{
						beat[i].week2area = beat[i].week2.id;
					}
					else
					{
						beat[i].week2area = 0;
					}
					
				}
				
				for(var i = 0 ; i < beat.length;i++)
				{
					ss=ss+'('+result.insertId+','+beat[i].week1area+','+beat[i].week2area+'),';
				}
				ss = ss.substr(0, ss.length - 1);
				con.query('INSERT INTO `beatdetails`(`beatid`, `week1`, `week2`) VALUES '+ss, function(err1, result) {
					if(err1)
					{
						con.query('delete from `beatmaster` where id = '+result.insertId, function(err, result) {
							con.release();
						});
						res.send({status:1,message:'Failed To Created New Beat'});
					}
					else
					{
						con.release();
						res.send({status:0,message:'New Beat Created Successfully'});
					}
				});
			}
		
      });
	});
	 };
	 

	 this.EdiBeatDetails = function(beat,res) {
	  connection.acquire(function(err, con) {
					
					if(beat[0].user.id)
					{
						beat[0].userid = beat[0].user.id;
					}
				else
				{
					beat[0].userid = beat[0].userid;
				}
				var ss ='';
				for(var i = 0 ; i < beat.length;i++)
				{
					if(beat[i].week1area != null)
					{
						if(beat[i].week1area.id)
						{
							beat[i].week1areaedit = beat[i].week1area.id;
						}
						else
						{
							beat[i].week1areaedit = beat[i].week1;
						}
					}
					if(beat[i].week1area == undefined || beat[i].week1area == '')
					{
						beat[i].week1areaedit = 0;
					}
					
					if(beat[i].week2area != null)
					{
						if(beat[i].week2area.id)
						{
							beat[i].week2areaedit = beat[i].week2area.id;
						}
						else
						{
							beat[i].week2areaedit = beat[i].week2;
						}
					}
					if(beat[i].week2area == undefined || beat[i].week2area == '')
					{
						beat[i].week2areaedit = 0;
					}
				}
				for(var i = 0 ; i < beat.length;i++)
				{
					ss=ss+'UPDATE `beatdetails` SET `week1`='+beat[i].week1areaedit+',`week2`='+beat[i].week2areaedit+' WHERE `beatid` ='+beat[i].beatmasterid+' AND `id` ='+beat[i].beatdetailsid+';';
				}
				ss = ss+'UPDATE `beatmaster` SET `beatname`= "'+beat[0].beatname+'",`userid`='+beat[0].userid+' WHERE `id`='+beat[0].beatmasterid+';';
				console.log(ss);
				con.query(ss, function(err1, result) {
					console.log(err1);
					if(err1)
					{
						con.release();
						res.send({status:1,message:'Failed To Update New Beat'});
					}
					else
					{
						con.release();
						res.send({status:0,message:'New Beat Updated Successfully'});
					}
				});
      });
	
	 };
	 
	 const gcm = require('node-gcm');
		const gcmKey = 'AIzaSyAN6uS6H0kocARyEKshrePbWBmB-bkxZwc'; // Your gcm key in quotes
		const deviceToken = 'dge_--gKPlU:APA91bEK6pa3Ub5EhuMF1L87jDd6yDyu_kbQ09x8c1gpu7GQaeE4QcjdAgSqn7Piirb1bsv5CmQdrb6D40fweLKrppDltZzxuVPltXNgQiBDu_6WxfkwYDtNB0ciUyAgZOIgwq3KJsl4'; // Receiver device token
		const sender = new gcm.Sender(gcmKey);
console.log(sender);
		var message = new gcm.Message();

			message.addData({
				title: "Hello, World",
				icon: "../www/images/Threesa_Logo.png",
				body: "This is a notification that will be displayed if your app is in the background.",
			  otherProperty: true,
			});
		this.SendNotification = function(req,res) {
			sender.send(message,deviceToken, (err,response) => {
			  if (err) {
				console.error(err);
			  }
			  else {
				  console.log(response);
				console.log('Sent');
			  }
			});
		}
}
module.exports = new user();