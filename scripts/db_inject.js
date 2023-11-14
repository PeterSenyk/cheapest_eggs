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
}



