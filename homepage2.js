  var firebaseConfig = {
    apiKey: "AIzaSyDoFUdL815RsJYK6aNS9tDle-RnpvHFm8k",
    authDomain: "tradefeed-d399f.firebaseapp.com",
    databaseURL: "https://tradefeed-d399f.firebaseio.com",
    projectId: "tradefeed-d399f",
    storageBucket: "tradefeed-d399f.appspot.com",
    messagingSenderId: "934728586568",
    appId: "1:934728586568:web:12aad6ec7693bb2e9c4f7d",
    measurementId: "G-T1S5JDMGMM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.onload=function(){
    productRequest();
 }
 function showpopup(){
  document.querySelector(".popup").style.display="flex";
  }
  function closepopup(){
    document.querySelector(".popup").style.display="none";
    }


var btn_no;
var cnt;
var buyerid_list=new Array(100).fill(0);
var temp=0;
function productRequest(){
    window.alert("dhukse");
    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");
    var order_id= new Array();
    var order_tracker=new Array(100).fill(0);
    var isOrderTaken=new Array(100).fill(0);
    var b_id;
    //var cnt;
    //window.alert(uid);
    var fireProductRequestBuyerName = firebase.database().ref('SellerOrder/'+uid);
    fireProductRequestBuyerName.on('value',function(snapshot)
      {
          cnt=snapshot.numChildren();
          //window.alert(cnt);
          
          for(i=1;i<=cnt;i++){
            const j=i;

            //window.alert(j);
            //order_id[j]=snapshot.child('2').val().j;
            order_id[j]=snapshot.child(j).val();
            if(isOrderTaken[order_id[j]] !=0 ) continue;
            isOrderTaken[order_id[j]]++;

            const tc= ++order_tracker[order_id[j]];
           // window.alert(order_tracker[order_id[j]]);
            var amount,productid,buyerid,p_name;
            var sellerproductRequest=firebase.database().ref('PendingOrder/'+order_id[j]);
            sellerproductRequest.on('value',function(snapshot)
           {
               v_cnt=snapshot.numChildren();
               //window.alert(v_cnt);
              var status=snapshot.child(tc).Approval;
              if(status=='true') continue;
              amount= snapshot.child(tc).val().Amount;
              const amnt=amount;
              productid= snapshot.child(tc).val().UserProductId;
              const p_id=productid;
              buyerid= snapshot.child(tc).val().BuyerID;
              const bid=buyerid;

              buyerid_list[++temp]=bid;
              const something=buyerid_list[temp];
              var setBuyerRating=firebase.database().ref('Buyer_rating/');
           setBuyerRating.on('value',function(snapshot)
           {
             
                //window.alert(something);
                var ratting= snapshot.child(something).val().Rate;
                
                var str4=j+'rate';
                document.getElementById(str4).innerHTML="Rating :"+ratting+" /5";
               
             
              
           });
              //window.alert(buyerid_list[temp]);
              //window.alert(productid);
             // window.alert(buyerid);
             
             
              var productName=firebase.database().ref('Product/');
                        productName.on('value',function(snapshot)
                             {
               
                                p_name=snapshot.child(p_id).val();
                                //window.alert(p_name);
                                var str1=j+'name';
                                var str2=j+'amount';
                                
                                //var str3=j+'buyer';
                                //window.alert(j);
                                document.getElementById(str1).innerHTML=p_name;
                                document.getElementById(str2).innerHTML="Amount :"+amnt;
                                //document.getElementById(str3).innerHTML=bid;
                            });

              var productName=firebase.database().ref('User/');
                    productName.on('value',function(snapshot)
                           {
                   
                             B_name=snapshot.child(bid).val().Name;
                                    
                                   
                                    var str3=j+'buyer';

                                    document.getElementById(str3).innerHTML="Buyer :"+B_name;
                          });

               
           });
          // window.alert(order_id[j]);
           
          }
          
      });



    var fireProductRequestBuyerName = firebase.database().ref('User/');
    fireProductRequestBuyerName.on('value',function(snapshot)
      {
          document.getElementById('username').innerHTML=snapshot.child(b_id).val().Name;
          
      });
    }


    const totalStar=5;
   
    function getRating(){
       var ratingControl=document.getElementById('rating-control').value;
     // window.alert(ratingControl);
      return ratingControl;
    }

    
    function doneDeal(btn_id){
      
     // window.alert("duk");
        for(i=1;i<=cnt;i++){
          var str=i+'btn';
          if(btn_id==str){
            btn_no=i;
            break;
          }
        }

        var userid=localStorage.getItem("u_id");
        var oderid=parseInt(userid)+parseInt(buyerid_list[btn_no]);
        window.alert(btn_no);
        var pending_order_modify = firebase.database().ref('PendingOrder/'+oderid+'/'+btn_no);
       pending_order_modify.once("value")
       .then(function(snapshot2){
         const str ='true';
        const amount= snapshot2.val().Amount;
        const approval= snapshot2.val().Approval;
        const b_id= snapshot2.val().BuyerID;
        const distance= snapshot2.val().Distance;
        const o_id= snapshot2.val().OrderID;
        const s_id= snapshot2.val().SellerID;
        const user_Product= snapshot2.val().UserProductId;
        window.alert(user_Product);
        firebase.database().ref('PendingOrder/'+oderid+'/'+btn_no).set({
          Amount:amount,
          Approval:str,
          BuyerID:b_id,
          Distance:distance,
          OrderID:o_id,
          SellerID:s_id,
          UserProductId:user_Product
        })

        });

        var refpendingrate = firebase.database().ref('PendingSellerRating/'+buyerid_list[btn_no]);
        refpendingrate.once("value")
        .then(function(snapshot) {
        var cnt2=snapshot.numChildren()+1;
      firebase.database().ref('PendingSellerRating/'+buyerid_list[btn_no]+'/'+cnt2).set({
      orderID : oderid,
      Status : 0,
      SellerID : userid
    });
    });
    }

    function rate(){
      var uid=localStorage.getItem("u_id");
      var rate=getRating();
     // window.alert(rate);
      var odrid=parseInt(uid)+parseInt(buyerid_list[btn_no]);
      var ref1 = firebase.database().ref('DoneOrder');
    ref1.once("value")
    .then(function(snapshot) {
    var cnt2=snapshot.numChildren()+1;
    if(cnt2==1){
      firebase.database().ref('DoneOrder/'+cnt2).set({
        orderID : odrid,
        BuyerRating : rate,
        SellerRating : 0
      });
    }
    else{
    for(var i=1;i<=cnt2-1;i++){
      var oid=snapshot.child(i).val().orderID;
      if(oid==odrid){
        
        var b_rate=snapshot.child(i).val().BuyerRating;
       // window.alert(b_rate);
        var avg_rate= (parseFloat(b_rate)+parseFloat(rate))/2;
       // window.alert(avg_rate);
        firebase.database().ref('DoneOrder/'+i).set({
          orderID : odrid,
          BuyerRating : avg_rate,
          SellerRating : 0
        });

      }
      else if(i==cnt2-1 && oid!=odrid){
        
        firebase.database().ref('DoneOrder/'+i).set({
          orderID : odrid,
          BuyerRating : rate,
          SellerRating : 0
        });
      }
    }
  }
  
});

var refbuyerrating = firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]);
    refbuyerrating.once("value")
    .then(function(snapshot) {
   var buyerchild=snapshot.numChildren();
   
   if(buyerchild==0){
    firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]).set({
      Rate : rate,
      Count : 1
    });
   }
   else{
     var buyerrate=snapshot.val().Rate;
     var ratecount=snapshot.val().Count;
     
  // window.alert(ratecount);
  // window.alert(buyerrate);
  // window.alert(rate);
    buyerrate=((parseFloat(ratecount)*parseFloat(buyerrate))+parseFloat(rate))/(parseFloat(ratecount)+1);
    ratecount++;
  //  window.alert(buyerrate);
    firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]).set({
      Rate : buyerrate,
      Count : ratecount
    });
    }
   
  
});
    }
    
    
