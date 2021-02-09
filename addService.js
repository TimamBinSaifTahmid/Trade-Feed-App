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
     d=document.getElementById("sname");
    
}

function serviceProviderlist(){
  var flag=false;
  var uid=localStorage.getItem("u_id");
var refpolist=firebase.database().ref('serviceProviderlist');
    refpolist.once("value")
.then(function(snapshot) {
var count=snapshot.numChildren()+1;
for(var i=1;i<count;i++){
  var s_id=snapshot.child(i).val();
  if(s_id==uid){
      flag=true;
      break;
  }
}
if(flag==false){
  
firebase.database().ref('serviceProviderlist/'+count).set(
 uid
   
);
}
});
}


function addService(){
  var sid=localStorage.getItem("s_id");
  var uid=localStorage.getItem("u_id");

    var Wage= document.getElementById("wage").value;
    var skill= document.getElementById("skill").value;
    var experience= document.getElementById("experience").value;
    //var userPassword= document.getElementById("Price").value;
    var AddInfo= document.getElementById("AddInfo").value;
    window.alert(d.value);
    var refservice = firebase.database().ref('UserService/'+uid);
    refservice.once("value")
  .then(function(snapshot) {
    count=snapshot.numChildren()+1;
   // window.alert(uid);
    firebase.database().ref('UserService/'+uid+'/'+count).set({
      ServiceName: d.value,  
      Wage: Wage,
      Skill: skill,
      Experience: experience,
      Additional_Info: AddInfo
      
 });

    //console.log(snapshot.numChildren()); 
  });
}