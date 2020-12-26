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

  function seller_email(email){
    //var email_id=document.getElementById(email).value;
    //window.alert(email);
    
    var retrive_seller_id = firebase.database().ref('User_Email_Id/');

    retrive_seller_id.on('value',function(snapshot)
    {
      var count1=snapshot.numChildren();
      //window.alert(count);
      for( var i=1;i<=count1;i++){
        var v_email=snapshot.child(i).val().EMAIL;
        
        if(v_email==email){
          //  window.alert(email);
        var sellerid=snapshot.child(i).val().value;
        localStorage.setItem("s_id",sellerid);
       /* var reforder=firebase.database().ref('PendingOrder');
          reforder.once("value")
  .then(function(snapshot) {
    var count=snapshot.numChildren()+1;
    window.alert(count);
    firebase.database().ref('PendingOrder/'+count).set({
        orderID : count
        
      
    });*/
    
    window.location.href="product_order.html";
//});
    

    break;
        }
      }
    });
  }