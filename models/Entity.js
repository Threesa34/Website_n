var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var moment = require('moment');
var smtpConfig = {
    host: 'smtp.rediffmailpro.com'
    , port: 587
    , // secure: false, // use SSL
    auth: {
        user: 'support@deeptrack.in'
        , pass: 'Rudra@123'
    }
};

function entity() {
  
  this.ListCustomersOnZone = function (zoneid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * ,(select areaname from areamaster where areamaster.id = customers.area) as area FROM `customers` WHERE customers.area = '+zoneid+' order by id DESC', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };

	
  this.ListCustomers = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * ,(select areaname from areamaster where areamaster.id = customers.area) as area FROM `customers` order by id desc', function (err, result) {
                con.release();
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
  
  this.UploadCustomers = function (customers, res) {
	  console.log(customers);
        connection.acquire(function (err, con) {
			
			var ss = '';
							for(var i = 0 ; i < customers.length;i++)
							{
								if(customers[i].DTDS1 == undefined){customers[i].DTDS1 = 'N.A.';}
								if(customers[i].DTDS2 == undefined){customers[i].DTDS2 = 'N.A.';}
								if(customers[i].DTDS3 == undefined){customers[i].DTDS3 = 'N.A.';}
								if(customers[i].DTDS4 == undefined){customers[i].DTDS4 = 0;}
								if(customers[i].DTDS5 == undefined){customers[i].DTDS5 = 0;}
								if(customers[i].DTDS6 == undefined){customers[i].DTDS6 = 0;}
								if(customers[i].DTDS7 == undefined){customers[i].DTDS7 = 'N.A.';}
								
								ss = ss + '("'+customers[i].DTDS1+'",'+customers[0].zoneid+',"'+customers[i].DTDS2+'","'+customers[i].DTDS3+'",'+customers[i].DTDS4+','+customers[i].DTDS5+','+customers[i].DTDS6+',"'+customers[i].DTDS7+'",'+customers[0].createdby+'),';
							}
							ss = ss.substr(0, ss.length - 1);
			
            con.query('INSERT INTO `customers`(`name`,`area`, `username`, `address`, `gstin`, `mobile1`, `mobile2`,`email`,`createdby`) VALUES '+ss, function (err, result) {
                con.release();
				console.log(ss);
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
	
	
 
	
	this.getCustomerData = function (customerid, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM `customers` where id = '+customerid, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
        });
    };
	
	
	this.UpdateCustomer = function (customerdetails, res) {
		console.log(customerdetails);
        connection.acquire(function (err, con) {
           con.query('UPDATE `customers` SET ? where id = ?',[customerdetails[0],customerdetails[0].id], function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send({status:1,message:'Failed To Update Customer Details'});
                } else {
                    res.send({status:0,message:'Customer Details Upsdated Successfully'});

                }
            });
        });
    };
  
  this.DeleteCustomer = function (customerid, res) {
        connection.acquire(function (err, con) {
            con.query('DELETE FROM `customers` where id = '+customerid, function (err, result) {
                con.release();
                if (err) {
                    res.send({STATUS:1,message:'Failed to Delete Record'});
                } else {
                     res.send({STATUS:0,message:'Record deleted Successfully'});

                }
            });
        });
    };
  
  this. ListorderFordisgr = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id` FROM `ordermaster` WHERE id NOT IN (SELECT orderid FROM distgrmaster)', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	
	this.Getorderdetails= function (orderid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT ordermaster.orderdate,ordermaster.grossamount,ordermaster.taxamount,ordermaster.netamount,ordermaster.createdby,orderdetails.productid,orderdetails.unitprice,orderdetails.qty,orderdetails.taxpercent,orderdetails.netvalue,ordermaster.id as ordid,orderdetails.id as orddetailsid,(SELECT `name` FROM `products` WHERE `id` = orderdetails.productid) as name FROM `ordermaster`,`orderdetails` where ordermaster.id = '+orderid+' AND orderdetails.orderid = '+orderid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};

	/* customer */
	this.AddNewcustomer= function (customers, res) {
		connection.acquire(function (err, con) {
		
				con.query('insert into customers set ?',customers, function (err, result) {
					con.release();

					if(err)
					{
						res.send({status:1,message:"Failed To Add New Customer"});
					}
					else
					{
						res.send({status:0,message:"New Customer Added Successfully."});
					}
				});
		
		});
		
	};
		/* enquiires */
	this.EnquiryList= function (userid,userlevel, res) {
		connection.acquire(function (err, con) {
					if(userlevel == "HO" || userlevel == "SUPERVISOR")
					{
						var sql = 'SELECT *,(SELECT advertisment.name FROM `advertisment` WHERE advertisment.id = enquiry.advid) as advname,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = enquiry.area) as areaname,(SELECT user.username from user WHERE user.id = enquiry.userid) as username,(SELECT user.username from user WHERE user.id = (SELECT a.supervisor FROM user a WHERE a.id = enquiry.createdby)) as Supervisor,(SELECT user.username from  user WHERE user.id = enquiry.createdby) as createdbyuser,(SELECT CONCAT(plans.name,"_",plans.type,"_",plans.validity) FROM plans WHERE plans.id = enquiry.plan) as planname FROM `enquiry` order by id desc';
					}
					
					
					 else
					{
						var sql = 'SELECT *,(SELECT advertisment.name FROM `advertisment` WHERE advertisment.id = enquiry.advid) as advname,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = enquiry.area) as areaname,(SELECT user.username from user WHERE user.id = enquiry.userid) as username,(SELECT user.username from  user WHERE user.id = enquiry.createdby) as createdbyuser,(SELECT user.username from user WHERE user.id = (SELECT a.supervisor FROM user a WHERE a.id = enquiry.createdby)) as Supervisor,(SELECT CONCAT(plans.name,"_",plans.type,"_",plans.validity) FROM plans WHERE plans.id = enquiry.plan) as planname FROM `enquiry` where createdby = '+userid+' OR (userid = '+userid+' OR enquiry.userid in (SELECT user.id FROM user WHERE user.supervisor = '+userid+')) OR createdby in (SELECT user.id FROM user WHERE user.supervisor = '+userid+') order by id desc';
					} 
				con.query(sql, function (err, result) {
					con.release();
					if(err)
					{}
					else
					{
						res.send(result);
					}
				});
		
		});
	}; 
	
	this.getEnquiryData= function (enquiryid, res) {
		connection.acquire(function (err, con) {
		
				con.query('select *,(CASE WHEN enquiry.approved = "Yes" THEN "Enquiry Approved By Mangement" WHEN enquiry.approved = "No" THEN "Enquiry Rejected From Mangement" ELSE "Pending" END) as approvalstm from enquiry where id = '+enquiryid, function (err, result) {
					con.release();

					if(err)
					{
					}
					else
					{
						res.send(result);
					}
				});
		
		});
	}; 
	
	this.savesenderid= function (senderdetails, res) {
		connection.acquire(function (err, con) {
		
				con.query('INSERT INTO `advsendersids`(`senderid`, `advid`) VALUES (?,?)',[senderdetails.senderid,senderdetails.advid], function (err, result) {
					con.release();

					if(err)
					{
						res.send({status:1,message:'error'});
					}
					else
					{
						res.send({status:0,message:'done'});
					}
				});
		
		});
	}; 
	
	
	this.UpdateEnquiry= function (enquirydetails, res) {
		connection.acquire(function (err, con) {
			delete enquirydetails[0].approvalstm;
			if(enquirydetails[0].username != null)
			{
									enquirydetails[0].connectiondate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
									enquirydetails[0].conectionstats = 1;
					con.query('update enquiry set ? where id = ?',[enquirydetails[0],enquirydetails[0].id], function (err, result) {
					console.log(err);
					if(err)
					{
						res.send({status:1,message:'Failed To Update Enquiry'});
					}
					else
					{
						con.query('INSERT INTO `customers`( `type`, `name`, `username`, `address`, `gstin`, `area`, `mobile1`, `mobile2`, `email`) VALUES (?,?,?,?,?,?,?,?,?)',[enquirydetails[0].type,enquirydetails[0].customername,enquirydetails[0].username,enquirydetails[0].address,enquirydetails[0].gstin,enquirydetails[0].area,enquirydetails[0].mobile1,enquirydetails[0].mobile2,enquirydetails[0].email], function (err, result) {
					con.release();
					console.log(err);
					if(err)
					{
						res.send({status:1,message:'Failed'});
					}
					else
					{
						res.send({status:1,message:'Connection Done..!'});
					}
				});
					}
				});
			}
			else
			{
				delete enquirydetails[0].approvalstm
				delete enquirydetails[0].confirmsts
				con.query('update enquiry set ? where id = ?',[enquirydetails[0],enquirydetails[0].id], function (err, result) {
					con.release();
					console.log(err);
					if(err)
					{
						res.send({status:1,message:'Failed To Update Enquiry'});
					}
					else
					{
						res.send({status:0,message:'Enquiry Updated Succesfully'});
						
						
						
					}
				});
		}
		
		});
	}; 
	
	
	this.DeleteSelectedEnquiry = function(customers,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < customers.length;i++)
			{
				ss =ss+'DELETE FROM `enquiry` WHERE `id` ='+customers[i].id+';';
			}
			console.log(ss);
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Enquiries Deleted Successfully"});
				}
			});
		});
  };
	
	
	this.DeleteEnquiry= function (enquiryid, res) {
		connection.acquire(function (err, con) {
				con.query('delete from enquiry where id = '+enquiryid, function (err, result) {
					con.release();

					if(err)
					{
						res.send({status:1,message:'Failed To Delete Enquiry'});
					}
					else
					{
						res.send({status:0,message:'Enquiry Delete Succesfully'});
					}
				});
		
		});
	}; 
	
	this.AddNewEnquiry= function (customers, res) {
		connection.acquire(function (err, con) {
			
					var gstin = customers.gstin;
						if(customers.username)
						{
							customers.conectionstats = 1;
							customers.connectiondate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
						}
						else
						{
							customers.conectionstats = 0;
						}
						delete customers.gstin;
				con.query('insert into enquiry set ?',customers, function (err, result) {
					
							console.log(err);
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Enquiry"});
					}
					else
					{
						if(customers.username)
						{
							con.query('INSERT INTO `customers`( `type`, `name`, `username`, `address`, `gstin`, `area`, `mobile1`, `mobile2`, `email`) VALUES (?,?,?,?,?,?,?,?,?)',[customers.type,customers.customername,customers.username,customers.address,gstin,customers.area,customers.mobile1,customers.mobile2,customers.email], function (err, result) {
					con.release();

					if(err)
					{
						res.send({status:1,message:"Failed To Add New Enquiry"});
					}
					else
					{
						res.send({status:0,message:"New Connection Added Successfully."});
					}
						});
						
					}
					else
					{
						res.send({status:0,message:"your request has been received, We will contact you shortly."});
					}
					}
				});
		
		});
	}; 

	
	//----------------complaints-----------------------------------
this.AddNewComplaints= function (complaints, res) {
		connection.acquire(function (err, con) {
			console.log(complaints);
			delete complaints.address;
			delete complaints.mobile1;
			delete complaints.customer;
		con.query('INSERT INTO `complaints` set ?',complaints, function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Enquiry"});
					}
					else
					{
						res.send({status:0,message:"New Connection Added Successfully."});
					}
						});
					
					
					
				});
		
		}
		
		this.UpdateComplaint= function (complaints, res) {
		connection.acquire(function (err, con) {
			delete complaints[0].address;
			delete complaints[0].mobile1;
		con.query('UPDATE `complaints` SET ? where id = ?',[complaints[0],complaints[0].id], function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Enquiry"});
					}
					else
					{
						res.send({status:0,message:"New Connection Added Successfully."});
					}
						});
					
					
					
				});
		
		}
		
		
		this.getComplatedataData= function (complaintid, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT *,(select customers.address FROM customers WHERE customers.id = complaints.customerid) as address,(select customers.mobile1 FROM customers WHERE customers.id = complaints.customerid) as mobile1 FROM `complaints` where id ='+complaintid, function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"No Date Found"});
					}
					else
					{
						res.send(result);
					}
						});
					
					
					
				});
		
		}
		
		
		this.complaintList= function (userid,userlevel, res) {
		connection.acquire(function (err, con) {
			
			if(userlevel == 'OFFICE')
			{
				var sql = 'SELECT *,(select customers.username from customers WHERE customers.id = complaints.customerid)as customername ,(select user.username from user WHERE user.id = complaints.userid)as username,(select user.username from user WHERE user.id = complaints.createdby)as createdbyuser,(CASE WHEN issue = "Other" THEN otherissue ELSE issue END) AS issue FROM `complaints` WHERE complaints.createdby = '+userid+' order by id desc'
			}
			if(userlevel == 'SUPERVISOR')
			{
				var sql = 'SELECT *,(select customers.username from customers WHERE customers.id = complaints.customerid)as customername ,(select user.username from user WHERE user.id = complaints.userid)as username,(select user.username from user WHERE user.id = complaints.createdby)as createdbyuser,(CASE WHEN issue = "Other" THEN otherissue ELSE issue END) AS issue FROM `complaints` WHERE complaints.createdby IN (SELECT user.id FROM user WHERE user.supervisor = '+userid+') OR complaints.createdby = '+userid+' OR complaints.userid = '+userid+' order by id desc'
			}
			if(userlevel == 'FIELD')
			{
				var sql = 'SELECT *,(select customers.username from customers WHERE customers.id = complaints.customerid)as customername ,(select user.username from user WHERE user.id = complaints.userid)as username,(select user.username from user WHERE user.id = complaints.createdby)as createdbyuser,(CASE WHEN issue = "Other" THEN otherissue ELSE issue END) AS issue FROM `complaints` WHERE complaints.createdby = '+userid+' OR complaints.userid = '+userid+' order by id desc'
			}
			else
			{
				var sql = 'SELECT *,(select customers.username from customers WHERE customers.id = complaints.customerid)as customername ,(select user.username from user WHERE user.id = complaints.userid)as username,(select user.username from user WHERE user.id = complaints.createdby)as createdbyuser,(CASE WHEN issue = "Other" THEN otherissue ELSE issue END) AS issue FROM `complaints` order by id desc'
			}
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
            }); 
	};
	
	this.DeleteSeletectedComplaints = function(complaints,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < complaints.length;i++)
			{
				ss =ss+'DELETE FROM `complaints` WHERE `id` ='+complaints[i].id+';';
			}
			console.log(ss);
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected Complaints Deleted Successfully"});
				}
			});
		});
  };
  
  
  this.DeleteComplaint = function(complaintid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('DELETE FROM `complaints` WHERE `id` ='+complaintid,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Complaint Deleted Successfully"});
				}
			});
		});
  };
  
  /* employee */
  this.ListEmployee = function(req,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT `id`,`name`,`address`,`mobile1`,`mobile2`,(SELECT shiftmaster.shiftname FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as workingshift,(SELECT shiftmaster.intime FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as intime,(SELECT shiftmaster.outtime FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as outtime FROM `employeemaster` order by id desc',function(err, result){
				con.release();
			  if(err)
			  {
				 res.send('no data Found');
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
	this.getEmployeeData = function(empid,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT *,(select user.username from user where user.empid = employeemaster.id) as username,(select user.password from user where user.empid = employeemaster.id) as password,(select user.userlevel from user where user.empid = employeemaster.id) as userlevel,(select user.supervisor from user where user.empid = employeemaster.id) as supervisor FROM `employeemaster` where id ='+empid,function(err, result){
				con.release();
				console.log(err);
			  if(err)
			  {
				 res.send('no data Found');
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.DeleteEmployee = function(empid,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `employeemaster` where id ='+empid,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({message:"Something Went Wrong ! Please Try Again",status:0});
			  }
				else
				{
					con.query('delete FROM `user` where empid ='+empid,function(err, result){
						if(err)
						{}
					else
					res.send({message:"Record Deleted Sucessfully",status:1});
				});
				
				}
			});
		});
  };
	
	/* salary */
	
	
	/* "select MONTH('"+month+"') as month,user.id,user.username,user.fullname,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Network Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES EXICUTIVE' ELSE 'Back Office' END) as designation,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES' ELSE 'Management' END) as department,day(last_day('"+month+"')) as workingdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))) as presentdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))) as halfdays,IFNULL((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid),0) as salary,(SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) as thursdays,(SELECT employeemaster.joindate FROM employeemaster WHERE employeemaster.id = user.empid) as joiningdate,IFNULL(ROUND(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))),2),0) as perdaysal,IFNULL(ROUND((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) +(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))))+ ((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))))/ 2)),2),0) as totalsal,IFNULL((SELECT SUM(advancepayment.amt) FROM advancepayment WHERE advancepayment.userid = user.id AND MONTH(advancepayment.paymentmonth) = MONTH('"+month+"')),0) as advance,IFNULL((SELECT SUM(loan.monthlyamt) FROM loan WHERE loan.userid = user.id AND loan.loanamt > 0),0) as loaninst,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') and (DATE_FORMAT(userattendance.intime,'%h:%i %p')) BETWEEN (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 0 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))  and (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 1 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))) as Latemarks FROM user" */
	
	this.GetEmployeeSalary = function(month,res)
	{ 			
		connection.acquire(function(err, con) {
			
			con.query("select MONTH('"+month+"') as month,user.id,user.fullname,day(last_day('"+month+"')) as workingdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))) as presentdays,IFNULL((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid),0) as salary FROM user",function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({message:"no dat Found",status:0});
			  }
				else
				{
					res.send(result);
				
				}
			});
		});
  };

  
	this.getemployeesalaryOnemployee = function(userid,month,res)
	{ 			
	  console.log("------------------------");
	  console.log(userid+" , "+month);
		connection.acquire(function(err, con) {
			
			con.query("select MONTH('"+month+"') as month,user.id,user.username,user.fullname,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Network Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES EXICUTIVE' ELSE 'Back Office' END) as designation,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES' ELSE 'Management' END) as department,day(last_day('"+month+"')) as workingdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))) as presentdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))) as halfdays,IFNULL((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid),0) as salary,(SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) as thursdays,(SELECT employeemaster.joindate FROM employeemaster WHERE employeemaster.id = user.empid) as joiningdate,IFNULL(ROUND(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))),2),0) as perdaysal,IFNULL(ROUND((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) +(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))))+ ((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))))/ 2)),2),0) as totalsal,IFNULL((SELECT SUM(advancepayment.amt) FROM advancepayment WHERE advancepayment.userid = user.id AND MONTH(advancepayment.paymentmonth) = MONTH('"+month+"')),0) as advance,IFNULL((SELECT SUM(advancepayment.cut_amt) FROM advancepayment WHERE advancepayment.userid = user.id AND MONTH(advancepayment.paymentmonth) = MONTH('"+month+"')),0) as payamt,IFNULL((SELECT SUM(loan.monthlyamt) FROM loan WHERE loan.userid = user.id AND loan.loanamt > 0),0) as loaninst,(IFNULL((SELECT `travel_exp` FROM `expense` WHERE expense.userid = user.id),0)) as travel_exp,(IFNULL((SELECT expense.mobile_exp FROM expense WHERE expense.userid = user.id),0)) as mobile_exp,(IFNULL((SELECT expense.other_exp FROM expense WHERE expense.userid = user.id),0)) as other_exp,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') and (DATE_FORMAT(userattendance.intime,'%h:%i %p')) BETWEEN (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 0 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))  and (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 1 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))) as Latemarks FROM user where user.id = "+userid,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({message:"no dat Found",status:0});
			  }
				else
				{
					res.send(result);
				
				}
			});
		});
  };
  
  
  this.getAttendanceDetailsOfUser = function(month,userid,res)
	{ 			
		connection.acquire(function(err, con) {
			
			var sql = "select MONTH('"+month+"') as month,(SELECT DATE_ADD(shiftmaster.intime, INTERVAL 0 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) as stime,user.id,user.username,user.fullname,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Network Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES EXICUTIVE' ELSE 'Back Office' END) as designation,(CASE WHEN user.userlevel = 'FIELD' || user.userlevel = 'SUPERVISOR' THEN 'Engineer' WHEN user.userlevel ='SALES EXICUTIVE' THEN 'SALES' ELSE 'Management' END) as department,day(last_day('"+month+"')) as workingdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))) as presentdays,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))) as halfdays,IFNULL((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid),0) as salary,(SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) as thursdays,(SELECT employeemaster.joindate FROM employeemaster WHERE employeemaster.id = user.empid) as joiningdate,IFNULL(ROUND(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))),2),0) as perdaysal,IFNULL(ROUND((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE DAYNAME(userattendance.attdate) = 'Thursday' AND userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL) +(((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND userattendance.outtime IS NOT NULL and DATE_FORMAT(userattendance.intime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) AND DATE_FORMAT(userattendance.outtime, '%H:%i %p') >= (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid))))+ ((((SELECT employeemaster.salary FROM employeemaster WHERE employeemaster.id = user.empid) / day(last_day('"+month+"'))) * (SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') AND(userattendance.outtime IS NULL OR DATE_FORMAT(userattendance.intime, '%H:%i %p') > (SELECT DATE_FORMAT(shiftmaster.intime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)) OR DATE_FORMAT(userattendance.outtime, '%H:%i %p') < (SELECT DATE_FORMAT(shiftmaster.outtime, '%H:%i %p') FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)))))/ 2)),2),0) as totalsal,IFNULL((SELECT SUM(advancepayment.amt) FROM advancepayment WHERE advancepayment.userid = user.id AND MONTH(advancepayment.paymentmonth) = MONTH('"+month+"')),0) as advance,IFNULL((SELECT SUM(advancepayment.cut_amt) FROM advancepayment WHERE advancepayment.userid = user.id AND MONTH(advancepayment.paymentmonth) = MONTH('"+month+"')),0) as payamt,IFNULL((SELECT SUM(loan.monthlyamt) FROM loan WHERE loan.userid = user.id AND loan.loanamt > 0),0) as loaninst,(IFNULL((SELECT `travel_exp` FROM `expense` WHERE expense.userid = user.id),0)) as travel_exp,(IFNULL((SELECT expense.mobile_exp FROM expense WHERE expense.userid = user.id),0)) as mobile_exp,(IFNULL((SELECT expense.other_exp FROM expense WHERE expense.userid = user.id),0)) as other_exp,(SELECT COUNT(*) FROM userattendance WHERE userattendance.userid = user.id AND MONTH(userattendance.attdate) = MONTH('"+month+"') and (DATE_FORMAT(userattendance.intime,'%h:%i %p')) BETWEEN (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 0 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))  and (SELECT DATE_FORMAT((SELECT DATE_ADD(shiftmaster.intime,INTERVAL 1 HOUR) FROM shiftmaster WHERE shiftmaster.id = (SELECT employeemaster.shiftid FROM employeemaster WHERE employeemaster.id = user.empid)),'%h:%i %p'))) as Latemarks FROM user where user.id = "+userid;
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({message:"no dat Found",status:0});
			  }
				else
				{
					res.send(result);
				
				}
			});
		});
  };
	
  
  
  
  
  this.UploadEmployee = function (user, res) {
		var ss = '';
		var ss1 = '';
		  connection.acquire(function (err, con) {
			  
			   con.query('SELECT id FROM `employeemaster` ORDER BY id DESC limit 1',function (err, lastid) {
			  
							if(lastid[0] != undefined)
								var lastempid = lastid[0].id;
							else
								var lastempid = 0;
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
								{user[i].DTDS9 = '';}
							if(user[i].DTDS10 == undefined)
								{user[i].DTDS10 = '';}
							if(user[i].DTDS11 == undefined)
								{user[i].DTDS11 = 0;}
							}
							for(var i = 0 ; i < user.length;i++)
							{
								var empid = parseInt(lastempid)+parseInt(i)+1;
				ss1 = ss1+'("'+user[i].DTDS2+'","'+user[i].DTDS3+'",'+user[i].DTDS4+','+user[i].DTDS5+',"'+user[i].DTDS6+'",'+user[i].DTDS11+',"'+user[i].DTDS10+'","'+user[i].DTDS9+'",'+user[0].createdby+'),'
								
				ss = ss+'("'+user[i].DTDS0+'","'+user[i].DTDS1+'","'+user[i].DTDS2+'","'+user[i].DTDS3+'",'+user[i].DTDS4+','+user[i].DTDS5+',"'+user[i].DTDS6+'","'+String(user[i].DTDS7).toUpperCase()+'",'+user[i].DTDS8+','+empid+'),';
							}
							
							ss = ss.substr(0, ss.length - 1);
							ss1 = ss1.substr(0, ss1.length - 1);
							
							 con.query('INSERT INTO `employeemaster`(`name`, `address`, `mobile1`, `mobile2`, `email`, `salary`, `joindate`, `dob`,`createdby`) VALUES '+ss1,function (err, result) {
								 console.log(err);
								if(err)
								{
									
								}
								else
								{
									
									con.query('INSERT INTO `user`(`username`, `password`, `fullname`,`address`, `mobile1`, `mobile2`, `email`, `userlevel`, `supervisor`,`empid`) VALUES '+ss,function (err, result) {
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
								}
							
							 });
							
								
							
        });
        });
    };
  
	
		/* ADVANCE PAYMENT */
	
	this.ListAdvancepayment = function(userid,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT *,(SELECT SUM(advancepayment.amt) - (SELECT SUM(a.cut_amt) FROM advancepayment a WHERE DATE_FORMAT(a.paymentmonth,"%m-%Y") >= DATE_FORMAT(CURDATE(),"%m-%Y") AND a.userid = '+userid+') FROM advancepayment WHERE advancepayment.userid = '+userid+') as advancebal,(SELECT SUM(loan.loanamt) - (SELECT SUM(l.monthlyamt) FROM loan l WHERE DATE_FORMAT(l.instmonth,"%m-%Y") >= DATE_FORMAT(CURDATE(),"%m-%Y") AND l.userid = '+userid+') FROM loan WHERE loan.userid = '+userid+') as loadnbal,MONTHNAME(paymentmonth) as month FROM `advancepayment` WHERE `userid` ='+userid+' order by id desc',function(err, result){
				console.log(err)
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.GetAdvancepayment = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT *,(SELECT SUM(advancepayment.amt) - (SELECT SUM(a.cut_amt) FROM advancepayment a WHERE DATE_FORMAT(a.paymentmonth,"%m-%Y") >= DATE_FORMAT(CURDATE(),"%m-%Y") AND a.userid = user.id) FROM advancepayment WHERE advancepayment.userid = user.id) as advancebal,(SELECT SUM(loan.loanamt) - (SELECT SUM(l.monthlyamt) FROM loan l WHERE DATE_FORMAT(l.instmonth,"%m-%Y") >= DATE_FORMAT(CURDATE(),"%m-%Y") AND l.userid = user.id) FROM loan WHERE loan.userid = user.id) as loadnbal FROM `advancepayment` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.DeleteAdvancepayment = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('DELETE FROM `advancepayment` WHERE `id` ='+id,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				  res.send({status:0,message:'Failed To Delete Record'});
				 
			  }
				else
				{
					con.release();
				  res.send({status:1,message:'Record Deleted Successfully'});
				}
			});
		});
  };

 
  
  
  this.AddAdvancePayment = function(details,res)
	{ 			
			console.log(details);
		if(details[0].id)	
		{
			var sql = 'UPDATE `advancepayment` SET `userid`= '+details[0].userid+',`paymentmonth`= "'+moment(details[0].paymentmonth).format("YYYY-MM-DD HH:mm:ss")+'",`amt`= '+details[0].amt+',`cut_amt`= '+details[0].cut_amt+' WHERE `id`= '+details[0].id;
		}
		else
		{
			if(details[0].cut_amt == undefined)
			{
				details[0].cut_amt = '0';
			}
			var sql ='INSERT INTO `advancepayment`(`userid`, `paymentmonth`, `amt`,`cut_amt`, `createdby`) VALUES ('+details[0].userid+',"'+moment(details[0].paymentmonth).format("YYYY-MM-DD HH:mm:ss")+'",'+details[0].amt+','+details[0].cut_amt+','+details[0].createdby+')';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
    this.SaveLoandetails = function(details,res)
	{ 			
		if(details[0].id)	
		{
			var sql = 'UPDATE `loan` SET `userid`= '+details[0].userid+',`loanamt`='+details[0].loanamt+',`installments`='+details[0].installments+',`monthlyamt`='+details[0].monthlyamt+',`instmonth`= "'+moment(details[0].instmonth).format("YYYY-MM-DD HH:mm:ss")+'" WHERE `id` = '+details[0].id;
		}
		else
		{
			var sql ='INSERT INTO `loan`(`userid`, `loanamt`, `installments`, `monthlyamt`, `instmonth`, `createdby`) VALUES ('+details[0].userid+',"'+details[0].loanamt+'",'+details[0].installments+','+details[0].monthlyamt+',"'+moment(details[0].instmonth).format("YYYY-MM-DD HH:mm:ss")+'",'+details[0].createdby+')';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Something Went Wrong, Please try Again'});
			  }
				else
				{
					 con.release();
				 res.send({status:1,message:'Operation Completed Successfully !'});
				}
			});
		});
  };
  
   this.ListLoan = function(userid,userlevel,res)
	{ 				
		connection.acquire(function(err, con) {
			
			if(userlevel == "HO")
			{
				var sql = 'SELECT *,(select fullname from user where user.id = loan.userid) as employee,MONTHNAME(instmonth) as month FROM `loan` order by `id` desc';
			}
			else
			{
				var sql = 'SELECT *,(select fullname from user where user.id = loan.userid) as employee,MONTHNAME(instmonth) as month FROM `loan` WHERE userid ='+userid+' order by `id` desc';
			}
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.getLoanData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT * FROM `loan` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.DeleteLoanData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `loan` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Record Deleted Sucessfully'});
				}
			});
		});
  };
  

  this.AuthenticateAdmin = function(userlevel,password,res)
	{ 			
console.log(userlevel+"-------")
		if(userlevel === 'HO')
		{
		connection.acquire(function(err, con) {
			
			con.query('SELECT `id`,`userlevel` FROM `user` WHERE `extsec` = "'+password+'" and userlevel = "HO"',function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:1,message:'Something went wrong, Pleas try again.'});
			  }
				else
				{
					con.release();
					console.log(result);
					if(result.length == 1 && result[0].userlevel == 'HO')
					{
						res.send({status:0,message:'Authenticate Sucessfully'});
					}
					else
					{
						 res.send({status:1,message:'You are not a admin user.'});
					}
				}
			});
		});
		}
		else
		{
			 res.send({status:1,message:'You are not a admin user.'});
		}
  };
  
  /* Rules */
  
  this.SaveRules = function(details,res)
	{ 			
	console.log(details);
		if(details[0].id)	
		{
			var sql = 'UPDATE `rulesmaster` SET `rule`= "'+details[0].rule+'" WHERE `id` = '+details[0].id;
		}
		else
		{
			var sql ='INSERT INTO `rulesmaster`(`rule`, `createdby`) VALUES  ("'+details[0].rule+'",'+details[0].createdby+')';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Something Went Wrong, Please try Again'});
			  }
				else
				{
					 con.release();
				 res.send({status:1,message:'Operation Completed Successfully !'});
				}
			});
		});
  };

  
  this.ListRules = function(req,res)
	{ 				
		connection.acquire(function(err, con) {
			var sql = 'SELECT * FROM `rulesmaster` order by id desc';
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.getRules = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT * FROM `rulesmaster` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.DeleteRules = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `rulesmaster` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Record Deleted Sucessfully'});
				}
			});
		});
  };
  
  
  /* vendror Payments */
  
  this.SaveVendorPayments = function(details,res)
	{ 			
	console.log(details);
		if(details[0].id)	
		{
			var sql = 'UPDATE `vendorpayment` SET `vendor`= "'+details[0].vendor+'",`paymentdate`="'+moment(details[0].paymentdate).format("YYYY-MM-DD HH:mm:ss")+'",`amount`='+details[0].amount+' WHERE `id` = '+details[0].id;
		}
		else
		{
			var sql ='INSERT INTO `vendorpayment`(`vendor`, `amount`, `paymentdate`, `createdby`) VALUES ("'+details[0].vendor+'",'+details[0].amount+',"'+moment(details[0].paymentdate).format("YYYY-MM-DD HH:mm:ss")+'",'+details[0].createdby+')';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Something Went Wrong, Please try Again'});
			  }
				else
				{
					 con.release();
				 res.send({status:1,message:'Operation Completed Successfully !'});
				}
			});
		});
  };

  
  this.ListVendorpayment = function(userid,userlevel,res)
	{ 				
		connection.acquire(function(err, con) {
			
			 if(userlevel == "HO")
			{
				var sql = 'SELECT *,(select vendor.name from vendor where vendor.id = vendorpayment.vendor) as vendor FROM `vendorpayment` order by id desc';
			}
			else
			{
				var sql = 'SELECT *,(select vendor.name from vendor where vendor.id = vendorpayment.vendor) as vendor  FROM `vendorpayment` where createdby ='+userid+' order by id desc';
			} 
			
			
			
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.getVendorpayment = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT * FROM `vendorpayment` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.DeleteVendorpayment = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `vendorpayment` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Record Deleted Sucessfully'});
				}
			});
		});
  };
  

  /* Shift */
  
  this.SaveShiftdetails = function(details,res)
	{ 			
	console.log(details);
		if(details[0].id)	
		{
			var sql = 'UPDATE `shiftmaster` SET `shiftname`= "'+details[0].shiftname+'",`intime`="'+details[0].intime+'",`outtime`="'+details[0].outtime+'" WHERE `id` = '+details[0].id;
		}
		else
		{
			var sql ='INSERT INTO `shiftmaster`(`shiftname`, `intime`, `outtime`) VALUES ("'+details[0].shiftname+'","'+details[0].intime+'","'+details[0].outtime+'")';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Something Went Wrong, Please try Again'});
			  }
				else
				{
					 con.release();
				 res.send({status:1,message:'Operation Completed Successfully !'});
				}
			});
		});
  };
  
   this.ListShifts = function(userid,userlevel,res)
	{ 				
		connection.acquire(function(err, con) {
			
			/* if(userlevel == "HO")
			{
				
			}
			else
			{
				var sql = 'SELECT employeemaster.id,employeemaster.name,(SELECT shiftmaster.shiftname FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as shiftname,(shiftmaster.intime FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as intime,(shiftmaster.outtime FROM shiftmaster WHERE shiftmaster.id = employeemaster.shiftid) as outtime from employeemaster';
			} */
			
			var sql = 'SELECT * FROM `shiftmaster` order by id desc';
			
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.getShiftData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT * FROM `shiftmaster` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
  
  this.DeleteShiftData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `shiftmaster` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Record Deleted Sucessfully'});
				}
			});
		});
  };
  
  
  this.setShiftTime = function(data,res)
	{ 				
			var ss='';
		connection.acquire(function(err, con) {
			
			for(var i = 0 ; i < data.length;i++)
			{
				ss = ss+'UPDATE employeemaster SET shiftid = '+data[0].shiftid+' WHERE employeemaster.id =' +data[i].id+';';
			}
			
			con.query(ss,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Set Shift Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Shift Seted Sucessfully'});
				}
			});
		});
  };


  this.DeletedbulkEmployee = function(data,res)
	{ 				
			var ss='';
			var ss1='';
		connection.acquire(function(err, con) {
			
			for(var i = 0 ; i < data.length;i++)
			{
				ss = ss+'DELETE FROM `employeemaster` WHERE employeemaster.id =' +data[i].id+';';
			}
			
			for(var i = 0 ; i < data.length;i++)
			{
				ss1 = ss1+'DELETE FROM `user` WHERE employeemaster.empid =' +data[i].id+';';
			}
			
			con.query(ss,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
				con.query(ss,function(err, result){
					if(err)
					{
						 con.release();
					}
					else
						res.send({status:0,message:'Record Deleted Sucessfully'});
				});
				}
			});
		});
  };
  
  /* Expense */
  
   this.Addexpense = function(details,res)
	{ 			
		
		if(details[0].id)	
		{
			var sql = 'UPDATE `expense` SET `userid`= '+details[0].userid+',`travel_exp`='+details[0].travel_exp+',`mobile_exp`='+details[0].mobile_exp+',`other_exp`='+details[0].other_exp+' WHERE `id` = '+details[0].id;
		}
		else
		{
			if(details[0].travel_exp == undefined)
			{
				details[0].travel_exp = '0';
			}
			if(details[0].mobile_exp == undefined)
			{
				details[0].mobile_exp = '0';
			}
			if(details[0].other_exp == undefined)
			{
				details[0].other_exp = '0';
			}
			var sql ='INSERT INTO `expense`(`userid`, `travel_exp`, `mobile_exp`,`other_exp`, `createdby`) VALUES ('+details[0].userid+','+details[0].travel_exp+','+details[0].mobile_exp+','+details[0].other_exp+','+details.createdby+')';
		}
		connection.acquire(function(err, con) {
			
			con.query(sql,function(err, result){
				console.log(err);
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Something Went Wrong, Please try Again'});
			  }
				else
				{
					 con.release();
				 res.send({status:1,message:'Operation Completed Successfully !'});
				}
			});
		});
  };
  
   this.ListExpense = function(userid,userlevel,res)
	{ 				
		connection.acquire(function(err, con) {
			
			if(userlevel == "HO")
			{
				var sql = 'SELECT *,(select fullname from user where user.id = expense.userid) as employee FROM `expense` order by `id` desc';
			}
			else
			{
				var sql = 'SELECT *,(select fullname from user where user.id = expense.userid) as employee FROM `expense` WHERE userid ='+userid+' order by `id` desc';
			}
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.getExpenseData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('SELECT * FROM `expense` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };

  this.resetFile = function(filetype,empid,res)
	{ 	

		 connection.acquire(function(err, con) {
			if(filetype == 'profile')
				var sql = 'UPDATE employeemaster SET employeemaster.photo = NULL WHERE employeemaster.id = '+empid;
			if(filetype == 'uid')
				var sql = 'UPDATE employeemaster SET employeemaster.aadhar = NULL WHERE employeemaster.id = '+empid;
			if(filetype == 'resume')
				var sql = 'UPDATE employeemaster SET employeemaster.resume = NULL WHERE employeemaster.id = '+empid;
			con.query(sql,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 
			  }
				else
				{
					res.send(result);
				}
			});
		}); 
  };
  
  this.DeleteExpenseData = function(id,res)
	{ 				
		connection.acquire(function(err, con) {
			
			con.query('delete FROM `expense` WHERE `id` ='+id,function(err, result){
				
			  if(err)
			  {
				  con.release();
				 res.send({status:0,message:'Failed To Delete Record'});
			  }
				else
				{
					con.release();
				 res.send({status:0,message:'Record Deleted Sucessfully'});
				}
			});
		});
  };
  
 //----------------Collection-----------------------------------
this.AddNewCollection= function (collection, res) {
		connection.acquire(function (err, con) {
		con.query('INSERT INTO `collection` set ?',collection, function (err, result) {
					con.release();
					console.log(err);
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Collection"});
					}
					else
					{
						res.send({status:1,message:"Record inserted successfully",'indertedid':result.insertId});
					}
						});
					
					
					
				});
		
		}
		
		this.UpdateCollection= function (collection, res) {
		connection.acquire(function (err, con) {
			if(collection[0].zonename.id)
			{
				collection[0].zoneid = collection[0].zonename.id
			}
			else
			{
				collection[0].zoneid = collection[0].zoneid;
			}
			delete collection[0].zonename;
		con.query('UPDATE `collection` SET ? where id = ?',[collection[0],collection[0].id], function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Update record"});
					}
					else
					{
						res.send({status:0,message:"record Upadetd Successfully."});
					}
						});
					
					
					
				});
		
		}
		
		
		this.getCollectiondataData= function (collectionid, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT *,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = collection.zoneid) as zonename,collection.customerid FROM `collection` where id = '+collectionid, function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"No Date Found"});
					}
					else
					{
						res.send(result);
					}
						});
					
					
					
				});
		
		}
		
		/* this.customerget= function (collectionid, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT *,(select customers.address FROM customers WHERE customers.id = collection.customerid) as address,(select customers.mobile1 FROM customers WHERE customers.id = collection.customerid) as mobile1,(select customers.username FROM customers WHERE customers.id = collection.customerid) as username ,(select customers.email FROM customers WHERE customers.id = collection.customerid) as email,(select user.fullname FROM user WHERE user.id = collection.createdby) as receivedby FROM `collection` where id ='+collectionid, function (err, result) {
					 con.release();
		
		
        res.send(result);
		 var mailTransport = nodemailer.createTransport(smtpConfig);
 
				var content = "<div><center><table class=table style=padding:5px;><tr><td  colspan=4><center><h2>Threesa Infoway Pvt Ltd</h2></center><center><h4>Shop No 4, 1st Floor, Anand Ram Laghu Sankul, Near Siddhanchal Phase V, Vasant Vihar, Thane(W)</h4></center></td></tr><tr style=white-space:nowrap;><td>Receipt No. :</td><td>"+result[0].receiptno+"</td><td>Receipt Date :</td><td>"+result[0].createddate+"</td></tr><tr style=white-space:nowrap;><td>Customer Name :</td><td>"+result[0].username+"</td><td>Address :</td><td>"+result[0].address+"</td></tr><tr style=white-space:nowrap;><td>Mobile No. :</td><td>"+result[0].mobile1+"</td><td>Payment Mode :</td><td>"+result[0].paymentmode+"</td></tr><tr style=white-space:nowrap;><td>Cheque No. :</td><td>"+result[0].chqno+"</td><td>Amount in word :</td><td>"+result[0].amount+"</td></tr><tr style=white-space:nowrap;><td colspan=2 style=float:right;><h4>&#8377;</h4></td><td class=text-right><h4>"+result[0].amount+"</h4></td><td>Amount in Received By :</td><td>"+result[0].receivedby+"</td></tr> </table></center></div>"
                var email =result.email;
                var mytext = "";
               mailOptions = {
                    from:"Threesa Infoway"<'mhatremayur2520@gmail.com'
                    , to: result[0].email
					,cc: 'ajgaonkarmansi20@gmail.com'
                    , subject: "Receipt from Payment"
                    , text: mytext
                 
                    ,  html: content
                };

                mailTransport.sendMail(mailOptions, function (error, info) {
            
                    if (error) {
                        return console.log(error);
                        
                    }
                    else {
                        console.log(" mail send successfully----" + info.response);  
						
                    }

                });
      });
					
					
					
				});
		
		} */
		
		
		this.collectionList= function (userid,userlevel, res) {
		connection.acquire(function (err, con) {
		var userlevel1 = userlevel.replace("%20", " ");
		console.log(userlevel);
			if(userlevel1 == 'HO')
			{
				var sql = 'SELECT *,collection.customerid as customername ,(select user.username from user WHERE user.id = collection.createdby)as createdbyuser FROM `collection` order by id desc'
			}			
			else
			{
				var sql = 'SELECT *,collection.customerid as customername ,(select user.username from user WHERE user.id = collection.createdby)as createdbyuser FROM `collection` WHERE collection.createdby = '+userid+' order by id desc'
			}
			
            con.query(sql, function (err, result) {
                con.release();
				console.log(err);
                if (err) {
                    res.send('No data Found');
                } else {
                    res.send(result);

                }
            });
            }); 
	};
	
	this.GetLastRecieptOnZone = function(zoneid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT CONCAT("Last Book No.had Allocate :",receiptbook.bookno) AS bookno,(CASE WHEN IFNULL((SELECT receiptno FROM collection WHERE collection.zoneid = '+zoneid+' ORDER BY receiptno DESC LIMIT 1),0) = 0 THEN (receiptbook.bookno * 100) WHEN IFNULL((SELECT receiptno FROM collection WHERE collection.zoneid = '+zoneid+' ORDER BY receiptno DESC LIMIT 1),0) != 0 THEN (SELECT receiptno FROM collection WHERE collection.zoneid = '+zoneid+' ORDER BY receiptno DESC LIMIT 1) ELSE 0 END) as receiptno FROM receiptbook WHERE receiptbook.zoneid = '+zoneid+' ORDER BY id DESC',function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"no data found"});
			  }
				else
				{
					if(result.length > 0)
					{
						res.send(result);
					}
					else
					{
						result.push({'bookno':'No Book Allocate for this Zone.'});
						res.send(result);
					}
				}
			});
		});
  };
  
  this.DeleteSeletectedCollection = function(collection,res)
	{ 				
	   var ss= '';
		connection.acquire(function(err, con) {
			for(var i = 0 ; i < collection.length;i++)
			{
				ss =ss+'DELETE FROM `collection` WHERE `id` ='+collection[i].id+';';
			}
			console.log(ss);
			con.query(ss,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"Selected collection Deleted Successfully"});
				}
			});
		});
  };
  
  
  this.DeleteCollection = function(colectionid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('DELETE FROM `collection` WHERE `id` ='+colectionid,function(err, result){
			con.release();
			  if(err)
			  {
				 res.send({status:1,message:"Something Went Wrong. Please Try Again"});
			  }
				else
				{
					res.send({status:0,message:"collection Deleted Successfully"});
				}
			});
		});
  };
 
  this.CheckEmpExistInExpence = function(empid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT * FROM `expense` WHERE `userid` = '+empid,function(err, result){
			con.release();
			  if(err)
			  {
				 
			  }
				else
				{
					if(result.length > 0)
					{
						res.send({status:1,message:"Entry Already Exist.."});
					}
				}
			});
		});
  };



  this.getOfficePaymentOnreport = function(year,office,res)
	{ 				
		connection.acquire(function(err, con) {
			if(office == 'undefined' &&  year != "undefined")
			{
				var sql = 'SELECT (SELECT officemaster.office FROM officemaster WHERE officemaster.id = officerent.officeid) as officename,`id`,DATE_FORMAT(`paymentmonth`,"%M-%y") as `paymentmonth`,`amount`,DATE_FORMAT(`paymentdate`,"%d-%M-%y") as `paymentdate`,`billamount`,DATE_FORMAT(`billdate`,"%d-%M-%y") as `billdate`,`expamt`,(SELECT user.username from user WHERE user.id = officerent.createdby) as username  FROM `officerent` WHERE YEAR(`paymentdate`) = "'+year+'"';
			}
			if(year == "undefined" && office == 'undefined')
			{
				var sql = 'SELECT (SELECT officemaster.office FROM officemaster WHERE officemaster.id = officerent.officeid) as officename,`id`,DATE_FORMAT(`paymentmonth`,"%M-%y") as `paymentmonth`,`amount`,DATE_FORMAT(`paymentdate`,"%d-%M-%y") as `paymentdate`,`billamount`,DATE_FORMAT(`billdate`,"%d-%M-%y") as `billdate`,`expamt`,(SELECT user.username from user WHERE user.id = officerent.createdby) as username  FROM `officerent` WHERE YEAR(`paymentdate`) = YEAR(CURDATE())';
			}
			
			if(year == "undefined" && office != 'undefined')
			{
				var sql = 'SELECT (SELECT officemaster.office FROM officemaster WHERE officemaster.id = officerent.officeid) as officename,`id`,DATE_FORMAT(`paymentmonth`,"%M-%y") as `paymentmonth`,`amount`,DATE_FORMAT(`paymentdate`,"%d-%M-%y") as `paymentdate`,`billamount`,DATE_FORMAT(`billdate`,"%d-%M-%y") as `billdate`,`expamt`,(SELECT user.username from user WHERE user.id = officerent.createdby) as username  FROM `officerent` WHERE YEAR(`paymentdate`) = YEAR(CURDATE()) AND officerent.officeid = '+office;
			}
			if(office != 'undefined' &&  year != "undefined")
			{
				var sql = 'SELECT (SELECT officemaster.office FROM officemaster WHERE officemaster.id = officerent.officeid) as officename,`id`,DATE_FORMAT(`paymentmonth`,"%M-%y") as `paymentmonth`,`amount`,DATE_FORMAT(`paymentdate`,"%d-%M-%y") as `paymentdate`,`billamount`,DATE_FORMAT(`billdate`,"%d-%M-%y") as `billdate`,`expamt`,(SELECT user.username from user WHERE user.id = officerent.createdby) as username  FROM `officerent` WHERE YEAR(`paymentdate`) = "'+year+'" AND officerent.officeid = '+office;
			}
			con.query(sql,function(err, result){
			con.release();
			  if(err)
			  {
				
			  }
				else
				{
					res.send(result);
				}
			});
		});
  };
 
  
  
  this.ListCnnectedAreas = function(req,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT * FROM `connectedareas`',function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No reocrd found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
		});
  };
  
  this.InsertConnectedArea = function(locationdetails,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('INSERT INTO `connectedareas` set ?',[locationdetails],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"Failed to insert record."}) 
			  }
				else
				{
					res.send({status:0,message:"New record inserted successfully."}) 
				}
			});
		});
  };
  
  this.SaveReceiptbookData = function(bookdetails,res)
	{ 				
		
			delete bookdetails[0].user;
			
		connection.acquire(function(err, con) {
			if(!bookdetails[0].id)
			{
			con.query('INSERT INTO `receiptbook` set ?',[bookdetails[0]],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"Failed to insert record."}) 
			  }
				else
				{
					res.send({status:0,message:"New record inserted successfully."}) 
				}
			});
			}
			if(bookdetails[0].id)
			{
			con.query('UPDATE `receiptbook` SET ? where id = ?',[bookdetails[0],bookdetails[0].id],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"Failed to insert record."}) 
			  }
				else
				{
					res.send({status:0,message:"record updated successfully."}) 
				}
			});
			}
		});
  };
  

  this.DeleteBookRecord = function(bookid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('DELETE FROM `receiptbook` WHERE id = ?',[bookid],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"Failed to delete record."}) 
			  }
				else
				{
					res.send({status:0,message:"record deleted successfully."}) 
				}
			});
			
		});
  };

  this.getBookDetails = function(bookid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT *,(SELECT user.username from user WHERE user.id = receiptbook.userid) as user FROM `receiptbook` WHERE id = ?',[bookid],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };

  this.getBookDetails = function(bookid,res)
	{ 				
		connection.acquire(function(err, con) {
			con.query('SELECT *,(SELECT user.username from user WHERE user.id = receiptbook.userid) as user FROM `receiptbook` WHERE id = ?',[bookid],function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };
  
  this.LisBookDetails = function(userlevel,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(userlevel == "HO")
			{
				var sql = 'SELECT *,(SELECT user.username from user WHERE user.id = receiptbook.userid) as user ,(SELECT areamaster.areaname from areamaster WHERE areamaster.id = receiptbook.zoneid) as zone,(SELECT user.username from user WHERE user.id = receiptbook.createdby) as createduser FROM `receiptbook` ORDER BY id DESC'
			}
			
			if(userlevel != "HO")
			{
				var sql = 'SELECT *,(SELECT user.username from user WHERE user.id = receiptbook.userid) as user ,(SELECT areamaster.areaname from areamaster WHERE areamaster.id = receiptbook.zoneid) as zone,(SELECT user.username from user WHERE user.id = receiptbook.createdby) as createduser FROM `receiptbook` WHERE `userid` = '+userid+' ORDER BY id DESC'
			}
			con.query(sql,function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };

  this.ListZonesAssignforUserReciept = function(userid,userlevel,res)
	{ 				
		connection.acquire(function(err, con) {
			if(userlevel == "HO" || userlevel == "SUPERVISOR")
			{
				var sql = "SELECT id as zoneid,areaname as zonename FROM `areamaster";
			}
			else
			{
				var sql = "SELECT zoneid,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = receiptbook.zoneid) as zonename FROM `receiptbook` WHERE receiptbook.userid = "+userid;
			}
			con.query(sql,function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };
  
  this.GetCollectionInzone = function(zoneid,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(zoneid != "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `receiptno`,`id`,SUBSTRING(collection.receiptno,1,2) as bookno,(SELECT customers.username FROM customers WHERE customers.id = collection.customerid) as custusername,`amount`,`paymentmode`,(SELECT user.username FROM user WHERE user.id = collection.createdby) as collectedby,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cash" AND collection.zoneid = '+zoneid+') as TotalCashcoll,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cheque" AND collection.zoneid = '+zoneid+') as Totalchequecoll,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = collection.zoneid) as zonename,`createddate` FROM collection WHERE zoneid = '+zoneid+' ORDER BY `receiptno` ASC';
			}
			
			if(zoneid != "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `receiptno`,`id`,SUBSTRING(collection.receiptno,1,2) as bookno,(SELECT customers.username FROM customers WHERE customers.id = collection.customerid) as custusername,`amount`,`paymentmode`,(SELECT user.username FROM user WHERE user.id = collection.createdby) as collectedby,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cash" AND collection.zoneid = '+zoneid+' AND `createdby` = '+userid+') as TotalCashcoll,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cheque" AND collection.zoneid = '+zoneid+' AND `createdby` = '+userid+') as Totalchequecoll,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = collection.zoneid) as zonename,`createddate` FROM collection WHERE zoneid = '+zoneid+' AND `createdby` = '+userid+' ORDER BY `receiptno` ASC';
			}
			
			if(zoneid == "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `receiptno`,`id`,SUBSTRING(collection.receiptno,1,2) as bookno,(SELECT customers.username FROM customers WHERE customers.id = collection.customerid) as custusername,`amount`,`paymentmode`,(SELECT user.username FROM user WHERE user.id = collection.createdby) as collectedby,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cash" AND `createdby` = '+userid+') as TotalCashcoll,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cheque" AND  `createdby` = '+userid+') as Totalchequecoll,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = collection.zoneid) as zonename,`createddate` FROM collection WHERE  `createdby` = '+userid+' ORDER BY `receiptno` ASC';
			}
			
			if(zoneid == "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `receiptno`,`id`,SUBSTRING(collection.receiptno,1,2) as bookno,(SELECT customers.username FROM customers WHERE customers.id = collection.customerid) as custusername,`amount`,`paymentmode`,(SELECT user.username FROM user WHERE user.id = collection.createdby) as collectedby,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cash") as TotalCashcoll,(SELECT SUM(collection.amount) FROM collection WHERE collection.paymentmode = "Cheque") as Totalchequecoll,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = collection.zoneid) as zonename,`createddate` FROM collection ORDER BY `receiptno` ASC';
			}
			
			con.query(sql,function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };
  
  
  
  this.getBookNoOnZoneanduser = function(zoneid,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(zoneid != "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `bookno` FROM `receiptbook` WHERE `zoneid` = '+zoneid+' ORDER BY id DESC';
			}
			
			if(zoneid != "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `bookno` FROM `receiptbook` WHERE `zoneid` = '+zoneid+' AND receiptbook.userid = '+userid+' ORDER BY id DESC';
			}
			
			if(zoneid == "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `bookno` FROM `receiptbook` WHERE receiptbook.userid = '+userid+' ORDER BY id DESC';
			}
			
			if(zoneid == "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `bookno` FROM `receiptbook`  ORDER BY id DESC';
			}
			
			con.query(sql,function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };


  
  this.GetStocusedInzone = function(zoneid,userid,res)
	{ 				
		connection.acquire(function(err, con) {
			if(zoneid != "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `id`,`grid`,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productname,`srno`,CONCAT(IFNULL(`startmeter`,0)," - ",IFNULL (`endmeter`,0)) as measure,`createddate`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as assignfromuser,(SELECT user.username FROM user WHERE user.id = stocksrn.`assignemp`) as assigntouser FROM `stocksrn` WHERE zone = '+zoneid+' ORDER BY id DESC';
			}
			
			if(zoneid != "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `id`,`grid`,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productname,`srno`,CONCAT(IFNULL(`startmeter`,0)," - ",IFNULL (`endmeter`,0)) as measure,`createddate`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as assignfromuser,(SELECT user.username FROM user WHERE user.id = stocksrn.`assignemp`) as assigntouser FROM `stocksrn` WHERE zone = '+zoneid+' AND assignemp = '+userid+' ORDER BY id DESC';
			}
			
			if(zoneid == "undefined" && userid != "undefined")
			{
				var sql = 'SELECT `id`,`grid`,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productname,`srno`,CONCAT(IFNULL(`startmeter`,0)," - ",IFNULL (`endmeter`,0)) as measure,`createddate`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as assignfromuser,(SELECT user.username FROM user WHERE user.id = stocksrn.`assignemp`) as assigntouser FROM `stocksrn` WHERE assignemp = '+userid+' ORDER BY id DESC';
			}
			
			if(zoneid == "undefined" && userid == "undefined")
			{
				var sql = 'SELECT `id`,`grid`,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productname,`srno`,CONCAT(IFNULL(`startmeter`,0)," - ",IFNULL (`endmeter`,0)) as measure,`createddate`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as assignfromuser,(SELECT user.username FROM user WHERE user.id = stocksrn.`assignemp`) as assigntouser FROM `stocksrn` ORDER BY id DESC';
			}
			
			con.query(sql,function(err, result){
			con.release();
			console.log(err);
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			
		});
  };
  
  
  this.getEmployesLoanDetails = function(userid,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('SELECT id,`loanamt` FROM `loan` WHERE `userid` = '+userid,function(err, result){
			con.release();
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
	  });
  };

  this.getLoanPaymentData = function(paymentid,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('SELECT *,(SELECT loan.userid FROM loan WHERE loan.id = loanpaymentdetails.loanid) as userid FROM `loanpaymentdetails` WHERE `id` = '+paymentid,function(err, result){
			con.release();
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
	  });
  };

  this.DeleteLoanPaymentData = function(paymentid,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('DELETE FROM `loanpaymentdetails` WHERE `id` = '+paymentid,function(err, result){
			con.release();
			  if(err)
			  {
				res.send({status:1,message:"Something went wrong, Please try again later."}) 
			  }
				else
				{
					res.send({status:0,message:"Record deleted successfully"}); 
				}
			});
	  });
  };
   
  this.ListLoanPayments = function(req,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('SELECT `paymonth`,paidamount,`id`,`comment`,`createddate`,(SELECT user.fullname FROM user WHERE user.id = (SELECT loan.userid FROM loan WHERE loan.id = loanpaymentdetails.loanid)) as fullname,(SELECT loan.loanamt FROM loan WHERE loan.id = loanpaymentdetails.loanid) as loanamt,(SELECT user.username FROM user WHERE user.id = loanpaymentdetails.createdby) as createduser,(SELECT SUM(loan.loanamt) FROM loan WHERE loan.id = loanpaymentdetails.loanid) as actualLoanAmount FROM `loanpaymentdetails` ORDER BY id DESC',function(err, result){
			con.release();
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
	  });
  };

  this.getEmployesLoanPaymentDetails = function(empid,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('SELECT `paymonth`,paidamount,`id`,`comment`,`createddate`,(SELECT user.fullname FROM user WHERE user.id = (SELECT loan.userid FROM loan WHERE loan.id = loanpaymentdetails.loanid)) as fullname,(SELECT loan.loanamt FROM loan WHERE loan.id = loanpaymentdetails.loanid) as loanamt,(SELECT user.username FROM user WHERE user.id = loanpaymentdetails.createdby) as createduser,(SELECT SUM(loan.loanamt) FROM loan WHERE loan.userid = '+empid+') as actualLoanAmount FROM `loanpaymentdetails` WHERE loanpaymentdetails.loanid IN (SELECT loan.id FROM loan WHERE loan.userid = '+empid+') ORDER BY id DESC',function(err, result){
			con.release();
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
	  });
  };
  
  this.SaveLoanPaymentdetails = function(loanpaymentdetails,res)
  {
	  
	  var paymentmonth = new Date(loanpaymentdetails.paymonth);
						paymentmonth.setMonth(paymentmonth.getMonth());
	  
	  connection.acquire(function(err, con) {
		  if(loanpaymentdetails.id)
		  {
			  var sql = 'UPDATE `loanpaymentdetails` SET `loanid`=?,`paymonth`=?,`paidamount`=?,`comment`=? WHERE `id` = ?';
			   var detailsobj = [loanpaymentdetails.loanid,paymentmonth,loanpaymentdetails.paidamount,loanpaymentdetails.comment,loanpaymentdetails.id];
		  }
		  else
		  {
			  var sql = 'INSERT INTO `loanpaymentdetails`(`loanid`, `paymonth`, `paidamount`, `createdby`,`comment`) VALUES (?,?,?,?,?)';
			  var detailsobj = [loanpaymentdetails.loanid,paymentmonth,loanpaymentdetails.paidamount,loanpaymentdetails.createdby,loanpaymentdetails.comment];
		  }
		  con.query(sql,detailsobj,function(err, result){
			con.release();
			  if(err)
			  {
				  
				res.send({status:1,message:"Something went wrong, Please try again"}) ;
			  }
				else
				{
					res.send({status:0,message:"Details saved successfully"}) ;
				}
			});
	  });
  };
  
  


//   EMPLOYEE ATTENDANCE REPORT

this.getEmployeeAttendanceReport = function(attfilter,res)
  {
	  connection.acquire(function(err, con) {
		  con.query('SELECT `attdate`,`intime`,`outtime`,DATE_FORMAT(`attdate`,"%m-%Y") AS attmonth,(SELECT employeemaster.name FROM employeemaster WHERE employeemaster.id = (SELECT user.empid FROM user WHERE user.id = '+attfilter.selectedUser+' LIMIT 1)) AS employeename FROM `userattendance` WHERE userattendance.userid = '+attfilter.selectedUser+' AND DATE_FORMAT(`attdate`,"%m-%Y") = "'+attfilter.selectedMonth+'"',function(err, result){
			  if(err)
			  {
				res.send({status:1,message:"No record found"}) 
			  }
				else
				{
					res.send(result) 
				}
			});
			con.release();
	  });
  };

//EMPLOYEE ATTENDANCE REPORT

  
}
module.exports = new entity();