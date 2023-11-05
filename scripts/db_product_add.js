// Code will be added later

function writeProducts() {
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

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("product_card_template"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allProducts => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allProducts.forEach(doc => { //iterate thru each doc
                var title = doc.data().produce_name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var pluCode = doc.data().plu_code;    //get unique ID to each hike to be used for fetching right image
                var productPrice = doc.data().price; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = productPrice + " CAD";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${pluCode}.png`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachProduct.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("products");  //input param is the name of the collection






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