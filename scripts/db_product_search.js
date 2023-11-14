//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("product_card_template");
    let search_item = document.getElementById("search-input").value;
    console.log(search_item)

    var products_ref = db.collection("products");
    db.collection(collection).get().then(allProducts => {

        allProducts.forEach(doc => {
            if (doc.id == search_item) {
                document.getElementById('products-go-here').innerHTML = ''

                db.collection(collection).doc(search_item).collection('details').get().then(allProducts => {
                    allProducts.forEach(doc => {
                        var title = doc.data().produce_name;
                        var details = doc.data().details;
                        var pluCode = doc.data().plu_code;
                        var productPrice = doc.data().price;
                        var docID = doc.id;
                        let newcard = cardTemplate.content.cloneNode(true);

                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('.card-length').innerHTML = productPrice + " CAD";
                        newcard.querySelector('.card-text').innerHTML = details;
                        newcard.querySelector('.card-image').src = `./images/${pluCode}.png`;
                        newcard.querySelector('a').href = "eachProduct.html?docID=" + docID;

                        document.getElementById(collection + "-go-here").appendChild(newcard);
                    })
                })
            }
        })
    })
}