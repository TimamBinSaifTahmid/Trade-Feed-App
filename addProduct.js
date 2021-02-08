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
var d;
function decript(){
     d=document.getElementById("Service_name");
    
}

function productSellerlist(){
  var flag=false;
  var uid=localStorage.getItem("u_id");
var refpolist=firebase.database().ref('ProductSellerlist');
    refpolist.once("value")
.then(function(snapshot) {
var count=snapshot.numChildren()+1;

for(var i=1;i<count;i++){
  window.alert("for dhuse");
  var s_id=snapshot.child(i).val();
  window.alert(s_id);
  if(s_id==uid){
    window.alert("if dhukse");
      flag=true;
      break;
  }
}
if(flag==false){
  
firebase.database().ref('ProductSellerlist/'+count).set(
 uid
   
);
}
});
}


function addProduct(){
  var sid=localStorage.getItem("s_id");
  var uid=localStorage.getItem("u_id");

    var Amount= document.getElementById("Amount").value;
    var Price= document.getElementById("Price").value;
    //var userPassword= document.getElementById("Price").value;
    var AddInfo= document.getElementById("AddInfo").value;
    window.alert("OK");
    var ref1 = firebase.database().ref('UserProduct/'+uid);
    ref1.once("value")
  .then(function(snapshot) {
    count=snapshot.numChildren()+1;
    firebase.database().ref('UserProduct/'+uid+'/'+count).set({
      ProductName:d.value,  
      Amount:Amount,
      Price:Price,
      sold:0,
      Additional_Info:AddInfo
      
 });

    console.log(snapshot.numChildren()); 
  });
}