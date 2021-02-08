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
  
  function retrive_ProductSeller_Info(){
    //var email_id=document.getElementById(email).value;
    //window.alert(email);
    var temp=0;
    var uid=localStorage.getItem("u_id");
    var seller_id_list=firebase.database().ref('ProductSellerlist/');
    var retrive_seller_id = firebase.database().ref('User/');
    var retrive_seller_information = firebase.database().ref('UserProduct/');
    var retrive_Productname =firebase.database().ref("Product/")
    seller_id_list.on('value',function(snapshot4){
    retrive_seller_id.on('value',function(snapshot)
    {
      retrive_seller_information.on('value',function(snapshot1){
        retrive_Productname.on('value',function(snapshot2){
         var product_Seller_Count=snapshot4.numChildren();
          for(var j=1;j<=product_Seller_Count;i++){
          var product_seller_id=snapshot4.child(j).val();
           seller_Product_Count= snapshot1.child(product_seller_id).numChildren();
           var product_id=localStorage.getItem( "product_id");
         product_Name= snapshot2.child(product_id).val();
         for(var i=1;i<=seller_Product_Count;i++){
          retreived_Product_Name =snapshot1.child(product_seller_id).child(i).val().ProductName;
          if(retreived_Product_Name= product_Name){

            ++temp;
            
           
            temp+'price';
            temp+'Seller_rating';
           document.getElementById(temp+'seller_email').innerHTML=snapshot.child(product_seller_id).val().EmailAddress;
           document.getElementById (temp+'Available_amount').innerHTML=snapshot1.child(product_seller_id).child(i).val().Amount;
           document.getElementById(temp+'price').innerHTML=snapshot1.child(product_seller_id).child(i).val().Price;
           document.getElementById(temp+'Seller_rating').innerHTML=0;
          }
          
        }
          
      } 

     });   

   });

  });

 });
    
}
      
  