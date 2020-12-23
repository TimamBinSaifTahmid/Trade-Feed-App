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
    getprofile();
}


function getprofile(){
    var uid=localStorage.getItem("u_id");
      window.alert(uid);
    var firepro = firebase.database().ref('User/');
    
    
    firepro.on('value',function(snapshot)
      {
        
        
          document.getElementById('username').innerHTML=snapshot.child(uid).val().Name;
          document.getElementById('useraddress').innerHTML=snapshot.child(uid).val().Address;
          document.getElementById('useremail').innerHTML=snapshot.child(uid).val().EmailAddress;
          document.getElementById('usercontactno').innerHTML=snapshot.child(uid).val().ContactNo;
        
        
       
        
        //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
     //console.log(snapshot.numChildren());
    // window.location.href="HomePage.html";
      });
      
}