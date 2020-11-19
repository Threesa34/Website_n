var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var puretext = require('puretext');
function purchase() {
	
	/* PURCHASE */
	
	this.AddPo= function (purchase, res) {
		console.log(purchase);
		var ss = '';
		
		connection.acquire(function (err, con) {
						
			
				con.query('INSERT INTO `pomaster`(`createddate`, `vendor`, `grossamount`, `taxamount`, `netamount`, `createdby`) VALUES (CURDATE(),?,?,?,?,?)',[purchase[0].vendor,purchase[0].grossamount,purchase[0].taxamount,purchase[0].netamount,purchase[0].createdby], function (err, result) {
					console.log(err)
					if(err)
					{
						res.send({status:0,message:'Failed To Add Purchase'});
					}
					else
					{
						
						for(var i = 0 ; i < purchase.length;i++)
						{
							ss = ss+'('+purchase[i].id+','+purchase[i].porate+','+purchase[i].qty+','+purchase[i].measure+','+purchase[i].amount+',0,'+result.insertId+'),';
						}
		ss = ss.substr(0, ss.length - 1);
						
					con.query('INSERT INTO `podetails`(`productid`, `porate`, `qty`, `measure`, `netvalue`, `tax`, `poid`) VALUES '+ss, function (err, result1) {
					
					console.log(err)
					if(err)
					{
								con.query('DELETE FROM `pomaster` WHERE `id` ='+result.insertId, function (err, result1) {
					
						if(err)
						{con.release();}
						else
						{
							con.release();
							res.send({status:0,message:'Failed To Add Purchase'});
						}
								});
					}
					else
					{
						con.release();
						res.send({status:1,message:'Purchase Entry Added Successfully'});
					}
				});
					}
					
					
				});
			
		});
	};   
	
	this. Listpo = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id`,`createddate`,`vendor`,(SELECT `name` FROM `vendor` WHERE `id` = pomaster.vendor) as vendorname,`netamount` FROM `pomaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.EditPoDetails= function (purchase, res) {
			var sql ='';
		for(var i = 0 ; i < purchase.length;i++)
			{
				if(purchase[i].podetailsid == undefined)
				{
					sql = sql + 'INSERT INTO `podetails`(`productid`, `porate`, `qty`,`measure`,`tax`, `netvalue`,  `poid`) VALUES ('+purchase[i].id+','+purchase[i].porate+','+purchase[i].qty+','+purchase[i].measure+',0,'+purchase[i].netvalue+','+purchase[0].poid+') ;'
				}
				else
				{
					sql = sql + ' UPDATE `podetails` set `productid` = '+purchase[i].productid+', `porate` ='+purchase[i].porate+' , `qty` ='+purchase[i].qty+' ,`measure` ='+purchase[i].measure+' , `netvalue` ='+purchase[i].netvalue+' where id = '+purchase[i].podetailsid+';';
				}
			}
			sql = sql+'UPDATE `pomaster` SET `vendor`='+purchase[0].vendor+',`grossamount`='+purchase[0].grossamount+',`taxamount`='+purchase[0].taxamount+',`netamount`='+purchase[0].netamount+' WHERE `id`= '+purchase[0].poid+';';
		 connection.acquire(function (err, con) {
				con.query(sql, function (err, result) {
					console.log(sql);
					console.log(err);
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Product"});
					}
					else
					{
						res.send({status:0,message:"Product Updated Successfully."});
					}
		});
		}); 
	};  
	
	this.Getpodetails= function (poid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT pomaster.createddate,(select invoiceno from grmaster where poid=pomaster.id)as invoiceno,(select invoicedate from grmaster where poid=pomaster.id)as invoicedate,pomaster.vendor,pomaster.grossamount,pomaster.taxamount,pomaster.netamount,pomaster.createdby,podetails.productid,podetails.porate,podetails.qty,podetails.measure,podetails.tax as taxpercent,podetails.netvalue,pomaster.id as poid,podetails.id as podetailsid,(SELECT `name` FROM `products` WHERE `id` = podetails.productid) as name,(SELECT `productstype` FROM `products` WHERE `id` = podetails.productid) as productstype FROM `pomaster`,`podetails` where pomaster.id = '+poid+' AND podetails.poid = '+poid, function (err, result) {
				con.release();
				console.log(err)
				res.send(result);
			});
		});
	}; 

	this.DeletePO= function (poid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `pomaster` WHERE `id` = '+poid+';DELETE FROM `podetails` WHERE `poid` = '+poid+';', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Purchase Order"});
					}
					else
					{
						res.send({status:0,message:"Purchase Order Deleted Successfully."});
					}
			});
		});
	};
	
	/* GR */
	
	this. Listusedstock = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT products.name FROM products WHERE products.id = stockused.itemid) as productname,(SELECT user.username FROM user WHERE user.id = stockused.userid) as user FROM `stockused` order by id desc', function (err, result) {
				con.release();
				console.log(err);
				res.send(result);
			});
		});
	}; 
	
	/* GR */
	
	this. ListPoForGr = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id` FROM `pomaster` WHERE id NOT IN (SELECT poid FROM grmaster)', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this. ListGR = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `grmaster` ORDER BY `id` DESC', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this. getGRData = function (grid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT products.name FROM products WHERE products.id = grdetails.productsid) as name,grmaster.id as grid,grdetails.id as grdetailsid,(SELECT `productstype` FROM `products` WHERE `id` = grdetails.productsid) as productstype FROM `grmaster`,`grdetails` WHERE grmaster.id = '+grid+' AND grdetails.grid ='+grid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this. DeleteGR = function (grid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `grmaster` WHERE grmaster.id = '+grid+'; DELETE FROM `grdetails` WHERE grdetails.grid = '+grid, function (err, result) {
				
				if(err)
				{
					con.release();
					res.send({status:0,message:'Something Went Wrong Please Try Again..'})
				}
				else
				{
					con.release();
					res.send({status:0,message:'Record Deleted Successfully'})
				}
			});
		});
	}; 
	
	this.AddGR= function (gr, res) {
		connection.acquire(function (err, con) {
				con.query('INSERT INTO `grmaster`(`poid`, `invoiceno`, `invoicedate`,  `grossamount`, `taxamount`, `netamount`,`createdby`) VALUES (?,?,?,?,?,?,?)',[gr[0].poid,gr[0].invoiceno,gr[0].invoicedate,gr[0].grossamount,gr[0].taxamount,gr[0].netamount,gr[0].createdby], function (err, result1) {
					con.release();
					if(err)
					{
						console.log("Failed To Insert Data");
					}
					else
					{
						connection.acquire(function (err, con) {
							var ss = '';
							for(var i = 0 ; i < gr.length;i++)
							{
								ss = ss + '('+gr[i].productid+','+gr[i].porate+','+gr[i].qty+','+gr[i].measure+','+gr[i].taxpercent+','+gr[i].netvalue+','+result1.insertId+'),';
							}
							ss = ss.substr(0, ss.length - 1);
							con.query('INSERT INTO `grdetails`(`productsid`, `porate`, `qty`,`measure`,`taxpercent`,`netvalue`, `grid`) VALUES '+ss, function (err, result) {
								if(err)
								{res.send({status:1,message:"Failed To Insert Data"});}
								else
								{res.send({status:0,message:"New Record Inserted Successfully.",insertId:result.insertId});}
							});
						});
						
					}
				});
			
		});
	};   
	
	this.EditGr= function (gr, res) {
		connection.acquire(function (err, con) {
				con.query('UPDATE `grmaster` set`invoiceno` = '+gr[0].invoiceno+', `invoicedate` = "'+gr[0].invoicedate+'",  `grossamount` = '+gr[0].grossamount+', `taxamount` = '+gr[0].taxamount+', `netamount` = '+gr[0].netamount+' where grmaster.id = '+gr[0].grid, function (err, result1) {
					con.release();
					console.log(err);
					if(err)
					{
						console.log("Failed To Update Data");
					}
					else
					{
						connection.acquire(function (err, con) {
							var ss = '';
							for(var i = 0 ; i < gr.length;i++)
							{
								ss = ss + 'UPDATE `grdetails` SET `porate`='+gr[i].porate+',`qty`='+gr[i].qty+',`measure`='+gr[i].measure+',`netvalue`='+gr[i].netvalue+',`taxpercent`='+gr[i].taxpercent+' WHERE `grid`='+gr[i].grid+' AND `productsid`='+gr[i].productsid+';';
							}
							ss = ss.substr(0, ss.length - 1);
							con.query(ss, function (err, result) {
								if(err)
								{res.send({status:1,message:"Failed To Update Data"});}
								else
								{res.send({status:0,message:"Record Updated Successfully.",insertId:result.insertId});}
							});
						});
						
					}
				});
			
		});
	};   
	
	this.AddusedStock= function (data, res) {
		connection.acquire(function (err, con) {
				con.query("insert into stockused set ?",data, function (err, result1) {
					con.release();
					if(err)
					{
						res.send({status:1,message:'Failed To Add Record'});
					}
					else
					{
						res.send({status:0,message:'New Record Added Successfully'});
					}
				});
			
		});
	};   
	
	this.EditUsedqty= function (data, res) {
		connection.acquire(function (err, con) {
				con.query('UPDATE `stockused` SET `qty`='+data.qty+',`userid`='+data.userid+',`description`="'+data.description+'" WHERE id = '+data.id, function (err, result1) {
					con.release();
					console.log(err);
					if(err)
					{
						console.log("Failed To Update Record");
					}
					else
					{
						
						res.send({status:0,message:"Record Updated Successfully."});
						
					}
				});
			
		});
	};   
	
	
	
	
	this.DeleteUsedqty= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `stockused` WHERE `id` = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};
	
	/* vendor */
	
	this.AddNewVendor= function (vendordata, res) {
		connection.acquire(function (err, con) {
			console.log(vendordata);
			con.query('INSERT INTO `vendor` set ?',[vendordata], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Add Record"});
					}
					else
					{
						res.send({status:0,message:"Record Added Successfully."});
					}
			});
		});
	};
	
	this.UpdateVendorDetails= function (vendordata, res) {
		connection.acquire(function (err, con) {
			console.log(vendordata);
			con.query('UPDATE `vendor` set ? WHERE id = ?',[vendordata[0],vendordata[0].id], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Update Record"});
					}
					else
					{
						res.send({status:0,message:"Record Updated Successfully."});
					}
			});
		});
	};
	
	this.Deletevendor = function(id, res) {
		connection.acquire(function (err, con) {
			console.log(id);
			con.query('DELETE FROM `vendor` WHERE id = '+id, function (err, result) {
				
				con.release();
				console.log(err);
				if(err)
					{
						console.log(err);
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};
	
	this.VendorList= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM`vendor` order by id desc', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"nO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getvendorData= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM`vendor` where id = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
	
	/* Vendor Payment */
	
	this. ListPoForGrpay = function (req, res) {
		connection.acquire(function (err, con) {

			con.query('SELECT `id` FROM `pomaster`  WHERE id NOT IN (SELECT poid FROM vendorpayment)  ', function (err, result) {
				con.release();
			res.send(result);
			});
		});
	}; 
	
	
	this.getPoOnVendorfromgr= function (vendorid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * from grmaster WHERE `poid` in (SELECT pomaster.id FROM pomaster WHERE pomaster.vendor = '+vendorid+') AND poid NOT IN (SELECT vendorpayment.poid FROM vendorpayment)', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.getAmountDetailsOnGr= function (grid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT COUNT(grdetails.grid) FROM grdetails WHERE grdetails.grid = grmaster.id) as totalproducts,(SELECT user.username FROM user WHERE user.id = grmaster.createdby) as username,(SELECT products.name FROM products WHERE products.id = grdetails.productsid) as productname,(SELECT products.mrp FROM products WHERE products.id = grdetails.productsid) as mrp,(SELECT 0/100 FROM products WHERE products.id = grdetails.productsid) as taxper FROM `grmaster`,grdetails WHERE grmaster.id = '+grid+' AND grdetails.grid = '+grid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	
	
	this.Addvendorpayment= function (user, res) {
		connection.acquire(function (err, con) {
				con.query('INSERT INTO vendorpayment(poid,vendor,amount,grinvoiceno, grinvoicedate, chqno,chqdate, bank,paidamount,paymentmode,pendingamount,createdby,recievedby) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[user.poid,user.vendor,user.netamount,user.invoiceno,user.invoicedate,user.chqno,user.chqdate,user.bank,user.paidamount,user.paymentmode,user.pendingamount,user.createdby,user.recievedby], function (err, result) {
					con.release();
					if(err)
								{res.send({status:1,message:"Failed To Insert Data"});}
								else
								{res.send({status:0,message:"New Record Inserted Successfully.",insertId:result.insertId});}
				
				});
			
		});
	};   
	
	
	this. ListvendorsPaymets = function (req, res) {
		connection.acquire(function (err, con) {

			con.query('select *,(select name from vendor where id=vendorpayment.vendor)as vendorname,(vendorpayment.amount - (SELECT SUM(`paidamount`) FROM vendorpayment a WHERE a.poid = vendorpayment.poid AND a.vendor =vendorpayment.vendor)) as totalpendingamt from vendorpayment GROUP BY vendorpayment.poid order by id desc', function (err, result) {
				con.release();
			res.send(result);
			});
		});
	}; 
	
	
	this. GetVendorsPaymentsPoviseDetails = function (poid, res) {
		connection.acquire(function (err, con) {

			con.query('select *,(SELECT user.fullname FROM user WHERE user.id = vendorpayment.createdby) as paidby,(select name from vendor where id=vendorpayment.vendor)as vendorname,(vendorpayment.amount - (SELECT SUM(`paidamount`) FROM vendorpayment a WHERE a.poid = vendorpayment.poid AND a.vendor =vendorpayment.vendor)) as totalpendingamt from vendorpayment WHERE vendorpayment.poid = '+poid+' order by id desc', function (err, result) {
				con.release();
			res.send(result);
			});
		});
	}; 

	this. getPaymentDetails = function (id, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(select name from vendor where id=vendorpayment.vendor) as vendorname,(SELECT SUM(`paidamount`) FROM vendorpayment a WHERE a.poid in (SELECT b.poid FROM vendorpayment b WHERE b.vendor = vendorpayment.vendor)) as totalpaidamt,(vendorpayment.amount - (SELECT SUM(`paidamount`) FROM vendorpayment a WHERE a.poid = vendorpayment.poid AND a.vendor =vendorpayment.vendor)) as totalpendingamt from vendorpayment where id= ? ',[id], function (err, result) {
				con.release();
				result[0].grinvoicedatestr = String(result[0].grinvoicedate).substr(0,2)+"/"+String(result[0].grinvoicedate).substr(3,2)+"/"+String(result[0].grinvoicedate).substr(6,10);
				console.log(result[0].grinvoicedate);
				res.send(result);
			});
		});
	}; 
	
	
	
	
	 this.EditpaymentDetails = function(user, res) {
		 console.log(user);
		 
		connection.acquire(function(err, con) {
			
			if(user[0].paidamountnew)
		 {
		
		 con.query('INSERT INTO vendorpayment(poid,vendor,amount,grinvoiceno, grinvoicedate,paidamount,paymentmode,chqno,chqdate, bank,pendingamount,createdby,recievedby) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[user[0].poid,user[0].vendor,user[0].amount,user[0].grinvoiceno,user[0].grinvoicedatestr,user[0].paidamountnew,user[0].paymentmodenew,user[0].chqnonew,user[0].chqdatenew,user[0].banknew,user[0].pendingamountnew,user[0].username,user[0].recievedby], function(err1, result1) {
        con.release();
		console.log(err1)
        if (err1) {
          res.send({status: 1, message: 'Failed To Update Payment Record'});
        } 
		else {
			res.send({status: 0, message: 'Payment Record Upadeted Sucessfully'});
		}
      });
	
		 }
			else
	{
		 con.query('Update vendorpayment set poid=?,vendor=?,grinvoiceno=?,grinvoicedate=?,paidamount=?,paymentmode=?,chqno=?,chqdate=?,bank=?,pendingamount=?,recievedby=? where id =?',[user[0].poid,user[0].vendor,user[0].grinvoiceno,user[0].grinvoicedatestr,user[0].paidamount,user[0].paymentmode,user[0].chqno,user[0].chqdate,user[0].bank,user[0].pendingamount,user[0].recievedby,user[0].id], function(err, result) {
        con.release();
		console.log(err)
        if (err) {
          res.send({status: 1, message: 'Failed To Update Payment Record'});
        } 
		else {
			res.send({status: 0, message: 'Payment Record Upadeted Sucessfully'});
		}
      });
	}
	});
  };
  
  
  
  this.Deletevendorpayment= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `vendorpayment` where id = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Payment"});
					}
					else
					{
						res.send({status:0,message:"Payment Deleted Successfully."});
					}
			});
		});
	};   
	
	
	
	
	/* Office */
	
	this.AddNewoffice= function (officedata, res) {
		connection.acquire(function (err, con) {
			con.query('INSERT INTO `officeMaster` set ?',[officedata], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Add Record"});
					}
					else
					{
						res.send({status:0,message:"Record Added Successfully."});
					}
			});
		});
	};
	
	this.UpdateOfficeDetails= function (officedata, res) {
		connection.acquire(function (err, con) {
			con.query('UPDATE `officeMaster` set ? WHERE id = ?',[officedata[0],officedata[0].id], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Update Record"});
					}
					else
					{
						res.send({status:0,message:"Record Updated Successfully."});
					}
			});
		});
	};
	
	this.DeleteOffice = function(id, res) {
		connection.acquire(function (err, con) {
			console.log(id);
			con.query('DELETE FROM `officeMaster` WHERE id = '+id, function (err, result) {
				
				con.release();
				console.log(err);
				if(err)
					{
						console.log(err);
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};
	
	this.OfficeList= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM`officeMaster` order by id desc', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"nO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getOfficeData= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM`officeMaster` where id = '+id, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
	
	/* Office Payment */
	
	this.SendOTP= function (officedata, res) {
		console.log(officedata[0]);
		
		
		
 
			var text = {
			  fromNumber: '+14157992515', // From number is the number you will buy from your admin dashboard 
			  toNumber: '+91'+officedata[0].mobile, // To Number is the number you will be sending the text to 
			  content: "Welcome To Threesa Infoway Pvt. Ltd.,  Your One Time Password (OTP) For office rent of rupees "+officedata[0].paidamt+".00/- paid by "+officedata[0].paidusername+" is :"+officedata[0].createdotp+" \n Thanks and Regards \n Yhreesa Infoway pvt. Ltd.", // Text Content 
			  apiToken: 'testaccount' //Sign up for an account to get an API Token 
			};
			 
			puretext.send(text, function (err, response) {
			  if (err) {
				console.log('there was an error',err)
			  }
			  else {
				console.log('there was no error',response)
			  }
			})
			 
						
	};
	this.AddOfficePayment= function (officedata, res) {
		connection.acquire(function (err, con) {
			con.query('INSERT INTO `officerent`(`officeid`, `paymentmonth`, `amount`, `paymentdate`, `createdby`, `otp`,`billamount`,`billdate`,`reasonexp`,`expamt`) VALUES (?,?,?,?,?,?,?,?,?,?)',[officedata[0].id,officedata[0].monthodpayment,officedata[0].paidamt,officedata[0].dateofpayment,officedata[0].createdby,officedata[0].otp,officedata[0].billamount,officedata[0].billdate,officedata[0].reasonexp,officedata[0].expamt], function (err, result) {
				con.release();
				console.log(err);
				if(err)
					{
						res.send({status:1,message:"Failed To Add Record"});
					}
					else
					{
						res.send({status:0,message:"Record Added Successfully."});
					}
			});
		});
	};
	
	this.UpdateofficePaymentDetails= function (officedata, res) {
		
		
		if(officedata[0].officename.id)
			officedata[0].officeid = officedata[0].officename.id;
		delete officedata[0].officename;
		delete officedata[0].officevendor;
		delete officedata[0].address;
		delete officedata[0].rent;
		delete officedata[0].mobile;
		
		console.log(officedata);
		connection.acquire(function (err, con) {
			con.query('UPDATE `officerent` set ? WHERE id = ?',[officedata[0],officedata[0].id], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Update Record"});
					}
					else
					{
						res.send({status:0,message:"Record Updated Successfully."});
					}
			});
		}); 
	};
	
	this.DeleteOfficePayment = function(id, res) {
		connection.acquire(function (err, con) {
			console.log(id);
			con.query('DELETE FROM `officerent` WHERE id = '+id, function (err, result) {
				
				con.release();
				console.log(err);
				if(err)
					{
						console.log(err);
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};
	
	this.OfficepaymentList= function (userlevel,userid, res) {
		connection.acquire(function (err, con) {
			if(userlevel == 'HO')
			{
				var sql = 'SELECT *,(select officemaster.office FROM officemaster WHERE officemaster.id =officerent.officeid) as officename , (SELECT user.username FROM user WHERE user.id = officerent.createdby) as username FROM`officerent` order by id desc';
			}
			else
			{
				var sql= 'SELECT *,(select officemaster.office FROM officemaster WHERE officemaster.id =officerent.officeid) as officename ,(SELECT user.username FROM user WHERE user.id = officerent.createdby) as username FROM`officerent` WHERE officerent.createdby = '+userid+' order by id desc'
			}
			con.query(sql, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"nO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getofficePaymentData= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT officemaster.office from officemaster WHERE officemaster.id = officerent.officeid) as officename,(SELECT officemaster.officevendor from officemaster WHERE officemaster.id = officerent.officeid) as officevendor,(SELECT officemaster.rent from officemaster WHERE officemaster.id = officerent.officeid) as rent,(SELECT officemaster.address from officemaster WHERE officemaster.id = officerent.officeid) as address,(SELECT officemaster.mobile from officemaster WHERE officemaster.id = officerent.officeid) as mobile FROM `officerent` WHERE id =  '+id, function (err, result) {
				console.log(err);
				con.release();
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
	/* STOCK ENTRY */
	
	this.AddItemsInStocks= function (stocks, res) {
		connection.acquire(function (err, con) {
			var ss = '';
			console.log(stocks)
			for(var i = 0 ; i < stocks.length;i++)
			{
				ss = ss+'('+stocks[0].poid+','+stocks[0].productsid+',"'+stocks[i].srno+'",'+stocks[0].createdby+'),';
			}
			ss = ss.substr(0, ss.length - 1);
			con.query('INSERT INTO `stocksrn`(`grid`, `productsid`, `srno`, `createdby`) VALUES '+ss, function (err, result) {
				con.release();
				console.log(err);
				if(err)
					{
						res.send({status:1,message:"Failed To Add Record"});
					}
					else
					{
						res.send({status:0,message:"Record Added Successfully."});
					}
			});
		});
	};
	
	this.UpdateOfficeDetails= function (officedata, res) {
		connection.acquire(function (err, con) {
			con.query('UPDATE `officeMaster` set ? WHERE id = ?',[officedata[0],officedata[0].id], function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Update Record"});
					}
					else
					{
						res.send({status:0,message:"Record Updated Successfully."});
					}
			});
		});
	};
	
	this.DeleteOffice = function(id, res) {
		connection.acquire(function (err, con) {
			console.log(id);
			con.query('DELETE FROM `officeMaster` WHERE id = '+id, function (err, result) {
				
				con.release();
				console.log(err);
				if(err)
					{
						console.log(err);
						res.send({status:1,message:"Failed To Delete Record"});
					}
					else
					{
						res.send({status:0,message:"Record Deleted Successfully."});
					}
			});
		});
	};
	
	this.listGrForStockEntry= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id`,poid FROM `grmaster` WHERE id NOT IN (SELECT `grid` FROM stocksrn WHERE stocksrn.productsid IN (SELECT grdetails.productsid FROM grdetails WHERE grdetails.grid IN (SELECT grmaster.id FROM grmaster)))', function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"NO DATA FOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
	this.ListStockSRN= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,`id`,`createddate`,DATE_FORMAT(assigndate,"%d-%m-%Y") as assigndate1,`grid`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignemp) as assignempname,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productsname,`productsid`,`srno`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as username,(SELECT areamaster.areaname FROM areamaster WHERE areamaster.id = stocksrn.zone) as zonename FROM `stocksrn` ORDER BY stocksrn.id DESC', function (err, result) {
				con.release();
				console.log(err);
				if(err)
					{
						res.send({status:1,message:"NO DATA FOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
		this.getpoidentry= function (id, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,`id`,`createddate`,DATE_FORMAT(assigndate,"%d-%m-%Y") AS assigndate1,`grid`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignemp) as assignempname,(SELECT products.name FROM products WHERE products.id = stocksrn.productsid) as productsname,`productsid`,`srno`,(SELECT user.username FROM user WHERE user.id = stocksrn.assignedfrom) as username FROM `stocksrn` where grid = ? ORDER BY stocksrn.id DESC',[id], function (err, result) {
				con.release();
				console.log(err);
				if(err)
					{
						res.send({status:1,message:"NO DATA FOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getItemsIngr= function (grid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT grdetails.productsid,grdetails.qty,(SELECT grmaster.poid FROM grmaster WHERE grmaster.id = '+grid+') as poid,(SELECT products.name FROM products WHERE products.id = grdetails.productsid) as productsname,(SELECT `productstype` FROM `products` WHERE `id` = grdetails.productsid) as productstype FROM grdetails WHERE grdetails.grid = '+grid+' AND grdetails.productsid NOT IN (SELECT stocksrn.productsid FROM stocksrn WHERE stocksrn.grid = (select grmaster.poid FROM grmaster WHERE grmaster.id = '+grid+') AND stocksrn.productsid = grdetails.productsid)', function (err, result) {
				con.release();
				console.log(err);
				console.log(result);
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.getSeectedItemQty= function (productid,grid, res) {
		connection.acquire(function (err, con) {
			var sql = con.query('SELECT grdetails.productsid,grdetails.qty,(SELECT products.name FROM products WHERE products.id = grdetails.productsid) as productsname,(SELECT `productstype` FROM `products` WHERE `id` = grdetails.productsid) as productstype FROM grdetails WHERE grdetails.grid = '+grid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	this.setQrValues= function (details, res) {
		connection.acquire(function (err, con) {
			
				var sql = 'UPDATE stocksrn SET zone= '+details.zone+',assignemp= '+details.assignemp+',address= "'+details.address+'",`assignedfrom`='+details.assignedfrom+',`assigndate` = CURDATE() WHERE id= '+details.id+';';
				
			
			con.query(sql, function (err, result) {
				con.release();
				console.log(sql);
				console.log(err);
				if(err)
					{
						res.send({status:1,message:"NO DATA fOUND"});
					}
					else
					{
						res.send(result);
					}
			});
		});
	};
	
	
	
	
	
	
	
	
  
}
module.exports = new purchase();