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
    rateSeller();
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

  function getProductid(id){
    //window.alert(id);
    localStorage.setItem("product_id",id);
    
    //return id;
  }

  function showpopup(){
    document.querySelector(".popup").style.display="flex";
    }
    function closepopup(){
      document.querySelector(".popup").style.display="none";
      }
  
  


  


function rateSeller(){
  window.alert("aage");
  var userid=localStorage.getItem("u_id");
  var firesellerRate = firebase.database().ref('PendingSellerRating/'+userid+'/');
    
    
  firesellerRate.on('value',function(snapshot)
    {
      var childCnt=snapshot.numChildren();
      for(var i=1;i<=childCnt;i++){
        window.alert("dhuk");
        var stat = snapshot.child(i).val().Status;
        var sellerid=snapshot.child(i).val().SellerID;
        var odrid = snapshot.child(i).val().orderID;
        if(stat==0){
          localStorage.removeItem("Buyer_id");
          localStorage.setItem("Buyer_id",userid);
          localStorage.removeItem("Seller_id");
          localStorage.setItem("Seller_id",sellerid);
          localStorage.removeItem("Order_id");
          localStorage.setItem("Order_id",odrid);
          
          showpopup();
          
          break;
        }
      }
      
      
        
    
        
    });

}










const totalStar=5;
   
    function getRating(){
       var ratingControl=document.getElementById('rating-control').value;
      return ratingControl;
    }


    function rate(){
      var bid=localStorage.getItem("Buyer_id");
      var o_id=localStorage.getItem("Order_id");
      var oid;
      var sRate;
      var bRate;
      const rate=getRating();
     // window.alert(rate);
     var ref2 = firebase.database().ref('DoneOrder');
     ref2.on('value',function(snapshot){
        var childcount=snapshot.numChildren();
        for(var i=1;i<=childcount;i++){
          const j=i;
         oid= snapshot.child(j).val().orderID;
        sRate=snapshot.child(j).val().SellerRating;
        bRate=snapshot.child(j).val().BuyerRating;
          const avg1_rate= (parseFloat(sRate)+parseFloat(rate))/2;
        if(o_id==oid && sRate==0){
          
          window.alert("rated if");
      firebase.database().ref('DoneOrder/'+j+'/'+'SellerRating').set(
      
       rate
  );
  
         }
         else if(o_id==oid && sRate>0){
          //var s_rate = snapshot.child(j).val().SellerRating;
          
          window.alert(avg1_rate);
          window.alert("rated else if");
         // snapshot.child(j).child('SellerRating').set(avg1_rate);
      firebase.database().ref('DoneOrder/'+j+'/').set({
        orderID : oid,
        BuyerRating : bRate,
        SellerRating : avg1_rate
      });
        
         }
        }
     });
      
     


var refbuyerrating = firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]);
    refbuyerrating.once("value")
    .then(function(snapshot) {
   var buyerchild=snapshot.numChildren();
   
   window.alert(buyerchild);
   if(buyerchild==0){
    firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]).set({
      Rate : rate
    });
   }
   else{
     var buyerrate=snapshot.val().Rate;
     window.alert(buyerrate);
    buyerrate=(buyerrate+rate)/2;
    firebase.database().ref('Buyer_rating/'+buyerid_list[btn_no]).set({Rate : buyerrate});
    }
   
  
});
    }
