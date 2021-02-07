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
    serviceinfo();
    productinfo();
}


function getprofile(){
    var uid=localStorage.getItem("u_id");
    //  window.alert(uid);
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


function serviceinfo(){
  var usrid=localStorage.getItem("u_id");
  
  var addserviceinfo= firebase.database().ref('UserService/'+usrid);
  addserviceinfo.on('value',function(snapshot)
      {
        var childencnt=snapshot.numChildren();
        if(childencnt>=2){
        for(var i=childencnt,j=1;i>childencnt-2;i--,j++){
          
          var s_name=snapshot.child(i).val().ServiceName;
          var wage=snapshot.child(i).val().Wage;
          var skill=snapshot.child(i).val().Skill;
          var experience=snapshot.child(i).val().Experience;
          
          var str1=j+'Service_name';
          var str2=j+'wage';
          var str3=j+'skill';
          var str4=j+'experience';
          var str5=j+'rate';
          
          document.getElementById(str1).innerHTML=s_name;
          document.getElementById(str2).innerHTML=wage;
          document.getElementById(str3).innerHTML=skill;
          document.getElementById(str4).innerHTML=experience;
          document.getElementById(str5).innerHTML="0";
          
        }
      }
      });
}



function productinfo(){
  var userid=localStorage.getItem("u_id");
  
  var addproductinfo= firebase.database().ref('UserProduct/'+userid);
  addproductinfo.on('value',function(snapshot)
      {
        var childencnt=snapshot.numChildren();
        if(childencnt>=2){
        for(var i=childencnt,j=1;i>childencnt-2;i--,j++){
          
          var p_name=snapshot.child(i).val().ProductName;
          var amount=snapshot.child(i).val().Amount;
          var price=snapshot.child(i).val().Price;
          var sold=snapshot.child(i).val().sold;
          
          var str1=j+'product_name';
          var str2=j+'Amount';
          var str3=j+'price';
          var str4=j+'sold';
          var str5=j+'rate';
          
          document.getElementById(str1).innerHTML=p_name;
          document.getElementById(str2).innerHTML=amount;
          document.getElementById(str3).innerHTML=price;
          document.getElementById(str4).innerHTML=sold;
          document.getElementById(str5).innerHTML="0";
          
        }
      }
      });
}

