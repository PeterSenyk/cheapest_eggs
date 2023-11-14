function display_sale_products(collection) {
    console.log('display sale products')
    document.getElementById('product-goes-here').innerHTML = '';
    let counter = 4;

    db.collection(collection).get().then(allProducts => {
        console.log('success')
        allProducts.forEach(doc => {
            if (doc.id == 'apple') {
                console.log("test appleeeeee")

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
}

function main() {
    // console.log('main executed')
    display_sale_products('products');
}

main()