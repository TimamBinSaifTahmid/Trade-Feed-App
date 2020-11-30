  var firebaseConfig = {
    apiKey: "AIzaSyDoFUdL815RsJYK6aNS9tDle-RnpvHFm8k",
    authDomain: "tradefeed-d399f.firebaseapp.com",
    databaseURL: "https://tradefeed-d399f.firebaseio.com",
    projectId: "tradefeed-d399f",
    storageBucket: "tradefeed-d399f.appspot.com",
    messagingSenderId: "934728586568",
    appId: "1:934728586568:web:12aad6ec7693bb2e9c4f7d",
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   $("#loginb1").click(function()
   {
     var email=$("#Email").val();
     var password=$("#password").val();
     if(email!="" && password!=""){

      firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    window.alert("successful");
    // Signed in 
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
     }
     else{
      // window.alert("please fill out all the feild");
     }

   });
