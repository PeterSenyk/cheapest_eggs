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



