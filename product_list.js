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
var serviceReceiverAddress = new Array(2).fill(0);
var serviceProviderAddress = new Array(6).fill(0);
var distances = new Array(6).fill(0);
var sellernames = new Array(6).fill(0);
var Wages = new Array(6).fill(0);
var prices = new Array(6).fill(0);
var ratings = new Array(6).fill(0);
//var order_tracker=new Array(100).fill(0);

window.onload = function () {
  retrive_ProductSeller_Info();
}


function seller_email(id) {

  var btn_id = parseInt(id);
  var sell_id = localStorage.getItem(btn_id);
  var dstr = 'd' + parseInt(id);
  var distnce = localStorage.getItem(dstr);
  localStorage.removeItem("s_id");
  localStorage.setItem("s_id", sell_id);
  localStorage.removeItem("distance");
  localStorage.setItem("distance", distnce);
  window.location.href = "product_order.html";
}




function retrive_ProductSeller_Info() {
  //var email_id=document.getElementById(email).value;
  //window.alert(email);
  var temp = 0;
  var uid = localStorage.getItem("u_id");
  var seller_id_list = firebase.database().ref('ProductSellerlist/');
  var retrive_seller_id = firebase.database().ref('User/');
  var retrive_seller_information = firebase.database().ref('UserProduct/');
  var retrive_Productname = firebase.database().ref('Product/');
  seller_id_list.on('value', function (snapshot4) {
    retrive_seller_id.on('value', function (snapshot) {
      retrive_seller_information.on('value', function (snapshot1) {
        retrive_Productname.on('value', function (snapshot2) {


          var product_Seller_Count = snapshot4.numChildren();
         
          for (var j = 1; j <= product_Seller_Count; j++) {

            var product_seller_id = snapshot4.child(j).val();
            //window.alert(product_seller_id);
           var seller_Product_Count = snapshot1.child(product_seller_id).numChildren();
           // window.alert(seller_Product_Count +' '+product_seller_id);
            var product_id = localStorage.getItem("product_id");
            
          var product_Name = snapshot2.child(product_id).val();

            for (var i = 1; i <= seller_Product_Count; i++) {
                  //   window.alert(product_seller_id +' '+seller_Product_Count);
            var  product_Name1 = snapshot1.child(product_seller_id).child(i).val().ProductName;
             // window.alert(product_Name1 +' '+product_Name);
              if (product_Name1 == product_Name) {

                ++temp;
              // window.alert(temp);

                localStorage.removeItem(temp);
                localStorage.setItem(temp, product_seller_id);



                serviceReceiverAddress[1] = snapshot.child(uid).val().Address;
                // window.alert(serviceReceiverAddress[1]);   
                serviceProviderAddress[temp] = snapshot.child(product_seller_id).val().Address;
                // window.alert(serviceProviderAddress[temp]);
                sellernames[temp] = snapshot.child(product_seller_id).val().Name;
               // window.alert(sellernames[temp]);
                Wages[temp] = snapshot1.child(product_seller_id).child(i).val().Amount;
                prices[temp] = snapshot1.child(product_seller_id).child(i).val().Price;
           //   window.alert(serviceProviderAddress[temp]+' '+sellernames[temp]+' '+Wages[temp]+' '+prices[temp]);
                

                //document.getElementById(temp+'seller_email').innerHTML=snapshot.child(product_seller_id).val().EmailAddress;
                ///document.getElementById (temp+'Available_amount').innerHTML=snapshot1.child(product_seller_id).child(i).val().Amount;
                //document.getElementById(temp+'price').innerHTML=snapshot1.child(product_seller_id).child(i).val().Price;
                //document.getElementById(temp+'Seller_rating').innerHTML=0;
              }

            }
            if(j == product_Seller_Count){
             // window.alert('kam hosse'+temp);
              sortDistance(temp);
              
          }
          }

        });

      });

    });

  });

}

function sortDistance(loopcnt) {
 // window.alert(loopcnt);
  var retrieve_distance = firebase.database().ref("Distance_From_center/");
  retrieve_distance.on('value', function (snapshot) {
    for (var k = 1; k <= loopcnt; k++) {

      // window.alert(serviceProviderAddress[i]);
      // window.alert(serviceReceiverAddress[1]);

       if(serviceProviderAddress[k] == serviceReceiverAddress[1]) {
         distances[k] = 0;
       }
       else {
         distances[k] = snapshot.child(serviceProviderAddress[k]).val() + snapshot.child(serviceReceiverAddress[1]).val();
       }

      distances[k] = snapshot.child(serviceProviderAddress[k]).val() + snapshot.child(serviceReceiverAddress[1]).val();
      
      // window.alert(sellernames[k]);



      //window.alert(sellerAddress[i]));
      // window.alert(snapshot.child(buyerAddress[1]).val());
      if (k == loopcnt) {
        sort(loopcnt);
        // break;
      }
    }


  });



}
function sort(loopcnt) {
  //window.alert(loopcnt);
  for (var i = 1; i <= loopcnt; i++) {
    for (var j = 1; j < loopcnt; j++) {
      if (distances[j] > distances[j + 1]) {

        var temp = distances[j];
        var temp2 = sellernames[j];
        var temp3 = Wages[j];
        var temp4 = prices[j];

        distances[j] = distances[j + 1];
        sellernames[j] = sellernames[j + 1];
        Wages[j] = Wages[j + 1];
        prices[j] = prices[j + 1];

        distances[j + 1] = temp;
        sellernames[j + 1] = temp2;
        Wages[j + 1] = temp3;
        prices[j + 1] = temp4;
      }
    } if (i == loopcnt) {
      set_val(loopcnt);
    }
  }
}
function set_val(loopcnt) {
//window.alert(loopcnt);
  for (var m = 1; m <= loopcnt; m++) {

    document.getElementById(m + 'seller_email').innerHTML = sellernames[m];
    document.getElementById(m + 'Available_amount').innerHTML = Wages[m];
    document.getElementById(m + 'price').innerHTML = prices[m];
    document.getElementById(m + 'distance').innerHTML = distances[m];
    document.getElementById(m + 'Seller_rating').innerHTML = 0;
    //window.alert(amounts[i]);
    var dstr1 = 'd' + m;
    localStorage.removeItem(dstr1);
    localStorage.setItem(dstr1, distances[m]);
    if(m==loopcnt)
      window.alert("Database Successfully loaded");

  }
}