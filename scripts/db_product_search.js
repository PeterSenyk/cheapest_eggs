console.log('db_product_search.js loaded');
sort_method = undefined


var search_item;

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


function getSharedProducts(search_item) {
    console.log('getSharedProducts called with item:', search_item);
    const db = firebase.firestore(); // Ensure Firebase is initialized

    db.collectionGroup("user_uploads") // This will search across all 'user_uploads' subcollections in the database
        .where("product", "==", search_item)
        .get()
        .then((querySnapshot) => {
            const sharedDetails = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data()); // 
                sharedDetails.push(doc.data());
            });
            // Once all documents are added to sharedDetails, call the display function
            displaySharedProducts(sharedDetails, search_item); // Pass search_item if needed for further use
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}

function displaySharedProducts(sharedDetails, search_item) {
    const template = document.getElementById('shared_product_card_template'); // Use the correct template ID
    const container = document.getElementById('shared-products-go-here'); // Use the correct container ID

    container.innerHTML = ''; // Clear existing cards

    sharedDetails.forEach(detail => {
        let newcard = template.content.cloneNode(true);

        // Update selectors to match your template's classes or IDs
        newcard.querySelector('.share-card-title').textContent = detail.product || 'No title';
        newcard.querySelector('.share-card-length').textContent = detail.price + " CAD" || 'No price';
        newcard.querySelector('.share-card-text').textContent = detail.variety || 'No details';
        newcard.querySelector('.share-card-image').src = detail.photo || './images/noimg.png';
        newcard.querySelector('.card-href').addEventListener("click", add_to_list_from_search);

        // Add event listener
        let addButton = newcard.querySelector('.card-href');
        addButton.setAttribute("id", `${detail.id} ${detail.produce_name}`);
        addButton.addEventListener("click", function() {
            add_to_list_from_search(detail.id, search_item); // Make sure this function is defined
        });

        container.appendChild(newcard);
    });
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
displayCardsDynamically('products');
add_to_search_history(search_item);
if (search_item) {
    getSharedProducts(search_item);
};

// eventlistener sort
sort_button = document.getElementById('sort_button');
sort_button.addEventListener('click', function () {
    sort_method = undefined
    displayCardsDynamically('products');
    getSharedProducts(search_item);
})

sort_button_desc = document.getElementById('sort_button_desc');
sort_button_desc.addEventListener('click', function () {
    sort_method = 'desc'
    console.log(sort_method)
    displayCardsDynamically('products')
    getSharedProducts(search_item);
})

function add_to_search_history(search_item) {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    userDoc = db.collection('users').doc(uid);
    userDoc.update({
        search_history: firebase.firestore.FieldValue.arrayUnion(search_item)
    }).catch(function (error) {
        console.log(error);
    })
}