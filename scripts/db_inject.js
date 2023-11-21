function addTomato() {
    //define a variable for the collection you want to create in Firestore to populate data
    var products_ref = db.collection("products");
    var products_detail_ref = products_ref.doc('tomato').collection('details'); // change doc('name') based on item you inject

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 0.79,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'All Sizes',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Price Smart", // store name
        city: "Vancouver",  // city name
        province: "BC", // province name
        postal_code: "V5A 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 3.79,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'Mini',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Price Smart", // store name
        city: "Burnaby",  // city name
        province: "BC", // province name
        postal_code: "V5A 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 1.39,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'All Sizes',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Walmart", // store name
        city: "Vancouver",  // city name
        province: "BC", // province name
        postal_code: "X1A 2S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 4.79,
        variety: "Dried", // seedless, seeded, yellow, orange, etc
        size: 'Mini',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Save on food", // store name
        city: "Delta",  // city name
        province: "BC", // province name
        postal_code: "W4A 1Q3", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 0.99,
        variety: "Greenhouse", // seedless, seeded, yellow, orange, etc
        size: 'All Sizes',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Tomato Kingdom", // store name
        city: "Richmond",  // city name
        province: "BC", // province name
        postal_code: "W2A 4S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 5.79,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'Big',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Price Smart", // store name
        city: "Burnaby",  // city name
        province: "BC", // province name
        postal_code: "U5A OS3", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 1.22,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'All Sizes',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "T&T", // store name
        city: "Vancouver",  // city name
        province: "BC", // province name
        postal_code: "U8T 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 3.39,
        variety: "Cherry", // seedless, seeded, yellow, orange, etc
        size: 'Mini',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Shoppers", // store name
        city: "Vancouver",  // city name
        province: "BC", // province name
        postal_code: "B8Y 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false, // true of false just make it random
    })
    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 1.49,
        variety: "Plum", // seedless, seeded, yellow, orange, etc
        size: 'All Sizes',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "superstore", // store name
        city: "Vancouver",  // city name
        province: "BC", // province name
        postal_code: "V5A 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3061,
        produce_name: "tomato",
        price: 3.29,
        variety: "Plum", // seedless, seeded, yellow, orange, etc
        size: 'Mini',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Wholefoods", // store name
        city: "North Vancouver",  // city name
        province: "BC", // province name
        postal_code: "V5A 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false, // true of false just make it random
    })
}


// code is based on a first draft of doing a similar thing for all products in our random list using Steven's original code
function autoWriteAsparagus(write_count){
    // only variables to change for other products: product, product_PLU, product_variety, min, max
    for(var i = 0; i < write_count; i++){
      // declare the product name            
      var product = "asparagus";
      // get product details reference
      var products_detail_ref = db.collection("products").doc(product).collection('details'); 
      // declare list of PLU codes
      let  product_PLU = [3392, 4080, 4521, 3079, 3394, 4524, 4525, 4526, 3393, 4522, 4523]
      // get random PLU code
      var plu = product_PLU[Math.floor(Math.random() * product_PLU[product].length)] 
      // declare information linked to PLU
      let product_variety = {
        3079: ["Purple", "All Sizes"], 
        3392: ["Green","All Sizes","Bunch"], 
        3393: ["White", "All Sizes", "Bunch"], 
        3394: ["Purple", "All Sizes", "Bunch"], 
        4080: ["Green","Small","Standard and large size"], 
        4521: ["Green", "Large", "X-large and jumbo size"], 
        4522: ["White", "Small", "Standard and large size"], 
        4523: ["White", "Large", "X-large and jumbo size"],
        4524: ["Tips", "All Sizes"], 
        4525: ["Retailer Assigned", "All Sizes"], 
        4526: ["Retailer Assigned", "All Sizes"]
      }
      // declare list of stores, copilot generated
      let stores = ["Safeway", "Walmart", "Save-On-Foods", "Costco", "Superstore", 
                    "T&T Supermarket", "Whole Foods Market", "Choices Market", "Kin's Farm Market", 
                    "Donald's Market", "IGA", "Nesters Market", "FreshCo", "Thrifty Foods", "Urban Fare", 
                    "Stong's Market", "Buy-Low Foods", "Famous Foods", "Persia Foods", "H-Mart", "PriceSmart Foods", 
                    "Tong Li Supermarket"];
      // declare list of cities
      let cities = ["Vancouver", "Burnaby", "Richmond", "Coquitlam"]
      // get information linked to PLU
      var information = product_variety[plu];
      // get variety
      var variety = information[0];
      // get size
      var size = information[1];
      // minimum price
      let min = 4;
      // maximum price
      let max = 9;
      // get random price
      var price = (Math.floor(Math.random() * (max - min)) + min) - (Math.floor(Math.random()  * 0.99 + 0.01) * 100);
      price = Number(price.toFixed(2));
      // if price is less than average of max and min, then it is a good deal
      var deal = price < (max + min) / 2;
      // set unit
      let unit = "per lb";
      // get random store
      var store = stores[Math.floor(Math.random() * stores.length)];
      // get random city
      var store_city = cities[Math.floor(Math.random() * cities.length)];
      // write to database
      products_detail_ref.add({
          plu_code: plu,
          produce_name: product,
          price: price,
          variety: variety, 
          size: size,   
          net_price: unit, 
          store: store, 
          city: store_city,  
          province: "BC", 
          postal_code: "V5A 1S6", 
          last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
          sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
          good_deal: deal, // true of false just make it random
      })
    }
}


  function autoWriteCucumber(write_count){
    // only variables to change for other products: product, product_PLU, product_variety, min, max
    for(var i = 0; i < write_count; i++){
      // declare the product name            
      var product = "cucumber";
      // get product details reference
      var products_detail_ref = db.collection("products").doc(product).collection('details'); 
      // declare list of PLU codes
      let  product_PLU = [4592, 4593, 4062, 4594, 4595, 4596, 4597]
      // get random PLU code
      var plu = product_PLU[Math.floor(Math.random() * product_PLU[product].length)] 
      // declare information linked to PLU
      let product_variety = { 
        4592: ["Armenian", "All Sizes"], 
        4593: ["English/Hot House/Long Seedless/Telegraph/Continental", "All Sizes"], 
        4062: ["Green/Ridge/Short", "All Sizes"], 
        4594: ["Japanese/White", "All Sizes"],
        4595: ["Lemon", "All Sizes"], 
        4596: ["Pickling/Gerkin", "All Sizes"], 
        4597: ["Retailer Assigned", "All Sizes"]
      }
      // declare list of stores, copilot generated
      let stores = ["Safeway", "Walmart", "Save-On-Foods", "Costco", "Superstore", 
                    "T&T Supermarket", "Whole Foods Market", "Choices Market", "Kin's Farm Market", 
                    "Donald's Market", "IGA", "Nesters Market", "FreshCo", "Thrifty Foods", "Urban Fare", 
                    "Stong's Market", "Buy-Low Foods", "Famous Foods", "Persia Foods", "H-Mart", "PriceSmart Foods", 
                    "Tong Li Supermarket"];
      // declare list of cities
      let cities = ["Vancouver", "Burnaby", "Richmond", "Coquitlam"]
      // get information linked to PLU
      var information = product_variety[plu];
      // get variety
      var variety = information[0];
      // get size
      var size = information[1];
      // minimum price
      let min = 1;
      // maximum price
      let max = 5;
      // get random price
      var price = (Math.floor(Math.random() * (max - min)) + min) - (Math.floor(Math.random()  * 0.99 + 0.01) * 100);
      price = Number(price.toFixed(2));
      // if price is less than average of max and min, then it is a good deal
      var deal = price < (max + min) / 2;
      // set unit
      let unit = "per lb";
      // get random store
      var store = stores[Math.floor(Math.random() * stores.length)];
      // get random city
      var store_city = cities[Math.floor(Math.random() * cities.length)];
      // write to database
      products_detail_ref.add({
          plu_code: plu,
          produce_name: product,
          price: price,
          variety: variety, 
          size: size,   
          net_price: unit, 
          store: store, 
          city: store_city,  
          province: "BC", 
          postal_code: "V5A 1S6", 
          last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
          sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
          good_deal: deal, 
      })
    }
}


function autoWriteBroccoli(write_count){
    // only variables to change for other products: product, product_PLU, product_variety, min, max
    for(var i = 0; i < write_count; i++){
      // declare the product name            
      var product = "broccoli";
      // get product details reference
      var products_detail_ref = db.collection("products").doc(product).collection('details'); 
      // declare list of PLU codes
      let  product_PLU = [4060, 3277, 4547, 3082, 4548, 4549]
      // declare information linked to PLU
      let product_variety = { 
          4060: ["Unspecified", "All Sizes"], 
          3277: ["Baby", "All Sizes"], 
          4547: ["Broccoli Rabe (Italian Rapini)/ Chinese Broccoli (GAI LAN)", "All Sizes"], 
          3082: ["Crowns", "All Sizes"],
          4548: ["Florettes", "All Sizes"], 
          4549: ["Retailer Assigned", "All Sizes"],
        }
        // declare list of stores, copilot generated
        let stores = ["Safeway", "Walmart", "Save-On-Foods", "Costco", "Superstore", 
        "T&T Supermarket", "Whole Foods Market", "Choices Market", "Kin's Farm Market", 
        "Donald's Market", "IGA", "Nesters Market", "FreshCo", "Thrifty Foods", "Urban Fare", 
        "Stong's Market", "Buy-Low Foods", "Famous Foods", "Persia Foods", "H-Mart", "PriceSmart Foods", 
        "Tong Li Supermarket"];
        // declare list of cities
        let cities = ["Vancouver", "Burnaby", "Richmond", "Coquitlam"]
        // get random PLU code
      var plu = product_PLU[Math.floor(Math.random() * product_PLU.length)] 
      // get information linked to PLU
      var information = product_variety[plu];
      // get variety
      var variety = information[0];
      // get size
      var size = information[1];
      // minimum price
      let min = 2;
      // maximum price
      let max = 6;
      // get random price
      var price = (Math.floor(Math.random() * (max - min)) + min) - (Math.floor(Math.random()  * 0.99 + 0.01) * 100);
      price = Number(price.toFixed(2));
      // if price is less than average of max and min, then it is a good deal
      var deal = price < (max + min) / 2;
      // set unit
      let unit = "per lb";
      // get random store
      var store = stores[Math.floor(Math.random() * stores.length)];
      // get random city
      var store_city = cities[Math.floor(Math.random() * cities.length)];
      // write to database
      products_detail_ref.add({
          plu_code: plu,
          produce_name: product,
          price: price,
          variety: variety, 
          size: size,   
          net_price: unit, 
          store: store, 
          city: store_city,  
          province: "BC", 
          postal_code: "V5A 1S6", 
          last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
          sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
          good_deal: deal,
      })
    }
  }