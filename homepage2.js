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
    var order_tracker=new Array(100).fill(0);
    var b_id;
    var cnt;
    //window.alert(uid);
    var fireProductRequestBuyerName = firebase.database().ref('SellerOrder/'+uid);
    fireProductRequestBuyerName.on('value',function(snapshot)
      {
          cnt=snapshot.numChildren();
          //window.alert(cnt);
          
          for(i=1;i<=cnt;i++){
            const j=i;
            //window.alert(j);
            //order_id[j]=snapshot.child('2').val().j;
            order_id[j]=snapshot.child(j).val();
            const tc= ++order_tracker[order_id[j]];
           // window.alert(order_tracker[order_id[j]]);
            var amount,productid,buyerid,p_name;
            var sellerproductRequest=firebase.database().ref('PendingOrder/'+order_id[j]);
            sellerproductRequest.on('value',function(snapshot)
           {
               v_cnt=snapshot.numChildren();
               //window.alert(v_cnt);
              amount= snapshot.child(tc).val().Amount;
              const amnt=amount;
              productid= snapshot.child(tc).val().UserProductId;
              const p_id=productid;
              buyerid= snapshot.child(tc).val().BuyerID;
              const bid=buyerid;
              window.alert(amount);
              //window.alert(productid);
             // window.alert(buyerid);
             
             
              var productName=firebase.database().ref('Product/');
                        productName.on('value',function(snapshot)
                             {
               
                                p_name=snapshot.child(p_id).val();
                                //window.alert(p_name);
                                var str1=j+'name';
                                var str2=j+'amount';
                                //var str3=j+'buyer';
                                //window.alert(j);
                                document.getElementById(str1).innerHTML=p_name;
                                document.getElementById(str2).innerHTML=amnt;
                                //document.getElementById(str3).innerHTML=bid;
                            });

              var productName=firebase.database().ref('User/');
                    productName.on('value',function(snapshot)
                           {
                   
                             B_name=snapshot.child(bid).val().Name;
                                    
                                   
                                    var str3=j+'buyer';

                                    document.getElementById(str3).innerHTML=B_name;
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