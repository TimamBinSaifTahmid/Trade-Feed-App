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
    productRequest();
 }



function productRequest(){
    window.alert("dhukse");
    var sid=localStorage.getItem("s_id");
    var uid=localStorage.getItem("u_id");
    var order_id= new Array();
    var b_id;
    var cnt;
    //window.alert(uid);
    var fireProductRequestBuyerName = firebase.database().ref('SellerOrder/'+uid);
    fireProductRequestBuyerName.on('value',function(snapshot)
      {
          cnt=snapshot.numChildren();
          //window.alert(cnt);
          for(i=1;i<=cnt;i++){
            //order_id[i]=snapshot.child('2').val().i;
            order_id[i]=snapshot.child(i).val();
            //window.alert(order_id[i]);
            var amount,productid,buyerid,p_name;
            var sellerproductRequest=firebase.database().ref('PendingOrder/'+order_id[i]);
            sellerproductRequest.on('value',function(snapshot)
           {
               v_cnt=snapshot.numChildren();
               //window.alert(v_cnt);
              amount= snapshot.child(v_cnt).val().Amount;
              productid= snapshot.child(v_cnt).val().UserProductId;
              buyerid= snapshot.child(v_cnt).val().BuyerID;
             // window.alert(amount);
              window.alert(productid);
             // window.alert(buyerid);
              var productName=firebase.database().ref('Product/');
                        productName.on('value',function(snapshot)
                             {
               
                                p_name=snapshot.child(productid).val();
                                window.alert(p_name);
                                document.getElementById(i+"name").innerHTML=p_name;
                                document.getElementById(i+"amount").innerHTML=amount;
                                document.getElementById(i+"buyer").innerHTML=buyerid;
                            });

               
           });
          }
          
      });



    var fireProductRequestBuyerName = firebase.database().ref('User/');
    fireProductRequestBuyerName.on('value',function(snapshot)
      {
          document.getElementById('username').innerHTML=snapshot.child(b_id).val().Name;
          
      });
    }