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
  var serviceid=localStorage.getItem("service_id");
  var oid=parseInt(sid)+parseInt(uid);
  var amount;
  var price;
  var sold;
  var rating;
  var firepro1 = firebase.database().ref('User/');
  var firepro2 = firebase.database().ref('UserService/'+sid);
  var firepro3=firebase.database().ref('Seller_rating/');
  var firepro4 = firebase.database().ref('Service/');
  
  firepro1.on('value',function(snapshot)
    {
      firepro2.on('value',function(snapshot2){
        firepro3.on('value',function(snapshot3){
          firepro4.on('value',function(snapshot4){
          var childcnt= snapshot2.numChildren();
          for(var i=1;i<=childcnt;i++){
            
            var srvid=snapshot2.child(i).val().ServiceName;
            var srvname=snapshot4.child(serviceid).val();
            if(srvname==srvid){
                  window.alert("2nd ifor");
                  document.getElementById('name').innerHTML=snapshot.child(sid).val().Name;
                  document.getElementById('address').innerHTML=snapshot.child(sid).val().Address;
                  document.getElementById('email').innerHTML=snapshot.child(sid).val().EmailAddress;
                  document.getElementById('wage').innerHTML=snapshot2.child(i).val().Wage;
                  document.getElementById('skill').innerHTML=snapshot2.child(i).val().Skill;
                 document.getElementById('Experience').innerHTML=snapshot2.child(i).val().Experience;
                 document.getElementById('rate').innerHTML=snapshot3.child(sid).val().Rate;

            }
          }
        });
      });
      });
      
        
        
  });
}

function orderService(){
  //var amount=document.getElementById("amount").value;
  var productid=localStorage.getItem("product_id");
 window.alert(productid);

  var sid=localStorage.getItem("s_id");
  var uid=localStorage.getItem("u_id");
  var distnce=localStorage.getItem("distance");
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
Distance : distnce,
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


