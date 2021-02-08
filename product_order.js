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
   seller_profile();
}


function showpopup(){
  document.querySelector(".popup").style.display="flex";
  }
  function closepopup(){
    document.querySelector(".popup").style.display="none";
    }




  function seller_profile(){
    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");
    var productid=localStorage.getItem("product_id");
    var amount;
    var price;
    var sold;
    var rating;
    var firepro1 = firebase.database().ref('User/');
    var firepro2 = firebase.database().ref('UserProduct/'+sid);

    
    firepro1.on('value',function(snapshot)
      {
        
        
          document.getElementById('username').innerHTML=snapshot.child(sid).val().Name;
          document.getElementById('useraddress').innerHTML=snapshot.child(sid).val().Address;
          document.getElementById('useremail').innerHTML=snapshot.child(sid).val().EmailAddress;
          
      });
      firepro2.on('value',function(snapshot)
      {
        
         var childcnt= snapshot.numChildren();
         for(var i=1;i<=childcnt;i++){
           var pdtid=snapshot.child(i).val().ProductName;
           if(productid==pdtid){
          document.getElementById('amount').innerHTML=snapshot.child(i).val().Amount;
          document.getElementById('price').innerHTML=snapshot.child(i).val().Price;
          document.getElementById('sold').innerHTML=snapshot.child(i).val().sold;
           }
         }
          
      });
    }

function orderProduct(){
    var amount=document.getElementById("amount").value;
    var productid=localStorage.getItem("product_id");
   window.alert(productid);

    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");
    
    var cnt;
    cnt=parseInt(sid)+parseInt(uid);
    var reforder=firebase.database().ref('PendingOrder/'+cnt);
    reforder.once("value")
.then(function(snapshot) {
var count=snapshot.numChildren()+1;
 //cnt=parseInt(count);

window.alert(count);
firebase.database().ref('PendingOrder/'+cnt+'/'+count).set({
  OrderID : cnt,
  Approval : "false",
  UserProductId : productid,
 SellerID: sid,
 BuyerID : uid,
 Distance : "100 m",
  Amount : amount
});

});

var refpolist=firebase.database().ref('PendingOrderList');
    refpolist.once("value")
.then(function(snapshot) {
var count=snapshot.numChildren()+1;

firebase.database().ref('PendingOrderList/'+count).set(
 cnt
   
);

});


var firesellerOrder=firebase.database().ref('SellerOrder/'+sid);
firesellerOrder.once("value")
.then(function(snapshot) {
var vcount=snapshot.numChildren()+1;
 

window.alert(vcount);
firebase.database().ref('SellerOrder/'+sid+'/'+vcount).set(
  cnt
);

});

}


