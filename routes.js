var user = require('./models/user');
var  master = require('./models/master');
var products = require('./models/products');
var Entity = require('./models/Entity');
var purchase = require('./models/purchase');
module.exports = {
    configure: function (app) {
		
		/* APP LOGIN */
		
        app.post('/api/user/auth/', function (req, res) {
            user.authuser(req.body, res);
        });
		
		app.post('/api/SetRgIdForPush/', function (req, res) {
            user.SetRgIdForPush(req.body, res);
        });
		
		app.post('/api/SetTokenForPush/', function (req, res) {
            user.SetTokenForPush(req.body, res);
        });
		
	
		app.post('/api/SendCurrentLocation/', function (req, res) {
            products.SendCurrentLocation(req, res);
        });
		
	
		
		app.post('/api/ResetUUID/', function (req, res) {
            user.ResetUUID(req.body, res);
        });

        app.get('/api/SendNotification/', function (req, res) {
            user.SendNotification(req, res);
        });

		app.get('/api/user/authuserOnuuid/:uuid', function (req, res) {
            user.authuserOnuuid(req.params.uuid, res);
        });

		app.get('/api/resetFile/:filetype/:empid', function (req, res) {
            Entity.resetFile(req.params.filetype,req.params.empid, res);
        });

		app.post('/api/userAttendance/', function (req, res) {
            user.userAttendance(req.body, res);
        });
		
		app.post('/api/resetAttendanceintime/', function (req, res) {
            user.resetAttendanceintime(req.body, res);
        });
        app.get('/api/GetAttendancerecord/:userid', function (req, res) {
            user.GetAttendancerecord(req.params.userid, res);
        });

		app.get('/api/getattendancestatus/:userid', function (req, res) {
            user.getattendancestatus(req.params.userid, res);
        });
		
		app.get('/api/resetAttendance/:userid', function (req, res) {
            user.resetAttendance(req.params.userid, res);
        });
		app.get('/api/userlevelcheck/:userlevel', function (req, res) {
            user.getSupervisordetails(req.params.userlevel, res);
        });
		app.get('/api/userList/', function (req, res) {
            user.userList(req, res); // updated on 18-11-2019 for display birthdays
        });
		app.get('/api/userdetails/:userid', function (req, res) {
            user.getUserDetails1(req.params.userid, res);
        });
		app.delete('/api/userdelete/:userid', function (req, res) {
            user.userdelete(req.params.userid, res);
        });
		app.post('/api/user/', function (req, res) {
            user.createuser(req.body, res);
        });
		app.post('/api/userEdit/', function (req, res) {
            user.Edituser(req.body, res);
        });
		
		app.post('/api/UploadUsers/', function (req, res) {
            user.UploadUsers(req.body, res);
        });
		
        app.get('/api/userduplicatecheck/:usercheck', function (req, res) {
            user.usercheck(req.params.usercheck,res);
        }); 
        app.get('/api/emailduplicatecheck/:usercheck/:email', function (req, res) {
            user.emailcheck(req.params.usercheck,req.params.email,res);
        });
         app.post('/api/user/forgetpwd', function (req, res) {
            user.forgetpwd(req.body, res);
        });
        app.get('/api/userpasswdcheck/:oldpassw/:username', function (req, res) {
            user.getuserpsswd(req.params.oldpassw,req.params.username, res);
        });
	    app.post('/api/userProfileEdit/:field/:value/:id', function (req, res) {
            user.UpdateUserProfile(req.params.field,req.params.value,req.params.id,res);
        }); 
        app.post('/api/updateresetpassw/', function (req, res) {
            user.resetuserpsswd(req.body, res);
        }); 
        app.get('/api/GetUserDetails/:userid', function (req, res) {
            user.getUserDetails1(req.params.userid,res);
        }); 
		app.get('/api/userAttendanceList/:fulldate', function (req, res) {
            user.userAttendanceList(req.params.fulldate,res);
        }); 
		
		app.get('/api/getAbenceList/:fulldate', function (req, res) {
            user.getAbenceList(req.params.fulldate,res);
        }); 
		app.get('/api/getSrsDetails/', function (req, res) {
            user.getSrsDetails(req,res);
        }); 
		
		/* APP MASTER */
		
				/* State */
				
		 app.get('/api/ListState/', function (req, res) {
			 master.ListState(req,res);
        }); 
		app.get('/api/GetState/:stateid', function (req, res) {
			 master.GetState(req.params.stateid,res);
        }); 
		app.delete('/api/DeleteState/:stateid', function (req, res) {
			 master.DeleteState(req.params.stateid,res);
        }); 
		app.post('/api/addState/', function (req, res) {
			 master.AddState(req.body,res);
        }); 
		app.post('/api/editState/', function (req, res) {
			 master.EditState(req.body,res);
        }); 
		
		/*City*/
				
		 app.get('/api/ListCity/', function (req, res) {
			 master.ListCity(req,res);
        }); 
		app.get('/api/GetCity/:cityid', function (req, res) {
			 master.GetCity(req.params.cityid,res);
        }); 
		app.get('/api/getStateOnCity/:cityid', function (req, res) {
			 master.GetStateOnCity(req.params.cityid,res);
        }); 
		app.delete('/api/DeleteCity/:cityid', function (req, res) {
			 master.DeleteCity(req.params.cityid,res);
        }); 
		app.post('/api/addCity/', function (req, res) {
			 master.AddCity(req.body,res);
        }); 
		app.post('/api/editCity/', function (req, res) {
			 master.EditCity(req.body,res);
        }); 
		
		
		/*AREA*/
				
		 app.get('/api/AreaList/', function (req, res) {
			 master.AreaList(req,res);
        }); 
		app.get('/api/getAreaData/:areaid', function (req, res) {
			 master.getAreaData(req.params.areaid,res);
        }); 
		
		app.delete('/api/DeleteArea/:areaid', function (req, res) {
			 master.DeleteArea(req.params.areaid,res);
        }); 
		app.post('/api/addArea/', function (req, res) {
			 master.AddArea(req.body,res);
        }); 
		app.post('/api/editArea/', function (req, res) {
			 master.EditArea(req.body,res);
        }); 
		
		
		/*PLAN*/
				
		 app.get('/api/AreaList/', function (req, res) {
			 master.AreaList(req,res);
        }); 
		app.get('/api/getAreaData/:areaid', function (req, res) {
			 master.getAreaData(req.params.areaid,res);
        }); 
		
		app.delete('/api/DeleteArea/:areaid', function (req, res) {
			 master.DeleteArea(req.params.areaid,res);
        }); 
		app.post('/api/AddNewPlan/', function (req, res) {
			 products.AddNewPlan(req.body,res);
        }); 
		app.post('/api/editArea/', function (req, res) {
			 master.EditArea(req.body,res);
        }); 
		
		/*TARGET V/S ACHIVEMENTS*/
				
		 app.get('/api/TargetList/', function (req, res) {
			 master.TargetList(req,res);
        }); 
		app.get('/api/getTargetData/:targetid', function (req, res) {
			 master.getTargetData(req.params.targetid,res);
        }); 

		app.delete('/api/DeleteTarget/:targetid', function (req, res) {
			 master.DeleteTarget(req.params.targetid,res);
        }); 
		app.post('/api/addTarget/', function (req, res) {
			 master.addTarget(req.body,res);
        }); 
		app.post('/api/EditTarget/', function (req, res) {
			 master.EditTarget(req.body,res);
        }); 
		
		
		/*CUSTOMEERS*/
				
		 app.post('/api/UploadCustomers/', function (req, res) {
			 Entity.UploadCustomers(req.body,res);
        }); 

		app.post('/api/UpdateCustomer/', function (req, res) {
			 Entity.UpdateCustomer(req.body,res);
        }); 
		app.get('/api/ListCustomers/', function (req, res) {
			 Entity.ListCustomers(req,res);
        }); 
		
		app.get('/api/ListCustomersOnZone/:zoneid', function (req, res) {
			 Entity.ListCustomersOnZone(req.params.zoneid,res);
        }); 
		app.get('/api/getCustomerData/:customerid', function (req, res) {
			 Entity.getCustomerData(req.params.customerid,res);
        }); 
		
		
		app.delete('/api/DeleteCustomer/:customerid', function (req, res) {
			 Entity.DeleteCustomer(req.params.customerid,res);
        }); 
		
		
		/*ENQUIRIES*/
				
		 app.post('/api/AddNewEnquiry/', function (req, res) {
			 Entity.AddNewEnquiry(req.body,res);
        }); 

		app.post('/api/UpdateEnquiry/', function (req, res) {
			 Entity.UpdateEnquiry(req.body,res);
        }); 
		
		app.post('/api/savesenderid/', function (req, res) {
			 Entity.savesenderid(req.body,res);
        }); 
		
		app.post('/api/DeleteSelectedEnquiry/', function (req, res) {
			 Entity.DeleteSelectedEnquiry(req.body,res);
        }); 
		app.get('/api/EnquiryList/:userid/:userlevel', function (req, res) {
			 Entity.EnquiryList(req.params.userid,req.params.userlevel,res);
        }); 
		app.get('/api/getEnquiryData/:enquiryid', function (req, res) {
			 Entity.getEnquiryData(req.params.enquiryid,res);
        }); 
		app.delete('/api/DeleteEnquiry/:enquiryid', function (req, res) {
			 Entity.DeleteEnquiry(req.params.enquiryid,res);
        });
		
		app.delete('/api/converttoconnection/:enquiryid', function (req, res) {
			 Entity.converttoconnection(req.params.enquiryid,res);
        }); 
		
		/*PRODUCTS*/
		
		app.post('/api/UpaloadProducts/', function (req, res) {
			 products.UpaloadProducts(req.body,res);
        }); 
		app.post('/api/addProducts/', function (req, res) {
			 products.AddProducts(req.body,res);
        }); 
		app.get('/api/ProductList/', function (req, res) {
			 products.ListProducts(req,res);
        }); 
		app.post('/api/editProduct/', function (req, res) {
			 products.EditProduct(req.body,res);
        }); 
		
		app.post('/api/DeleteSelectedProducts/', function (req, res) {
			 products.DeleteSelectedProducts(req.body,res);
        }); 

		app.post('/api/DeleteSelectedCustomers/', function (req, res) {
			 products.DeleteSelectedCustomers(req.body,res);
        }); 
		app.get('/api/GetProduct/:productid', function (req, res) {
			 products.GetProduct(req.params.productid,res);
        }); 
		app.delete('/api/DeleteProduct/:productid', function (req, res) {
			 products.DeleteProduct(req.params.productid,res);
        }); 
		
			
		/* PURCHASE */
				
		 app.get('/api/Listpo/', function (req, res) {
			 purchase.Listpo(req,res);
        }); 
		app.get('/api/Getpodetails/:poid', function (req, res) {
			 purchase.Getpodetails(req.params.poid,res);
        }); 
		
		app.get('/api/GetPurchaseId/:poid', function (req, res) {
			 products.GetPurchaseId(req.params.poid,res);
        }); 
		
		app.get('/api/ListPurchases/', function (req, res) {
			 products.ListPurchases(req,res);
        }); 
		app.delete('/api/Deletepo/:poid', function (req, res) {
			 purchase.DeletePO(req.params.poid,res);
        }); 
		app.post('/api/RemovePoPrductAtEdit/', function (req, res) {
			 products.RemovePoPrductAtEdit(req.body,res);
        });
		app.post('/api/UpdatePurchaseOrder/', function (req, res) {
			 products.UpdatePurchaseOrder(req.body,res);
        }); 
		app.post('/api/addPO/', function (req, res) {
			 purchase.AddPo(req.body,res);
        }); 
		app.post('/api/Editpurchase/', function (req, res) {
			 purchase.EditPoDetails(req.body,res);
        }); 
		
		app.post('/api/SaveGrDetails/', function (req, res) {
			 purchase.SaveGrDetails(req.body,res);
        }); 
		
		/* GR */
				
		 app.get('/api/Listusedstock/', function (req, res) {
			 purchase.Listusedstock(req,res);
        }); 
		app.get('/api/ListGR/', function (req, res) {
			 purchase.ListGR(req,res);
        }); 
		app.get('/api/getGRData/:grid', function (req, res) {
			 purchase.getGRData(req.params.grid,res);
        }); 
		app.delete('/api/DeleteUsedqty/:id', function (req, res) {
			 purchase.DeleteUsedqty(req.params.id,res);
        }); 
		app.post('/api/AddusedStock/', function (req, res) {
			 purchase.AddusedStock(req.body,res);
        }); 
		app.post('/api/EditUsedqty/', function (req, res) {
			 purchase.EditUsedqty(req.body,res);
        }); 
		app.post('/api/UploadGoodsdata/', function (req, res) {
			 purchase.UploadGoodsdata(req.body,res);
        }); 
		
		/* PO RETURNS */
				
		 app.get('/api/ListGRForPurReturns/', function (req, res) {
			 purchase.ListGRForPurReturns(req,res);
        }); 
		app.get('/api/ListpoReturns/', function (req, res) {
			 purchase.ListpoReturns(req,res);
        }); 
		app.get('/api/getPoReturnsData/:poreturnsid', function (req, res) {
			 purchase.getPoReturnsData(req.params.poreturnsid,res);
        }); 
		app.delete('/api/DeletePoReturn/:poreturnid', function (req, res) {
			 purchase.DeletePoReturn(req.params.poreturnid,res);
        }); 
		app.post('/api/AddporeturnDetails/', function (req, res) {
			 purchase.AddporeturnDetails(req.body,res);
        }); 
		app.post('/api/EditPoReturnsDetails/', function (req, res) {
			 purchase.EditPoReturnsDetails(req.body,res);
        }); 
		
		
		/* CUSTOMER'S ORDER */
		
		app.get('/api/GetProductsalerate/:productname/:mrp/:custtype', function (req, res) {
			 products.GetProductsalerate(req.params.productname,req.params.mrp,req.params.custtype,res);
        }); 
		
		app.get('/api/StcokBalCheck/:productname/:mrp', function (req, res) {
			 products.StcokBalCheck(req.params.productname,req.params.mrp,res);
        }); 
		
		app.get('/api/Mrponproductname/:productname', function (req, res) {
			 products.GetMrponproductname(req.params.productname,res);
        }); 
		
		app.get('/api/Depolist/:custtype', function (req, res) {
			 user.Depolist(req.params.custtype,res);
        }); 
		
		app.get('/api/distributororderlist/:interval', function (req, res) {
			 products.ListDistributorOrders(req.params.interval,res);
        }); 
		
		app.get('/api/retailerOrderList/:interval', function (req, res) {
			 products.ListRetailerOrder(req.params.interval,res);
        });
		app.get('/api/getorderdetails/:orderid', function (req, res) {
			 products.GetOrderDetails(req.params.orderid,res);
        }); 
		
		app.post('/api/Ordercreate/', function (req, res) {
			 products.OrderCreate(req.body,res);
        }); 
		
		app.post('/api/EditOrder/', function (req, res) {
			 products.EditOrder(req.body,res);
        }); 
		
		app.delete('/api/DeleteOrder/:orderid', function (req, res) {
			 products.DeleteSalesOrder(req.params.orderid,res);
        }); 
		
		/* INVOICE */
		 app.get('/api/ListDeliveryBoys/', function (req, res) {
			 user.ListDeliveryBoys(req,res);
        }); 
		
		app.get('/api/setDeliveryBoy/:invoiceid/:dboyid/:orderid', function (req, res) {
			 products.setDeliveryBoy(req.params.invoiceid,req.params.dboyid,req.params.orderid,res);
        }); 

		app.get('/api/DistributorInvoiceList/:interval/:custtype', function (req, res) {
			 products.DistributorInvoiceList(req.params.interval,req.params.custtype,res);
        }); 
		
		app.get('/api/InvoiceDetails/:invoiceid', function (req, res) {
			 products.GetInvoiceDetails(req.params.invoiceid,res);
        }); 
		
		app.post('/api/AddinvoiceOrder/', function (req, res) {
			 products.InvoiceCreate(req.body,res);
        }); 
		
		app.post('/api/EditinvoiceOrder/', function (req, res) {
			 products.UpdateinvoiceOrder(req.body,res);
        }); 
		
		/* SALES RETURNS */
		 app.get('/api/ListinvoiceForSalesReturns/', function (req, res) {
			 products.ListInvoiceForSalesReturns(req,res);
        }); 
		
		app.get('/api/ListSalesReturns/', function (req, res) {
			 products.ListSalesReturns(req,res);
        }); 
		
		app.get('/api/getSalesReturnsData/:salesreturnid', function (req, res) {
			 products.GetSalesReturnsDetails(req.params.salesreturnid,res);
        }); 
		
		app.delete('/api/DeleteSalesReturn/:salesreturnid', function (req, res) {
			 products.DeleteSalesReturn(req.params.salesreturnid,res);
        }); 
		
		app.post('/api/AddSalesreturn/', function (req, res) {
			 products.AddSalesreturnDetails(req.body,res);
        }); 
		
		app.post('/api/EditSalesreturn/', function (req, res) {
			 products.EditSalesreturnDetails(req.body,res);
        }); 
		
		
		/* Inventory */
				
		app.get('/api/GetStockstatement/:fromdate/:todate', function (req, res) {
			 products.GetStockStatement(req.params.fromdate,req.params.todate,res);
        }); 
		
		app.get('/api/Getacpayables/:fromdate/:todate/:id', function (req, res) {
			 products.Getacpayables(req.params.fromdate,req.params.todate,req.params.id,res);
        }); 
		
		app.get('/api/Getacrecievables/:fromdate/:todate', function (req, res) {
			 products.Getacrecievables(req.params.fromdate,req.params.todate,res);
        }); 
		
		/* DASHBOARD */
				
		app.get('/api/getDashboardValues/:userlevel/:userid', function (req, res) {
			 products.getDashboardValues(req.params.userlevel,req.params.userid,res);
        }); 
		
		app.get('/api/getperticulerUserAttendance/:month/:userid', function (req, res) {
			 products.getperticulerUserAttendance(req.params.month,req.params.userid,res);
        }); 

		app.get('/api/getAnualsalereport/', function (req, res) {
			 products.getAnnualsalesReport(req,res);
        }); 
		
		app.get('/api/getPopulerPlans/', function (req, res) {
			 products.getPopulerPlans(req,res);
        }); 
		
		app.get('/api/getDashboardCount/:interval/:userlevel/:userid', function (req, res) {
			 products.getDashboardCount(req.params.interval,req.params.userlevel,req.params.userid,res);
        }); 
		
		app.get('/api/ListUserReviews/:userlevel/:userid', function (req, res) {
			 products.ListUserReviews(req.params.userlevel,req.params.userid,res);
		}); 
		
		app.get('/api/getpoitemdetails/:serialno/:grid', function (req, res) {
			 products.getPoItemDetails(req.params.serialno,req.params.grid,res);
        }); 
		
		app.delete('/api/deleteReview/:id', function (req, res) {
			 products.deleteReview(req.params.id,res);
        }); 
		
		app.get('/api/allorderreport/', function (req, res) {
			 user.allorderreport(res);
        }); 
		
		app.get('/api/allvendorreports/', function (req, res) {
			 user.allvendorreports(res);
        }); 
		
		app.get('/api/GetVendorviseReport/:vendorid/:fromdate/:todate', function (req, res) {
			 user.GetVendorviseReport(req.params.vendorid,req.params.fromdate,req.params.todate,res);
        }); 
		
		
		app.get('/api/productreport/', function (req, res) {
			 user.productreport(res);
        }); 
		
		app.get('/api/orddatesearchreport/:fromdate/:todate', function (req, res) {
			 user.orddatesearchreport(req.params.fromdate,req.params.todate,res);
        }); 
		app.get('/api/purdatesearchreport/:fromdate/:todate/:vendorid', function (req, res) {
			 user.purdatesearchreport(req.params.fromdate,req.params.todate,req.params.vendorid,res);
        }); 
		
		app.get('/api/salereturnreport/', function (req, res) {
			 user.salereturnreport(res);
        }); 
		app.get('/api/salereturndatereport/:fromdate/:todate', function (req, res) {
			 user.salereturndatereport(req.params.fromdate,req.params.todate,res);
        }); 
		
		app.get('/api/purreturndatereport/:fromdate/:todate', function (req, res) {
			 user.purreturndatereport(req.params.fromdate,req.params.todate,res);
        }); 
		app.get('/api/purreturnreport/', function (req, res) {
			 user.purreturnreport(res);
        }); 
		
		app.get('/api/productsalereport/', function (req, res) {
			 user.productsalereport(res);
        });
	   app.get('/api/productsalesrchreport/:fromdate/:todate', function (req, res) {
			 user.productsalesrchreport(req.params.fromdate,req.params.todate,res);
        }); 

      
		
		/* GR */
				
		 app.get('/api/ListPoForGr/', function (req, res) {
			 purchase.ListPoForGr(req,res);
        }); 
		app.get('/api/ListGR/', function (req, res) {
			 purchase.ListGR(req,res);
        }); 
		app.get('/api/getGRData/:grid', function (req, res) {
			 purchase.getGRData(req.params.grid,res);
        }); 
		app.delete('/api/DeleteGR/:grid', function (req, res) {
			 purchase.DeleteGR(req.params.grid,res);
        }); 
		app.post('/api/AddGr/', function (req, res) {
			 purchase.AddGR(req.body,res);
        }); 
		app.post('/api/EditGr/', function (req, res) {
			 purchase.EditGr(req.body,res);
        }); 
		app.post('/api/UploadGoodsdata/', function (req, res) {
			 purchase.UploadGoodsdata(req.body,res);
        }); 
		
		app.get('/api/getPoOnVendorfromgr/:vendorid', function (req, res) {
			 purchase.getPoOnVendorfromgr(req.params.vendorid,res);
        });
		
		app.get('/api/getPoOnVendorfromrawgr/:vendorid', function (req, res) {
			 purchase.getPoOnVendorfromrawgr(req.params.vendorid,res);
        });
		
		app.get('/api/getAmountDetailsOnGr/:grid', function (req, res) {
			 purchase.getAmountDetailsOnGr(req.params.grid,res);
        }); 
		
		app.get('/api/getAmountDetailsOnRawGr/:grid', function (req, res) {
			 purchase.getAmountDetailsOnRawGr(req.params.grid,res);
        }); 
		
		app.post('/api/Addvendorpayment/', function (req, res) {
			 purchase.Addvendorpayment(req.body,res);
        }); 
		
		app.get('/api/ListvendorsPaymets/', function (req, res) {
			 purchase.ListvendorsPaymets(req,res);
        }); 
		
		app.get('/api/getPaymentDetails/:id', function (req, res) {
			 purchase.getPaymentDetails(req.params.id,res);
        });

       app.post('/api/EditpaymentDetails/', function (req, res) {
			 purchase.EditpaymentDetails(req.body,res);
        }); 
		

        app.get('/api/ListorderFordisgr/', function (req, res) {
			 Entity.ListorderFordisgr(req,res);
        }); 
       app.get('/api/Getorderdetails/:orderid', function (req, res) {
			 Entity.Getorderdetails(req.params.orderid,res);
        }); 
		
		
		
		  app.get('/api/ListPoForGrpay/', function (req, res) {
			 purchase.ListPoForGrpay(req,res);
        }); 
		
		app.get('/api/getPoOnVendorfromgr/:vendorid', function (req, res) {
			 purchase.getPoOnVendorfromgr(req.params.vendorid,res);
        });
		
		app.get('/api/getAmountDetailsOnGr/:grid', function (req, res) {
			 purchase.getAmountDetailsOnGr(req.params.grid,res);
        }); 
		
		app.post('/api/Addvendorpayment/', function (req, res) {
			 purchase.Addvendorpayment(req.body,res);
        }); 
		
		app.get('/api/GetVendorsPaymentsPoviseDetails/:poid', function (req, res) {
			 purchase.GetVendorsPaymentsPoviseDetails(req.params.poid,res);
        }); 
		
		app.get('/api/ListvendorsPaymets/', function (req, res) {
			 purchase.ListvendorsPaymets(req,res);
        }); 
		
		app.get('/api/getPaymentDetails/:id', function (req, res) {
			 purchase.getPaymentDetails(req.params.id,res);
        });

       app.post('/api/EditpaymentDetails/', function (req, res) {
			 purchase.EditpaymentDetails(req.body,res);
        }); 
		app.delete('/api/Deletevendorpayment/:id', function (req, res) {
			 purchase.Deletevendorpayment(req.params.id,res);
        }); 
		
		app.delete('/api/DeleteSubPayment/:id', function (req, res) {
			 purchase.Deletevendorpayment(req.params.id,res);
        }); 

		
				/* RECIEPTS */
				app.get('/api/getInvoiceidForreciepts/:custid', function (req, res) {
				products.getInvoiceidForreciepts(req.params.custid,res);
			}); 	
			
			app.get('/api/getRecieptDetails/:recieptid', function (req, res) {
				products.getRecieptDetails(req.params.recieptid,res);
			}); 	
			
			app.get('/api/ListCustomerReciepts/:interval/:custtype', function (req, res) {
				products.ListCustomerReciepts(req.params.interval,req.params.custtype,res);
			}); 	
			
			app.get('/api/getChequerecieptdata/:fromdate/:todate', function (req, res) {
				products.getChequerecieptdata(req.params.fromdate,req.params.todate,res);
			}); 	
				
		app.post('/api/AddReciept/', function (req, res) {
			 products.AddReciept(req.body,res);
        }); 
		
		app.delete('/api/DeleteReciepts/:recieptid', function (req, res) {
			 products.DeleteReciepts(req.params.recieptid,res);
        }); 
		
		app.post('/api/EdiRecieptDetails/', function (req, res) {
			 products.EdiRecieptDetails(req.body,res);
        }); 
		
		app.post('/api/UpdateCurrentLocation/', function (req, res) {
			 products.UpdateCurrentLocation(req.body,res);
        });
		app.get('/api/listCurentPossition/', function(req, res) { 
		products.listCurentPossition(req,res);
		});
		
		app.get('/api/listCurentPossitionWithUser/:userid', function(req, res) { 
		products.listCurentPossitionWithUser(req.params.userid,res);
		});	
		
		app.get('/api/TrackCurentPossitionWithUser/:userid/:trackdate', function(req, res) { 
		products.TrackCurentPossitionWithUser(req.params.userid,req.params.trackdate,res);
		});
		
		app.get('/api/getUserTracking/:userid/:trackdate', function(req, res) { 
			products.getUserTracking(req.params.userid,req.params.trackdate,res);
			});
		
		app.get('/api/updateLogoutstatus/:userid', function(req, res) { 
		products.updateLogoutstatus(req.params.userid,res);
		});	
		
		app.get('/api/getOrderTrack/:userid/:orderdate', function(req, res) { 
		products.getOrderTrack(req.params.userid,req.params.orderdate,res);
		});		
		
		app.get('/api/getSalesSummary/:fromdate/:todate/:userid', function(req, res) { 
		products.getSalesSummary(req.params.fromdate,req.params.todate,req.params.userid,res);
		});	
		
		app.get('/api/Getacrecievable/:fromdate/:todate/:custtype/:userid', function(req, res) { 
		products.Getacrecievable(req.params.fromdate,req.params.todate,req.params.custtype,req.params.userid,res);
		});	
		
		
		app.get('/api/SetUserreview/:selecteduser/:review/:userid/:reason', function(req, res) { 
		products.SetUserreview(req.params.selecteduser,req.params.review,req.params.userid,req.params.reason,res);
		});	
		
		app.get('/api/getuserMonthlyReview/:reviewmonth/:selecteduser', function(req, res) { 
		products.getuserMonthlyReview(req.params.reviewmonth,req.params.selecteduser,res);
		});	
		
					/* OFFLINE */
		app.get('/api/offlinedata/:userid', function(req, res) { 
		products.offlineData(req.params.userid,res);
		});		
		
		app.post('/api/insertofflineorderdata/', function(req, res) { 
		products.insertofflineorderdata(req.body,res);
		});

		/* BEAT */
				
				app.get('/api/Listbeat/', function (req, res) {
					user.Listbeat(req,res);
				}); 	
				app.get('/api/getBeatDetails/:beatid', function (req, res) {
					user.getBeatDetails(req.params.beatid,res);
				}); 	
				
				app.post('/api/AddNewBeat/', function (req, res) {
					user.AddNewBeat(req.body,res);
				}); 
		
				app.delete('/api/deleteBeatDetails/:beatid', function (req, res) {
					user.deleteBeatDetails(req.params.beatid,res);
				}); 
				app.post('/api/EdiBeatDetails/', function (req, res) {
					user.EdiBeatDetails(req.body,res);
				}); 
		
		
		
		/* Material */
				
				app.get('/api/ListItem/', function (req, res) {
					products.ListItem(req,res);
				}); 	
				app.get('/api/getItemData/:itemid', function (req, res) {
					products.getItemData(req.params.itemid,res);
				}); 	
				
				app.post('/api/DeleteSelectedItems/', function (req, res) {
					products.DeleteSelectedItems(req.body,res);
				}); 
				
				app.post('/api/UploadItems/', function (req, res) {
					products.UploadItems(req.body,res);
				}); 
				
				
				app.post('/api/AddNewItem/', function (req, res) {
					products.AddNewItem(req.body,res);
				}); 
		

			app.post('/api/SavePurchaseOrder/', function (req, res) {
					products.SavePurchaseOrder(req.body,res);
				}); 
		
				app.delete('/api/deleteBeatDetails/:beatid', function (req, res) {
					products.deleteBeatDetails(req.params.beatid,res);
				}); 
				app.post('/api/UpdateItemDetails/', function (req, res) {
					products.UpdateItemDetails(req.body,res);
				}); 
				
				
				
				/* LEAVES MANAGEMENT */
				
				app.get('/api/LeavesList/:userid/:userlevel', function (req, res) {
					products.LeavesList(req.params.userid,req.params.userlevel,res);
				}); 	
				app.get('/api/ApproveLeave/:leaveid/:reason/:id', function (req, res) {
					products.ApproveLeave(req.params.leaveid,req.params.reason,req.params.id,res);
				}); 	
				
				app.post('/api/DeleteSelectedApproval/', function (req, res) {
					products.DeleteSelectedApproval(req.body,res);
				}); 
				
				app.post('/api/UploadItems/', function (req, res) {
					products.UploadItems(req.body,res);
				}); 
				
				
				app.post('/api/SubmitLeave/', function (req, res) {
					products.SubmitLeave(req.body,res);
				}); 
		
				app.delete('/api/DeleteLeave/:leaveid', function (req, res) {
					products.DeleteLeave(req.params.leaveid,res);
				}); 
				app.post('/api/UpdateItemDetails/', function (req, res) {
					products.UpdateItemDetails(req.body,res);
				}); 
				
				/* Customer */
					app.post('/api/AddNewcustomer/', function (req, res) {
					Entity.AddNewcustomer(req.body,res);
        }); 
		    
			/* 	complaints */
	 app.post('/api/AddNewComplaints/', function (req, res) {
			 Entity.AddNewComplaints(req.body,res);
        }); 

		app.post('/api/DeleteSeletectedComplaints/', function (req, res) {
			 Entity.DeleteSeletectedComplaints(req.body,res);
        }); 
		
		app.post('/api/UpdateComplaint/', function (req, res) {
			 Entity.UpdateComplaint(req.body,res);
        }); 

		app.get('/api/complaintList/:userid/:userlevel', function (req, res) {
			 Entity.complaintList(req.params.userid,req.params.userlevel,res);
        }); 
		
		app.get('/api/getComplatedataData/:complaintid', function (req, res) {
			 Entity.getComplatedataData(req.params.complaintid,res);
        }); 
		
		app.delete('/api/DeleteComplaint/:complaintid', function (req, res) {
			 Entity.DeleteComplaint(req.params.complaintid,res);
        }); 
		
		/* EMPLOYEE */
		app.get('/api/ListEmployee/', function (req, res) {
			 Entity.ListEmployee(req,res);
        }); 
		app.get('/api/getEmployeeData/:employeeid', function (req, res) {
			 Entity.getEmployeeData(req.params.employeeid,res);
        }); 
		app.delete('/api/DeleteEmployee/:employeeid', function (req, res) {
			 Entity.DeleteEmployee(req.params.employeeid,res);
        }); 
		
		app.post('/api/UploadEmployee/', function (req, res) {
			 Entity.UploadEmployee(req.body,res);
		}); 
		



		/* salary */
		
		app.post('/api/getEmployeeAttendanceReport/', function (req, res) {
			Entity.getEmployeeAttendanceReport(req.body,res);
	   }); 
		
		app.get('/api/getemployeesalary/:month', function (req, res) {
			 Entity.GetEmployeeSalary(req.params.month,res);
        }); 
		
		app.get('/api/getemployeesalaryOnemployee/:userid/:month', function (req, res) {
			 Entity.getemployeesalaryOnemployee(req.params.userid,req.params.month,res);
        }); 
		
		/* USER PROFILE */
		
		app.get('/api/getAttendanceDetailsOfUser/:month/:userid', function (req, res) {
			 Entity.getAttendanceDetailsOfUser(req.params.month,req.params.userid,res);
        }); 
		
		
		
		app.get('/api/ListAdvancepayment/:userid', function (req, res) {
			 Entity.ListAdvancepayment(req.params.userid,res);
        });
		
		app.get('/api/GetAdvancepayment/:id', function (req, res) {
			 Entity.GetAdvancepayment(req.params.id,res);
        }); 
		
		app.delete('/api/DeleteAdvancepayment/:id', function (req, res) {
			 Entity.DeleteAdvancepayment(req.params.id,res);
        }); 
		
		app.post('/api/AddAdvancePayment/', function (req, res) {
			 Entity.AddAdvancePayment(req.body,res);
        }); 
		
		
		/* loan */
		
		
	
		
		app.get('/api/getEmployesLoanDetails/:userid', function (req, res) {
			 Entity.getEmployesLoanDetails(req.params.userid,res);
        });
		
		app.get('/api/ListLoanPayments/', function (req, res) {
			 Entity.ListLoanPayments(req,res);
        });
		app.get('/api/getLoanPaymentData/:paymentid', function (req, res) {
			 Entity.getLoanPaymentData(req.params.paymentid,res);
        });
		app.get('/api/getEmployesLoanPaymentDetails/:empid', function (req, res) {
			 Entity.getEmployesLoanPaymentDetails(req.params.empid,res);
        });
		app.delete('/api/DeleteLoanPaymentData/:paymentid', function (req, res) {
			 Entity.DeleteLoanPaymentData(req.params.paymentid,res);
        });
		
		app.post('/api/SaveLoanPaymentdetails/', function (req, res) {
			 Entity.SaveLoanPaymentdetails(req.body,res);
        });
		
		app.get('/api/ListLoan/:userid/:userlevel', function (req, res) {
			 Entity.ListLoan(req.params.userid,req.params.userlevel,res);
        });
		
		app.get('/api/AuthenticateAdmin/:userlevel/:password', function (req, res) {
			 Entity.AuthenticateAdmin(req.params.userlevel,req.params.password,res);
        });
		
		app.get('/api/getLoanData/:id', function (req, res) {
			 Entity.getLoanData(req.params.id,res);
        }); 
		app.delete('/api/DeleteLoanData/:id', function (req, res) {
			 Entity.DeleteLoanData(req.params.id,res);
        }); 
		
		app.post('/api/SaveLoandetails/', function (req, res) {
			 Entity.SaveLoandetails(req.body,res);
        }); 
		
		
		/*Shift */
	
		app.get('/api/ListShifts/:userid/:userlevel', function (req, res) {
			 Entity.ListShifts(req.params.userid,req.params.userlevel,res);
        });
		
		app.get('/api/getShiftData/:id', function (req, res) {
			 Entity.getShiftData(req.params.id,res);
        }); 
		app.delete('/api/DeleteShiftData/:id', function (req, res) {
			 Entity.DeleteShiftData(req.params.id,res);
        }); 
		
		app.post('/api/SaveShiftdetails/', function (req, res) {
			 Entity.SaveShiftdetails(req.body,res);
        }); 
		
		
		
		/*Rules */
	
		app.get('/api/ListRules/', function (req, res) {
			 Entity.ListRules(req,res);
        });
		
		app.get('/api/getRules/:id', function (req, res) {
			 Entity.getRules(req.params.id,res);
        }); 
		app.delete('/api/DeleteRules/:id', function (req, res) {
			 Entity.DeleteRules(req.params.id,res);
        }); 
		
		app.post('/api/SaveRules/', function (req, res) {
			 Entity.SaveRules(req.body,res);
        }); 
		
		app.post('/api/setShiftTime/', function (req, res) {
			 Entity.setShiftTime(req.body,res);
        }); 
		
		
		
		
		/* vendors */
		
		app.post('/api/AddNewVendor/', function (req, res) {
			 purchase.AddNewVendor(req.body,res);
        }); 
		app.post('/api/UpdateVendorDetails/', function (req, res) {
			 purchase.UpdateVendorDetails(req.body,res);
        }); 
		
		app.get('/api/VendorList/', function (req, res) {
			 purchase.VendorList(req,res);
        }); 
		
		app.get('/api/getvendorData/:id', function (req, res) {
			 purchase.getvendorData(req.params.id,res);
        }); 
		
		app.delete('/api/Deletevendor/:id', function (req, res) {
			 purchase.Deletevendor(req.params.id,res);
        }); 
		
		/* Office */
		
		app.post('/api/AddNewoffice/', function (req, res) {
			 purchase.AddNewoffice(req.body,res);
        }); 
		app.post('/api/UpdateOfficeDetails/', function (req, res) {
			 purchase.UpdateOfficeDetails(req.body,res);
        }); 
		
		app.get('/api/OfficeList/', function (req, res) {
			 purchase.OfficeList(req,res);
        }); 
		
		app.get('/api/getOfficeData/:id', function (req, res) {
			 purchase.getOfficeData(req.params.id,res);
        }); 
		
		app.delete('/api/DeleteOffice/:id', function (req, res) {
			 purchase.DeleteOffice(req.params.id,res);
        }); 
		
		/* Office  Payment*/
		
		app.post('/api/SendOTP/', function (req, res) {
			 purchase.SendOTP(req.body,res);
        }); 
		
		app.post('/api/AddOfficePayment/', function (req, res) {
			 purchase.AddOfficePayment(req.body,res);
        }); 
		app.post('/api/UpdateofficePaymentDetails/', function (req, res) {
			 purchase.UpdateofficePaymentDetails(req.body,res);
        }); 
		
		app.get('/api/OfficepaymentList/:userlevel/:userid', function (req, res) {
			 purchase.OfficepaymentList(req.params.userlevel,req.params.userid,res);
        }); 
		
		app.get('/api/getofficePaymentData/:id', function (req, res) {
			 purchase.getofficePaymentData(req.params.id,res);
        }); 
		
		app.delete('/api/DeleteOfficePayment/:id', function (req, res) {
			 purchase.DeleteOfficePayment(req.params.id,res);
        }); 
		
		/* STOCK ENTRY */
		
		app.post('/api/AddItemsInStocks/', function (req, res) {
			 purchase.AddItemsInStocks(req.body,res);
        }); 
		
		app.post('/api/setQrValues/', function (req, res) {
			 purchase.setQrValues(req.body,res);
        }); 
		app.post('/api/UpdateOfficeDetails/', function (req, res) {
			 purchase.UpdateOfficeDetails(req.body,res);
        }); 
		
		app.get('/api/listGrForStockEntry/', function (req, res) {
			 purchase.listGrForStockEntry(req,res);
        }); 
		
		app.get('/api/getItemsIngr/:grid', function (req, res) {
			 purchase.getItemsIngr(req.params.grid,res);
        }); 
		
		app.get('/api/getSeectedItemQty/:productid/:grid', function (req, res) {
			 purchase.getSeectedItemQty(req.params.productid,req.params.grid,res);
        }); 
		
		app.get('/api/ListStockSRN/', function (req, res) {
			 purchase.ListStockSRN(req,res);
        });
		
		app.get('/api/ListPurchaeStock/', function (req, res) {
			 purchase.ListPurchaeStock(req,res);
        }); 
		
		app.post('/api/getUsedItems/', function (req, res) {
			 purchase.getUsedItems(req.body,res);
        }); 
		
		app.post('/api/SaveSRNData/', function (req, res) {
			 purchase.SaveSRNData(req.body,res);
        }); 
		
		app.delete('/api/DeleteOffice/:id', function (req, res) {
			 purchase.DeleteOffice(req.params.id,res);
        }); 
		/* expense */
		app.get('/api/ListExpense/:userid/:userlevel', function (req, res) {
			 Entity.ListExpense(req.params.userid,req.params.userlevel,res);
        });
		
		app.get('/api/getExpenseData/:id', function (req, res) {
			 Entity.getExpenseData(req.params.id,res);
        }); 
		app.delete('/api/DeleteExpenseData/:id', function (req, res) {
			 Entity.DeleteExpenseData(req.params.id,res);
        }); 
		
		app.post('/api/addexpense/', function (req, res) {
			 Entity.Addexpense(req.body,res);
        }); 
		
		app.get('/api/getpoidentry/:id', function (req, res) {
			 purchase.getpoidentry(req.params.id,res);
        }); 
		
		app.get('/api/getVendorEntry/:id', function (req, res) {
		products.getVendorEntry(req.params.id,res);
        }); 
		app.get('/api/Setenquiryreviw/:id/:userid/:review_enq', function(req, res) { 
		Entity.Setenquiryreviw(req.params.id,req.params.userid,req.params.review_enq,res);
		});	
		
		/* 	Collection */
	
		app.post('/api/AddNewCollection/', function (req, res) {
			 Entity.AddNewCollection(req.body,res);
        }); 

		app.post('/api/DeleteSeletectedCollection/', function (req, res) {
			 Entity.DeleteSeletectedCollection(req.body,res);
        }); 
		
		app.post('/api/UpdateCollection/', function (req, res) {
			 Entity.UpdateCollection(req.body,res);
        }); 

		app.get('/api/collectionList/:userid/:userlevel', function (req, res) {
			 Entity.collectionList(req.params.userid,req.params.userlevel,res);
        }); 
		
		app.get('/api/GetLastRecieptOnZone/:zoneid', function (req, res) {
			 Entity.GetLastRecieptOnZone(req.params.zoneid,res);
        }); 
		
		app.get('/api/getCollectiondataData/:collectionid', function (req, res) {
			 Entity.getCollectiondataData(req.params.collectionid,res);
        }); 
		app.get('/api/customerget/:collectionid', function (req, res) {
			 Entity.customerget(req.params.collectionid,res);
        }); 
		
		app.delete('/api/DeleteCollection/:collectionid', function (req, res) {
			 Entity.DeleteCollection(req.params.collectionid,res);
        }); 
		
		app.get('/api/CheckEmpExistInExpence/:empid', function (req, res) {
			 Entity.CheckEmpExistInExpence(req.params.empid,res);
        }); 
		
		app.get('/api/getOfficePaymentOnreport/:year/:office', function (req, res) {
			 Entity.getOfficePaymentOnreport(req.params.year,req.params.office,res);
        }); 
		
		app.get('/api/ListCnnectedAreas/', function (req, res) {
			 Entity.ListCnnectedAreas(req,res);
        }); 
	
		app.post('/api/InsertConnectedArea/', function (req, res) {
			 Entity.InsertConnectedArea(req.body,res);
        });
		
		app.post('/api/SaveReceiptbookData/', function (req, res) {
			 Entity.SaveReceiptbookData(req.body,res);
        }); 
		
		app.delete('/api/DeleteBookRecord/:bookid', function (req, res) {
			 Entity.DeleteBookRecord(req.params.bookid,res);
        }); 
	
	
		app.get('/api/LisBookDetails/:userlevel/:userid', function (req, res) {
			 Entity.LisBookDetails(req.params.userlevel,req.params.userid,res);
        }); 
		
		app.get('/api/getBookDetails/:bookid', function (req, res) {
			 Entity.getBookDetails(req.params.bookid,res);
        }); 
	
		app.get('/api/ListZonesAssignforUserReciept/:userid/:userlevel', function (req, res) {
			 Entity.ListZonesAssignforUserReciept(req.params.userid,req.params.userlevel,res);
        }); 
		
		app.get('/api/GetCollectionInzone/:zoneid/:userid', function (req, res) {
			 Entity.GetCollectionInzone(req.params.zoneid,req.params.userid,res);
        }); 
		
		app.get('/api/getBookNoOnZoneanduser/:zoneid/:userid', function (req, res) {
			 Entity.getBookNoOnZoneanduser(req.params.zoneid,req.params.userid,res);
        }); 
	
		app.get('/api/GetStocusedInzone/:zoneid/:userid', function (req, res) {
			 Entity.GetStocusedInzone(req.params.zoneid,req.params.userid,res);
        }); 
		
		
		app.get('/api/GetCurrentTargetForUser/:userid', function (req, res) {
			 products.GetCurrentTargetForUser(req.params.userid,res);
        }); 
		
		
		app.get('/api/GetCHatContent/:userid', function (req, res) {
			 products.GetCHatContent(req.params.userid,res);
        }); 
		
		app.get('/api/GetCHatContent121/:userid/:touserid', function (req, res) {
			 products.GetCHatContent121(req.params.userid,req.params.touserid,res);
        }); 
		
		
		
		
		/* ADVERTISMENT */
		app.get('/api/ListAdvertsiment/:userlevel/:userid', function (req, res) {
			 products.ListAdvertsiment(req.params.userlevel,req.params.userid,res);
        }); 
		
		app.get('/api/GetAdvertisementDetails/:advid', function (req, res) {
			 products.GetAdvertisementDetails(req.params.advid,res);
        }); 
	
		app.post('/api/DeleteAdvertsiment/', function (req, res) {
			 products.DeleteAdvertsiment(req.body,res);
        }); 
		
		app.post('/api/SendAdvertisement/', function (req, res) {
			 products.SendAdvertisement(req.body,res);
        }); 
		
			
		app.get('/api/ListUserOfChatting/:userid', function (req, res) {
			 products.ListUserOfChatting(req.params.userid,res);
        }); 
		
		
		app.post('/api/getBgLocation', function (req, res) {
			 console.log(req.body);
        }); 
			
		app.delete('/api/RemoveBillPayEntry/:paydetailsid', function (req, res) {
			 products.RemoveBillPayEntry(req.params.paydetailsid,res);
        });

		app.delete('/api/DeleteOfficeMiscPayment/:paymasterid', function (req, res) {
			 products.DeleteOfficeMiscPayment(req.params.paymasterid,res);
        });
	
		app.get('/api/ListBillPayEntry/', function (req, res) {
			 products.ListBillPayEntry(req,res);
        });
		
		app.get('/api/getMiscPaymentData/:paymentid', function (req, res) {
			 products.getMiscPaymentData(req.params.paymentid,res);
        });

		app.post('/api/AddOfficeMiscPayments/', function (req, res) {
			 products.AddOfficeMiscPayments(req.body,res);
        }); 
		
		
		app.post('/api/SaveAdvancePaymentdatils', function (req, res) {
			 products.SaveAdvancePaymentdetails(req.body,res);
        }); 
		
		app.get('/api/ListAdvancePaymentMobile/:userid/:userlevel', function (req, res) {
			 products.ListAdvancePayment(req.params.userid,req.params.userlevel,res);
        });
		
		app.get('/api/getAdvancePaymentDetails/:paymentid', function (req, res) {
			 products.getAdvancePaymentDetails(req.params.paymentid,res);
        }); 
		
		app.delete('/api/DeleteAdvancePayment/:paymentid', function (req, res) {
			 products.DeleteAdvancePayment(req.params.paymentid,res);
        }); 
		
		
		
		app.get('/api/ListLoanDetails/:userid/:userlevel', function (req, res) {
			 products.ListLoanDetails(req.params.userid,req.params.userlevel,res);
        });
		
		app.get('/api/getAdvertisementimage/:advid', function (req, res) {
			 products.getAdvertisementimage(req.params.advid,res);
        });
		
		app.post('/api/getGeoLocation/', function (req, res) {
			 products.getGeoLocation(req,res);
		});
		
		app.post('/api/mobile/getDashboardCounts/', function (req, res) {
			 products.getDashboardCounts(req,res);
        });
	
    }
};






// Update - 

/*

 type "-" and save-----

 example: type - 

      -
 -
-


*/