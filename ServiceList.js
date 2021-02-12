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
var providernames = new Array(6).fill(0);
var wage = new Array(6).fill(0);
var skill = new Array(6).fill(0);
var ratings = new Array(6).fill(0);
//var order_tracker=new Array(100).fill(0);

window.onload = function () {
  retrive_ProductSeller_Info();
}


function seller_email(id) {
  window.alert(id);
  var btn_id = parseInt(id);
  var sell_id = localStorage.getItem(btn_id);
  var dstr = 'd' + parseInt(id);
  var distnce = localStorage.getItem(dstr);
  localStorage.removeItem('s_id');
  localStorage.setItem('s_id', sell_id);
  localStorage.removeItem('distance');
  localStorage.setItem('distance', distnce);
  window.location.href = "service_order.html";
}





function retrive_ProductSeller_Info() {

  //window.alert("function dhukse");
  //var email_id=document.getElementById(email).value;
  //window.alert(email);
  var temp = 0;
  var uid = localStorage.getItem("u_id");
  var provider_Id_List = firebase.database().ref('serviceProviderlist/');
  var retrive_provider_id = firebase.database().ref('User/');
  var retrive_provider_information = firebase.database().ref('UserService/');
  var retrive_ServiceName = firebase.database().ref("Service/");
  provider_Id_List.on('value', function (snapshot4) {
    retrive_provider_id.on('value', function (snapshot) {
      retrive_provider_information.on('value', function (snapshot1) {
        retrive_ServiceName.on('value', function (snapshot2) {


          var product_Seller_Count = snapshot4.numChildren();
          // window.alert("for er age");
          for (var j = 1; j <= product_Seller_Count; j++) {
            window.alert("for er pore");
            var product_seller_id = snapshot4.child(j).val();
            //window.alert(product_seller_id);
            seller_Product_Count = snapshot1.child(product_seller_id).numChildren();
            var service_id = localStorage.getItem("Service_id");

            service_Name = snapshot2.child(service_id).val();
            // window.alert(service_id+ ' '+service_Name);
            for (var i = 1; i <= seller_Product_Count; i++) {
              //     window.alert(product_seller_id);
              const service_name1 = snapshot1.child(product_seller_id).child(i).val().ServiceName;
              // window.alert(service_Name+' '+service_name1);
              if (service_name1 == service_Name) {

                ++temp;
                //window.alert(retreived_Product_Name);

                localStorage.removeItem(temp);
                localStorage.setItem(temp, product_seller_id);



                serviceReceiverAddress[1] = snapshot.child(uid).val().Address;
                //  window.alert(serviceReceiverAddress[1]);   
                serviceProviderAddress[temp] = snapshot.child(product_seller_id).val().Address;
                //  window.alert(serviceProviderAddress[temp]);
                providernames[temp] = snapshot.child(product_seller_id).val().Name;

                wage[temp] = snapshot1.child(product_seller_id).child(i).val().Wage;
                // skill[temp]=snapshot1.child(product_seller_id).child(i).val().Skill;

                // window.alert(providernames[temp]+' '+wage[temp] );

                //document.getElementById(temp+'seller_email').innerHTML=snapshot.child(product_seller_id).val().EmailAddress;
                ///document.getElementById (temp+'Available_amount').innerHTML=snapshot1.child(product_seller_id).child(i).val().Amount;
                //document.getElementById(temp+'price').innerHTML=snapshot1.child(product_seller_id).child(i).val().Price;
                //document.getElementById(temp+'Seller_rating').innerHTML=0;
              }

            }
            if (j == product_Seller_Count) {
              //    window.alert('eibar kaj hbe');
              sortDistance(temp);
            }
          }


        });

      });

    });

  });

}

function sortDistance(temp) {

  var retrieve_distance = firebase.database().ref("Distance_From_center/");
  retrieve_distance.on('value', function (snapshot) {
    for (var k = 1; k <= temp; k++) {
      distances[k] = snapshot.child(serviceProviderAddress[k]).val() + snapshot.child(serviceReceiverAddress[1]).val();
      //window.alert(sellerAddress[i]));
      // window.alert(snapshot.child(buyerAddress[1]).val());
      if (k == temp) {
        sort(temp);
      }
    }

  });

}
function sort(temp) {

  for (var l = 1; l <= temp; l++) {
    for (var m = 1; m < temp; m++) {
      if (distances[m] > distances[m + 1]) {
        var temp = distances[m];
        var temp2 = providernames[m];
        var temp3 = wage[m];
        // var temp4 = prices[m];
        distances[m] = distances[m + 1];
        providernames[m] = providernames[m + 1];
        wage[m] = wage[m + 1];
        // prices[m] = prices[m + 1];
        distances[m + 1] = temp;
        providernames[m + 1] = temp2;
        amounts[m + 1] = temp3;
        // prices[m + 1] = temp4;
      }
    } if (l == temp) {
      set_val(temp);
    }
  }
}
function set_val(temp) {
  // window.alert(temp);
  for (var p = 1; p <= temp; p++) {

    if (p == temp) {
      window.alert('SUCCESSFUL');
    }

    //window.alert(providernames[p]+' '+ wage[p]+' '+distances[p]);
    document.getElementById(p + 'provider_Name').innerHTML = providernames[p];
    document.getElementById(p + 'provider_Wages').innerHTML = wage[p];
    // document.getElementById(i+'price').innerHTML=prices[i];
    document.getElementById(p + 'distance').innerHTML = distances[p];
    document.getElementById(p + 'provider_Rating').innerHTML = 0;
    //window.alert(amounts[i]);
    var dstr1 = 'd' + p;
    localStorage.removeItem(dstr1);
    localStorage.setItem(dstr1, distances[p]);

  }
}