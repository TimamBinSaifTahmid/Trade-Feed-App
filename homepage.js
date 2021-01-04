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
    retriveProduct();
 }

  function retriveProduct(){
    
    var fireRetProduct = firebase.database().ref('Product/');
    
    
    fireRetProduct.on('value',function(snapshot)
      {
        var childCnt=snapshot.numChildren();
        for(i=201;i<(201+childCnt);i++){
            document.getElementById(i).innerHTML=snapshot.child(i).val();
        }
          
      
          
      });
  }