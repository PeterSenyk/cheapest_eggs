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