// Code will be added later
function writeProducts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var products_ref = db.collection("products");

    var products_detail_ref = products_ref.doc('watermelon').collection('details'); // change doc('name') based on item you inject

    products_detail_ref.add({
        plu_code: 3421,
        produce_name: "Watermelon",
        price: 3.79,
        variety: "Seedless", // seedless, seeded, yellow, orange, etc
        size: 'Mini',   // mini, small, medium, large, extra large
        net_price: "per lb", // per lb, per item
        store: "Price Smart", // store name
        city: "Burnaby",  // city name
        province: "BC", // province name
        postal_code: "V5A 1S6", // postal code
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true, // true of false just make it random
    })

    products_detail_ref.add({
        plu_code: 3308,
        produce_name: "Watermelon",
        price: 6.99,
        variety: "Orange",
        size: 'All Sizes',
        net_price: "per lb",
        store: "Whole Foods",
        city: "Burnaby",
        province: "BC",
        postal_code: "V5A 1S6",
        details: "Placeholder details",
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: false,
    })
}


function writeProducts_doc() {
    //define a variable for the collection you want to create in Firestore to populate data
    var products_ref = db.collection("products");

    products_ref.add({
        plu_code: 4099,
        produce_name: "Apple", 
        price: 0.99,
        variety: "Akane",
        size: 'Small',
        net_price: "per lb",
        store: "Safeway",
        city: "Burnaby",
        province: "BC",
        postal_code: "V5A 1S6",
        details: "Largest apples in town",
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true,
    })

    products_ref.add({
        plu_code: 4129,
        produce_name: "Apple",
        price: 0.89,
        variety: "Fuji",
        size: 'Small',
        net_price: "per lb",
        store: "Superstore",
        city: "Vancouver",
        province: "BC",
        postal_code: "V2A 2S7",
        details: "Sweetest apples in town",
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
        good_deal: true,
    })

    products_ref.add({
        plu_code: 4129,
        produce_name: "Apple",
        price: 1.29,
        variety: "Fuji",
        size: 'Small',
        net_price: "per lb",
        store: "Save On Foods",
        city: "Vancouver",
        province: "BC",
        postal_code: "V7A 2S6",
        details: "Sweetest apples in town",
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
        sale_date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2020")),
    })
}

// //------------------------------------------------------------------------------
// // Input parameter is a string representing the collection we are reading from
// //------------------------------------------------------------------------------
// function displayCardsDynamically(collection) {
//     let cardTemplate = document.getElementById("product_card_template"); 

//     db.collection(collection).get()   
//         .then(allProducts => {

//             allProducts.forEach(doc => { 
//                 var title = doc.data().produce_name;     
//                 var details = doc.data().details;  
//                 var pluCode = doc.data().plu_code;   
//                 var productPrice = doc.data().price; 
//                 var docID = doc.id;
//                 let newcard = cardTemplate.content.cloneNode(true); 

//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-length').innerHTML = productPrice + " CAD";
//                 newcard.querySelector('.card-text').innerHTML = details;
//                 newcard.querySelector('.card-image').src = `./images/${pluCode}.png`; 
//                 newcard.querySelector('a').href = "eachProduct.html?docID=" + docID;

//                 document.getElementById(collection + "-go-here").appendChild(newcard);
//             })
//         })
// }

// displayCardsDynamically("products");  //input param is the name of the collection






// function display_product_info() {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);

//     // doublecheck: is your collection called "Reviews" or "reviews"?
//     db.collection("products")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             this_product = doc.data();
//             product_code = this_product.code;
//             product_name = doc.data().name;

//             // only populate title, and image
//             document.getElementById("product_name").innerHTML = product_name;
//             let imgEvent = document.querySelector(".product-img");
//             imgEvent.src = "../images/" + product_code + ".jpg";
//         });
// }
// display_product_info();