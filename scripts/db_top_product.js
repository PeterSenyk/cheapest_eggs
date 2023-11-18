function display_sale_products(collection) {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in, only signed in users can see add button
        if (user) {
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    // apple is placeholder for now
                    if (doc.id == 'apple') {
                        db.collection(collection).doc('apple').collection('details').get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>Price ${productPrice}</p>
                                    <button>Add</button>
                                </div>
                                `
                                    )
                                }
                            })
                        })
                    }
                })
            })
        } else {
            // document.getElementById('product-goes-here').innerHTML += (`<p class="title">Login to add them into your shopping list!</p>`)
            db.collection(collection).get().then(allProducts => {
                allProducts.forEach(doc => {
                    // apple is placeholder for now
                    if (doc.id == 'apple') {
                        db.collection(collection).doc('apple').collection('details').get().then(allProducts => {
                            allProducts.forEach(doc => {
                                if (doc.data().good_deal == true) {
                                    var pluCode = doc.data().plu_code;
                                    var productPrice = doc.data().price;
                                    document.getElementById('product-goes-here').innerHTML += (
                                        `
                                <div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src =./images/${pluCode}.png alt="cover">
                                    </div>
                                    <p>Price ${productPrice}</p>
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
    // console.log('main executed')
    display_sale_products('products');
}

main()