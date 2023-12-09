console.log('db_product_search.js loaded');
sort_method = undefined


var search_item;

//------------------------------------------------------------------------------
// Takes search value and pulls 'store' data from product firebase and injects to search results
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    // get html template from specific ID, store it 
    let cardTemplate = document.getElementById("product_card_template");
    // get reference for 'products' in firebase, store it
    var products_ref = db.collection("products");

    // retrieve all documents from firebase collection
    db.collection(collection).get().then(allProducts => {

        // iterate through each item in document
        allProducts.forEach(doc => {
            // if document matches search item
            if (doc.id == search_item) {

                // clear out initial HTML div so we can add new HTML template
                document.getElementById('products-go-here').innerHTML = ''
                // based on lowest price, inject template cards to specified div
                db.collection(collection).doc(search_item).collection('details').orderBy('price', sort_method).get().then(allProducts => {
                    allProducts.forEach(doc => {
                        // extract data from firebase document
                        var title = doc.data().produce_name;
                        var details = doc.data().store;
                        var pluCode = doc.data().plu_code;
                        var postCode = doc.data().postal_code;
                        var productPrice = doc.data().price;
                        var docID = doc.id;

                        // Clone the content of the template card
                        let newcard = cardTemplate.content.cloneNode(true);

                        // Populate cloned template card with extracted data
                        newcard.querySelector('.card-title').innerHTML = title;
                        newcard.querySelector('.card-length').innerHTML = productPrice + " CAD";
                        newcard.querySelector('.card-text').innerHTML = `${details}, ${postCode}`;
                        newcard.querySelector('.card-image').src = `./images/${pluCode}.png`;

                        // event listener that triggers the function that will add item to shopping list
                        newcard.querySelector('.card-href').addEventListener('click', () => {
                            add_to_list_from_search(doc.ref.path, false);
                        });
                        
                        // appending newcard with data to specified ID element in HTML
                        document.getElementById(collection + "-go-here").appendChild(newcard);
                    })
                })
            }
        })
    })
}


//------------------------------------------------------------------------------
// Takes search value and pulls 'shared' data from product firebase and injects to search results
//------------------------------------------------------------------------------
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
                /* 
                The elipsis is called the spread operator in this context. 
                It is a suffix that causes the iterable to "spread" allowing you to use the contents with additional arguements in a single assignment.
                In this use, the doc.data() is spread into a new object, which will contain all the information from the document, 
                and then the id of the doc is added to the new object, as it won't be available through it.
                */
                docData = {...doc.data(), path: doc.ref.path };
                sharedDetails.push(docData);
            });
            // Once all documents are added to sharedDetails, call the display function
            displaySharedProducts(sharedDetails, search_item); // Pass search_item if needed for further use
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}


//------------------------------------------------------------------------------
// Inject search results for shared items to search_result page
//------------------------------------------------------------------------------
function displaySharedProducts(sharedDetails, search_item) {
    const template = document.getElementById('shared_product_card_template'); // Use the correct template ID
    const container = document.getElementById('shared-products-go-here'); // Use the correct container ID

    container.innerHTML = ''; // Clear existing cards

    sharedDetails.forEach(detail => {
        let newcard = template.content.cloneNode(true);

        // Update selectors to match your template's classes or IDs
        newcard.querySelector('#share-card-title').textContent = detail.product || 'No title';
        newcard.querySelector('#share-card-length').textContent = detail.price + " CAD" || 'No price';
        newcard.querySelector('#share-card-text').textContent = detail.variety || 'No details';
        newcard.querySelector('#share-card-image').src = detail.photo || './images/noimg.png';
        newcard.querySelector('.card-href').addEventListener('click', () => {
            add_to_list_from_search(detail.path, true);
        });

        container.appendChild(newcard);
    });
}


//------------------------------------------------------------------------------
// Event listener for when search_button is clicked
//------------------------------------------------------------------------------
searchButton = document.getElementById('search_button'); // this id isn't assigned in the HTML
searchButton.addEventListener('click', () => {
    search_item = document.getElementById('search-input').value;
    console.log('search button clicked');

    // Append the search item as a query parameter
    window.location.href = "search_result.html?search_item=" + encodeURIComponent(search_item);
});

// this block shouldn't be here, it causes the error in all the pages except search_result.html
// create URL 
queryParams = new URLSearchParams(window.location.search);
search_item = queryParams.get('search_item');
displayCardsDynamically('products'); 
add_to_search_history(search_item);
if (search_item) {
    getSharedProducts(search_item);
};


//------------------------------------------------------------------------------
// Event listener for when sort_button is clicked (cheapest to most expensive)
//------------------------------------------------------------------------------
sort_button = document.getElementById('sort_button');
sort_button.addEventListener('click', () => {
    sort_method = undefined
    displayCardsDynamically('products');
    getSharedProducts(search_item);
})


//------------------------------------------------------------------------------
// Event listener for when sort_button_desc is clicked (most expensive to cheapest)
//------------------------------------------------------------------------------
sort_button_desc = document.getElementById('sort_button_desc');
sort_button_desc.addEventListener('click', () => {
    sort_method = 'desc'
    console.log(sort_method)
    displayCardsDynamically('products')
    getSharedProducts(search_item);
})


//------------------------------------------------------------------------------
// function that adds searched item to search history
//------------------------------------------------------------------------------
function add_to_search_history(search_item) {
    if (search_item == null) {
        return;
    }
    // get current user
    var user = firebase.auth().currentUser;
    // get user id
    var uid = user.uid;
    // go into user document based off user's id
    userDoc = db.collection('users').doc(uid);
    // update user's search history with search item
    userDoc.update({
        // search history is an array, so we use arrayUnion to add to it
        search_history: firebase.firestore.FieldValue.arrayUnion(search_item)
    }).catch(function (error) {
        console.log(error);
    })
}
