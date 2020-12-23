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
        //window.location.href="HomePage.html";
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
        //var ref2=firebase.database.ref('User_Email_Id')
        var refuser = firebase.database().ref('User_Email_Id/');
        refuser.on('value',function(snapshot)
          {
            var count=snapshot.numChildren();
            window.alert(count);
            for( var i=1;i<=count;i++){
              var v_email=snapshot.child(i).val().EMAIL;
              if(v_email==userEmail){
              var userid=snapshot.child(i).val().value;
                localStorage.setItem("u_id",userid);
              }
            }
            
           
           // console.log("count")
           // var user1 = snapshot.val('/1').value;
            //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
           // window.alert(user1);
         //console.log(snapshot.numChildren());
         //window.location.href="HomePage.html";
          });
      window.location.href="HomePage.html";
      console.log(user)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(error)
    });
   
    


}
function fn3(){
  var count;
  var emailAddress= document.getElementById("emailAddress").value;
  var name= document.getElementById("name").value;
  var address= document.getElementById("address").value;
  var contactNo= document.getElementById("contactNo").value;
  var password1= document.getElementById("password1").value;
  //window.alert(emailAddress);
  var ref1 = firebase.database().ref('User');
ref1.once("value")
  .then(function(snapshot) {
    count=snapshot.numChildren()+1;
    firebase.database().ref('User/'+count).set({
      EmailAddress:emailAddress,
      Name:name,
      Address:address,
      ContactNo:contactNo,
      Password:password1
      
 });
 firebase.auth().createUserWithEmailAndPassword(emailAddress, password1)
 .then((user) => {
   window.alert(emailAddress);
   console.log(user)
 })
 .catch((error) => {
   var errorCode = error.code;
   var errorMessage = error.message;
   // ..
   window.alert("asds")
   console.log(error)
 });
    console.log(snapshot.numChildren()); 

    firebase.database().ref('User_Email_Id/'+count+'/').set({
      EMAIL:emailAddress,
      value:count
            
 });
 //console.log(snapshot.numChildren());
  });


  
}

function signout(){
  
  const signoutV=firebase.auth().signOut();
  if(signoutV){
    window.alert("work");
    window.location.href="login.html";
  }
}