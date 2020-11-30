// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  firebase.auth().onAuthStateChanged(function(user)
    {
      console.log(user)
      if(user)
      {
        window.location.href="HomePage.html";
      }
    }
  )
function login1(){
  // window.alert("asd")
    var userEmail= document.getElementById("Email").value;
    var userPassword= document.getElementById("password").value;
    /*window.alert(userEmail+userPassword);*/
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(error)
    });
   
    
}
