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
  var serviceReceiverAddress= new Array(2).fill(0);
  var serviceProviderAddress= new Array(6).fill(0);
  var distances= new Array(6).fill(0);
  var name= new Array(6).fill(0);
  var amounts= new Array(6).fill(0);
  var prices= new Array(6).fill(0);
  var ratings= new Array(6).fill(0);
    //var order_tracker=new Array(100).fill(0);
  
  window.onload=function(){
    retrive_ProductSeller_Info();
 }
 

  function seller_email(id){

    var btn_id=parseInt(id);
    var sell_id=localStorage.getItem(btn_id);
    localStorage.removeItem("s_id");
    localStorage.setItem("s_id",sell_id);
    window.location.href="product_order.html";
  }
    /*
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
        localStorage.removeItem("s_id");
        localStorage.setItem("s_id",sellerid);
       /* var reforder=firebase.database().ref('PendingOrder');
          reforder.once("value")
  .then(function(snapshot) {
    var count=snapshot.numChildren()+1;
    window.alert(count);
    firebase.database().ref('PendingOrder/'+count).set({
        orderID : count
        
      
    });/*
    
    window.location.href="product_order.html";
//});
    

    break;
        }
      }
    });
  }
  */
  function retrive_ProductSeller_Info(){
    //var email_id=document.getElementById(email).value;
    //window.alert(email);
    var temp=0;
    var uid=localStorage.getItem("u_id");
    var provider_Id_List=firebase.database().ref('serviceProviderlist/');
    var retrive_provider_id = firebase.database().ref('User/');
    var retrive_provider_information = firebase.database().ref('UserService/');
    var retrive_ServiceName =firebase.database().ref("Product/");
    provider_Id_List.on('value',function(snapshot4){
    retrive_provider_id.on('value',function(snapshot)
    {
      retrive_provider_information.on('value',function(snapshot1){
        retrive_ServiceName.on('value',function(snapshot2){
        
      
         var product_Seller_Count=snapshot4.numChildren();
          for(var j=1;j<=product_Seller_Count;j++){
           
          var product_seller_id=snapshot4.child(j).val();
          //window.alert(product_seller_id);
           seller_Product_Count= snapshot1.child(product_seller_id).numChildren();
           var product_id=localStorage.getItem( "product_id");
         product_Name= snapshot2.child(product_id).val();
        
        for(var i=1;i<=seller_Product_Count;i++){
          
         retreived_Product_Name =snapshot1.child(product_seller_id).child(i).val().ServiceName;
          if(retreived_Product_Name==product_Name){

            ++temp;
            //window.alert(retreived_Product_Name);
            
              localStorage.removeItem(temp);
              localStorage.setItem(temp,product_seller_id);
            
           
           
             serviceReceiverAddress[1]=snapshot.child(uid).val().Address;   
             window.alert(serviceReceiverAddress[1]);   
            serviceProviderAddress[temp]=snapshot.child(product_seller_id).val().Address;
            window.alert(serviceProviderAddress[temp]);
            name[temp]=snapshot.child(product_seller_id).val().Name;
             amounts[temp]=snapshot1.child(product_seller_id).child(i).val().Amount;
            prices[temp]=snapshot1.child(product_seller_id).child(i).val().Price;
            
            sortDistance();
            
           //document.getElementById(temp+'seller_email').innerHTML=snapshot.child(product_seller_id).val().EmailAddress;
           ///document.getElementById (temp+'Available_amount').innerHTML=snapshot1.child(product_seller_id).child(i).val().Amount;
           //document.getElementById(temp+'price').innerHTML=snapshot1.child(product_seller_id).child(i).val().Price;
           //document.getElementById(temp+'Seller_rating').innerHTML=0;
          }
          
        }
          
      } 

     });   

   });

  });

 });
    
}
      
function sortDistance(){
  
  var retrieve_distance =firebase.database().ref("Distance_From_center/");
  retrieve_distance.on('value',function(snapshot){
     for(var i=1;i<=5;i++){
       distances[i]=snapshot.child(serviceProviderAddress[i]).val()+snapshot.child(serviceReceiverAddress[1]).val();
       //window.alert(sellerAddress[i]));
      // window.alert(snapshot.child(buyerAddress[1]).val());
      if(i==5){
        sort();
      } 
      } 
      
  });

}  
function sort(){
  
  for(var i=1;i<=2;i++){
    for(var j=1;j<2;j++){
      if(distances[j]>distances[j+1]){
        var temp=distances[j];
        var temp2=name[j];
        var temp3=amounts[j];
        var temp4=prices[j];
        distances[j]=distances[j+1];
        name[j]=name[j+1];
        amounts[j]=amounts[j+1];
        prices[j]=prices[j+1];
        distances[j+1]=temp;
        name[j+1]=temp2;
        amounts[j+1]=temp3;
        prices[j+1]=temp4;
      }
    }if(i==2){
    set_val();
    }
  }
}
function set_val(){
  
  for(var i=1;i<=2;i++){
     
    document.getElementById(i+'seller_email').innerHTML=name[i];
    document.getElementById (i+'Available_amount').innerHTML=amounts[i];
    document.getElementById(i+'price').innerHTML=prices[i];
    document.getElementById(i+'distance').innerHTML=distances[i];
    document.getElementById(i+'Seller_rating').innerHTML=0;
    //window.alert(amounts[i]);
  }
}