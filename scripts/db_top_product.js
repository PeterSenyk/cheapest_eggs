function display_sale_products(collection) {
    firebase.auth().onAuthStateChanged(user => {
        // Choose 4 unique random items from the collection
        const items = ['apple', 'banana', 'lettuce', 'kiwi', 'tomato', 'mango', 'broccoli']
        var arr = [];
        while (arr.length < 4) {
            var r = Math.floor(Math.random() * items.length);
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        random1 = arr[0]
        random2 = arr[1]
        random3 = arr[2]
        random4 = arr[3]
        // Check if user is signed in, only signed in users can see add button
        if (user) {
            // Random item 1
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.id == items[random1]) {
                        db.collection(collection).doc(items[random1]).collection('details').orderBy("price").limit(1).get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var productName = doc.data().produce_name;
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                    <button id="0">Add</button>
                                </div>
                                `
                                    )
                                    document.getElementById('0').addEventListener('click', () => {
                                        console.log("Click!")
                                        add_to_list_from_search(doc.ref.path, false)
                                    })
                                }
                            })
                        })
                    }

                })
            })
            // Random item 2
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.id == items[random2]) {
                        db.collection(collection).doc(items[random2]).collection('details').orderBy("price").limit(1).get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var productName = doc.data().produce_name;
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                    <button id="1">Add</button>
                                </div>
                                `
                                    )
                                    document.getElementById('1').addEventListener('click', () => {
                                        console.log("Click!")
                                        add_to_list_from_search(doc.ref.path, false)
                                    })
                                }
                            })
                        })
                    }
                })
            })
            // Random item 3
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.id == items[random3]) {
                        db.collection(collection).doc(items[random3]).collection('details').orderBy("price").limit(1).get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var productName = doc.data().produce_name;
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                    <button id="2">Add</button>
                                </div>
                                `
                                    )
                                    document.getElementById('2').addEventListener('click', () => {
                                        console.log("Click!")
                                        add_to_list_from_search(doc.ref.path, false)
                                    })
                                }
                            })
                        })
                    }

                })
            })
            // Random item 4
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.id == items[random4]) {
                        db.collection(collection).doc(items[random4]).collection('details').orderBy("price").limit(1).get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var productName = doc.data().produce_name;
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                    <button id="3">Add</button>
                                </div>
                                `
                                    )
                                    document.getElementById('3').addEventListener('click', () => {
                                        console.log("Click!")
                                        add_to_list_from_search(doc.ref.path, false)
                                    })
                                }
                            })
                        })
                    }
                })
            })

        } else {
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    // Un logged in users can only see apple
                    if (doc.id == 'apple') {
                        db.collection(collection).doc('apple').collection('details').orderBy("price").limit(5).get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    var productName = doc.data().produce_name;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                </div>
                                `
                                    )
                                }
                            })
                        })
                    }
                })
            })
        }
    })
}

function main() {
    display_sale_products('products');
}

main()