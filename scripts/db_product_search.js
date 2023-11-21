console.log('db_product_search.js loaded');
sort_method = undefined
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    console.log('displayCardsDynamically called')
    let cardTemplate = document.getElementById("product_card_template");
    // let search_item = document.getElementById("search-input").value;
    console.log(search_item)

    var products_ref = db.collection("products");
    db.collection(collection).get().then(allProducts => {

        allProducts.forEach(doc => {
            if (doc.id == search_item) {
                document.getElementById('products-go-here').innerHTML = ''

                db.collection(collection).doc(search_item).collection('details').orderBy('price', sort_method).get().then(allProducts => {
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
                        // newcard.querySelector('a').href = "eachProduct.html?docID=" + docID; for later
                        newcard.querySelector('.card-href').setAttribute("id", `${docID} ${title}`);
                        newcard.querySelector('.card-href').addEventListener("click", add_to_list_from_search);

                        document.getElementById(collection + "-go-here").appendChild(newcard);
                    
                    })
                })
            }
        })
    })
}

// eventlistener search
searchButton = document.getElementById('search_button');
searchButton.addEventListener('click', function () {
    search_item = document.getElementById('search-input').value;
    console.log('search button clicked');

    // Append the search item as a query parameter
    window.location.href = "search_result.html?search_item=" + encodeURIComponent(search_item);
});
queryParams = new URLSearchParams(window.location.search);
search_item = queryParams.get('search_item');
displayCardsDynamically('products')
add_to_search_history(search_item);

// eventlistener sort
sort_button = document.getElementById('sort_button');
sort_button.addEventListener('click', function () {
    sort_method = undefined
    displayCardsDynamically('products')
})

sort_button_desc = document.getElementById('sort_button_desc');
sort_button_desc.addEventListener('click', function () {
    sort_method = 'desc'
    console.log(sort_method)
    displayCardsDynamically('products')
})

function add_to_search_history(search_item){
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    userDoc = db.collection('users').doc(uid);
    userDoc.update({
        search_history: firebase.firestore.FieldValue.arrayUnion(search_item)
    }).catch(function(error){
        console.log(error);
    })
}