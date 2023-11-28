//------------------------------------------------------------------------------
// Take 4 random sale items from database and inject to hero on main page
//------------------------------------------------------------------------------
function display_sale_products(collection) {
    const getRandomItems = (items, count) => {
        const randomItems = new Set();
        while (randomItems.size < count) {
            randomItems.add(items[Math.floor(Math.random() * items.length)]);
        }
        return [...randomItems];
    };

    const addEventListener = (id, path) => {
        document.getElementById(id).addEventListener('click', () => {
            add_to_list_from_search(path, false);
        });
    };

    firebase.auth().onAuthStateChanged(user => {
        const items = ['apple', 'banana', 'lettuce', 'kiwi', 'tomato', 'mango', 'broccoli'];
        const randomItems = getRandomItems(items, 4);

        if (user) {
            randomItems.forEach((itemId, index) => {
                db.collection(collection).doc(itemId).collection('details').orderBy("price").limit(1).get().then(allProducts => {
                    allProducts.forEach(doc => {
                        if (doc.data().good_deal == true) {
                            const productName = doc.data().produce_name;
                            const pluCode = doc.data().plu_code;
                            const productPrice = doc.data().price;
                            const buttonId = index.toString();
                            document.getElementById('product-goes-here').innerHTML += (
                                `<div class="sale_product_card">
                                    <div class='img_container'>
                                        <img src="./images/${pluCode}.png" alt="cover">
                                    </div>
                                    <p>${productName}</p>
                                    <p>Price: $${productPrice}</p>
                                    <button id="${buttonId}">Add</button>
                                </div>`
                            );
                            setTimeout(() => addEventListener(buttonId, doc.ref.path), 0);
                        }
                    });
                });
            });
        } else {
            // Unauthenticated users can only see apple deals on index page
            db.collection(collection).doc('apple').collection('details').orderBy("price").limit(5).get().then(allProducts => {
                allProducts.forEach(doc => {
                    if (doc.data().good_deal == true) {
                        const pluCode = doc.data().plu_code;
                        const productPrice = doc.data().price;
                        const productName = doc.data().produce_name;
                        document.getElementById('product-goes-here').innerHTML += (
                            `<div class="sale_product_card">
                                <div class='img_container'>
                                    <img src="./images/${pluCode}.png" alt="cover">
                                </div>
                                <p>${productName}</p>
                                <p>Price: $${productPrice}</p>
                            </div>`
                        );
                    }
                });
            });
        }
    });
}

function main() {
    display_sale_products('products');
}

main();