var connection = require('../connection');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

function master() {
	
	
	/* STATE */
	 this. ListState = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `statemaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetState= function (stateid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `statemaster` where id = '+stateid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
	this.DeleteState= function (stateid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `statemaster` where id = '+stateid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete State"});
					}
					else
					{
						res.send({status:0,message:"State Deleted Successfully."});
					}
			});
		});
	};   

	this.AddState= function (state, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `statemaster` where state = ?',[state.state], function (err, result1) {
			if(result1.length > 0)
			{res.send({status:2,message:"State Name Already Exist"});}
			else
			{
				con.query('insert into statemaster (state,country) values (?,?)',[state.state,state.country], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New State"});
					}
					else
					{
						res.send({status:0,message:"New State Added Successfully."});
					}
				});
			}
		});
		});
	};   
	
	this.EditState= function (state, res) {
		connection.acquire(function (err, con) {
				con.query('update statemaster set state= ?,country =? where id= ?',[state[0].state,state[0].country,state[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update State"});
					}
					else
					{
						res.send({status:0,message:"State Updated Successfully."});
					}
		});
		});
	};  
	
	/*CITY*/
	 this.ListCity = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(select state from statemaster where statemaster.id = citymaster.state) as statename FROM `citymaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetCity = function (cityid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `citymaster` where id = '+cityid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
	this.GetStateOnCity = function (cityid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT state,(select state from statemaster where statemaster.id = citymaster.state) as statename FROM `citymaster` where id = '+cityid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
	this.DeleteCity = function (cityid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `citymaster` where id = '+cityid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete City"});
					}
					else
					{
						res.send({status:0,message:"City Deleted Successfully."});
					}
			});
		});
	};   

	this.AddCity = function (city, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `citymaster` where city = ?',[city.city], function (err, result1) {
			if(result1.length > 0)
			{res.send({status:2,message:"City Already Exist"});}
			else
			{
				con.query('insert into citymaster (city,state) values (?,?)',[city.city,city.state], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New City"});
					}
					else
					{
						res.send({status:0,message:"New City Added Successfully."});
					}
				});
			}
		});
		});
	};   
	
	this.EditCity = function (city, res) {
		connection.acquire(function (err, con) {
				con.query('update citymaster set city= ?,state =? where id= ?',[city[0].city,city[0].state,city[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update City"});
					}
					else
					{
						res.send({status:0,message:"City Updated Successfully."});
					}
		});
		});
	};   
  
	  /*AREA*/
	 this.AreaList= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `areamaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.getAreaData= function (areaid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `areamaster` where id = '+areaid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
	this.DeleteArea= function (areaid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `areamaster` where id = '+areaid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Area"});
					}
					else
					{
						res.send({status:0,message:"Area Deleted Successfully."});
					}
			});
		});
	};   

	this.AddArea= function (dataarea, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `areamaster` where areaname = ?',[dataarea.areaname], function (err, result1) {
			if(result1.length > 0)
			{res.send({status:2,message:"Area Already Exist"});}
			else
			{
				con.query('insert into areamaster (areaname,areacode) values (?,?)',[dataarea.areaname,dataarea.areacode], function (err, result) {
					con.release();
					console.log(err)
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Area"});
					}
					else
					{
						res.send({status:0,message:"New Area Added Successfully."});
					}
				});
			}
		});
		});
	};   
	
	this.EditArea= function (dataarea, res) {
		connection.acquire(function (err, con) {
				con.query('update areamaster set areaname= ?,areacode=? where id= ?',[dataarea[0].areaname,dataarea[0].areacode,dataarea[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Area"});
					}
					else
					{
						res.send({status:0,message:"Area Updated Successfully."});
					}
		});
		});
	};   
	
	
	/*TARGET V/S ACHIEVEMENTS*/
	 this.TargetList= function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `targetvsacheivements` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.getTargetData= function (targetid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT targetassigned.targetid,targetassigned.id as targetassignedid,targetassigned.userid as id,targetvsacheivements.id as masterid,targetvsacheivements.name,targetvsacheivements.description,targetvsacheivements.startdate,targetvsacheivements.enddate,targetvsacheivements.targetcount,targetvsacheivements.createdby,"fales" as bool,`targetcompletedamt`,`targetincmpltamt` FROM `targetvsacheivements`,`targetassigned` where targetvsacheivements.id = '+targetid+' AND targetassigned.targetid = '+targetid, function (err, result) {
				con.release();
				console.log(err);
				res.send(result);
				
			});
		});
	};   
	
	this.DeleteTarget= function (targetid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `targetvsacheivements` where id = '+targetid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Area"});
					}
					else
					{
						res.send({status:0,message:"Area Deleted Successfully."});
					}
			});
		});
	};   

	this.addTarget= function (target, res) {
		var ss = '';
		connection.acquire(function (err, con) {
				var sql = con.query('insert into targetvsacheivements (name,description, `startdate`, `enddate`,targetcount,targetcompletedamt,targetincmpltamt,createdby) values (?,?,?,?,?,?,?,?)',[target[0].targetname,target[0].description,target[0].startdate,target[0].enddate,target[0].targetcount,target[0].targetcompletedamt,target[0].targetincmpltamt,target[0].createdby], function (err, result1) {
					console.log(sql);
					if(err)
					{	
						console.log("---------main err");
						console.log(err);
						con.release();
						res.send({status:1,message:"Failed To Add New Target"});
					}
					else
					{
							for(var i = 0 ; i < target.length;i++)
							{
								ss = ss + '('+result1.insertId+','+target[i].id+',"Unread"),';
							}
							
							ss = ss.substr(0, ss.length - 1);
						con.query('INSERT INTO `targetassigned`(`targetid`, `userid`, `status`) VALUES '+ss, function (err, result) {
				
									if(err)
									{
										console.log("sub err-------------");
										console.log(err);
										con.query('DELETE FROM `targetvsacheivements` WHERE id = '+result1.insertId, function (err, result) {
									if(err)
									{}
									else
									{}
			
								});
						}
								else
								{
									res.send({status:0,message:"New target Added Successfully."});
								}
			
						});
					}
			
			});
		});
	};   
	
	this.EditTarget= function (target, res) {
		console.log(target[0]);
		var newassignments = [];
		for(var i = 0 ; i < target.length;i++)
		{
			if(target[i].userid)
				newassignments.push(target[i]);
		}
		 connection.acquire(function (err, con) {
				con.query('update targetvsacheivements set name= ?,description=?,startdate=?,enddate=?,targetcount=? ,targetcompletedamt=?,targetincmpltamt=? where id= ?',[target[0].name,target[0].description,target[0].startdate,target[0].enddate,target[0].targetcount,target[0].targetcompletedamt,target[0].targetincmpltamt,target[0].masterid], function (err, result) {
					console.log("------------mastererr");
					console.log(err);
					if(err)
					{
						con.release();
						res.send({status:1,message:"Failed To Update Target"});
					}
					else
					{
						
						if(newassignments.length > 0)
						{
							var ss = '';
							for(var j = 0 ; j < newassignments.length;j++)
							{
								ss = ss+'('+newassignments[j].targetid+','+newassignments[j].userid+',"Unread"),';
							}
							ss = ss.substr(0, ss.length - 1); 
							con.query('INSERT INTO `targetassigned`(`targetid`, `userid`, `status`) VALUES '+ss, function (err, result) {
						if(err)
						{
							con.release();
						}
						else
						{
							con.release();
							res.send({status:0,message:"Target Updated Successfully."});
						}
							});
					}
							else
							{
									con.release();
							res.send({status:0,message:"Target Updated Successfully."});
							}
					}
		});
		}); 
	};   
	
	
	
	/* VENDOR */
	 this. ListVendor = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT id,vendorname,contactperson,mobile1,mobile2 FROM `vendormaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	}; 
	
	this.GetVendor= function (vendorid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `vendormaster` where id = '+vendorid, function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
	this.DeleteVendor= function (vendorid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `vendormaster` where id = '+vendorid, function (err, result) {
				con.release();
				if(err)
					{
						res.send({status:1,message:"Failed To Delete Vendor"});
					}
					else
					{
						res.send({status:0,message:"Vendor Deleted Successfully."});
					}
			});
		});
	};   

	this.AddVendor= function (vendor, res) {
		connection.acquire(function (err, con) {
		con.query('SELECT * FROM `vendormaster` where vendorname = ?',[vendor.vendorname], function (err, result1) {
			if(result1.length > 0)
			{res.send({status:2,message:"vendor Name Already Exist"});}
			else
			{
				con.query('insert into vendormaster (vendorname,address,contactperson,mobile1,mobile2,email,depositedamount) values (?,?,?,?,?,?,?)',[vendor.vendorname,vendor.address,vendor.contactperson,vendor.mobile1,vendor.mobile2,vendor.email,vendor.depositedamount], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Vendor"});
					}
					else
					{
						res.send({status:0,message:"New Vendor Added Successfully."});
					}
				});
			}
		});
		});
	};   
	
	this.EditVendor= function (vendor, res) {
		connection.acquire(function (err, con) {
				con.query('update vendormaster set vendorname= ?,address =?,contactperson =?,mobile1 =?,mobile2 =?,email =?, depositedamount =? where id= ?',[vendor[0].vendorname,vendor[0].address,vendor[0].contactperson,vendor[0].mobile1,vendor[0].mobile2,vendor[0].email,vendor[0].depositedamount,vendor[0].id], function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Update Vendor"});
					}
					else
					{
						res.send({status:0,message:"Vendor Updated Successfully."});
					}
		});
		});
	};  
	
	this.UploadVendor= function (vendors, res) {
		console.log(vendors)
				var ss = '';
							for(var i = 0 ; i < vendors.length;i++)
							{
								if(vendors[i].DTDS1 == undefined)
								{vendors[i].DTDS1 = 'N.A.';}
							if(vendors[i].DTDS2 == undefined)
								{vendors[i].DTDS2 = 'N.A.';}
								if(vendors[i].DTDS3 == undefined)
								{vendors[i].DTDS3 = 0;}
								if(vendors[i].DTDS4 == undefined)
								{vendors[i].DTDS4 = 0;}
								if(vendors[i].DTDS5 == undefined)
								{vendors[i].DTDS5 = 'N.A.';}
								if(vendors[i].DTDS6 == undefined)
								{vendors[i].DTDS6 = 0;}
							
								ss = ss + '("'+vendors[i].DTDS0+'","'+vendors[i].DTDS1+'","'+vendors[i].DTDS2+'",'+vendors[i].DTDS3+','+vendors[i].DTDS4+',"'+vendors[i].DTDS5+'",'+vendors[i].DTDS6+'),';
							}
							ss = ss.substr(0, ss.length - 1);
		connection.acquire(function (err, con) {
			
				console.log(ss);
				con.query('INSERT INTO `vendormaster`(`vendorname`, `address`, `contactperson`, `mobile1`, `mobile2`, `email`, `depositedamount`) VALUES'+ ss, function (err, result) {
					con.release();
					if(err)
					{
						res.send({status:1,message:"Failed To Add New Vendors"});
					}
					else
					{
						res.send({status:0,message:"New Vendors Added Successfully."});
					}
				});
			
		});
	};   
	
	
  
}
module.exports = new master();