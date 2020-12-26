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

  function seller_profile(){
    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");

    var firepro = firebase.database().ref('User/');
    
    
    firepro.on('value',function(snapshot)
      {
        
        
          document.getElementById('username').innerHTML=snapshot.child(sid).val().Name;
          document.getElementById('useraddress').innerHTML=snapshot.child(sid).val().Address;
          document.getElementById('useremail').innerHTML=snapshot.child(sid).val().EmailAddress;
          
      });
    }

function orderProduct(){
    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");

    var reforder=firebase.database().ref('PendingOrder');
    reforder.once("value")
.then(function(snapshot) {
var count=snapshot.numChildren()+1;
var cnt=parseInt(count);
cnt=cnt+parseInt(sid)+parseInt(uid);
window.alert(count);
firebase.database().ref('PendingOrder/'+cnt).set({
  OrderID : cnt,
  Approval : "false",
  UserProductId : "aaa",
 SellerID: sid,
 BuyerID : uid,
 Distance : "100 m"

});

});
  }