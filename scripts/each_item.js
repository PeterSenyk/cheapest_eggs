//---------------------------------------
// This script is for the product page
//---------------------------------------
function display_product_info() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("product")
        .doc(ID)
        .get()
        .then(doc => {
            this_product = doc.data();
            product_code = thisProduct.code;
            product_name = doc.data().name;

            // only populate title, and image
            document.getElementById("product_name").innerHTML = product_name;
            let imgEvent = document.querySelector(".product-img");
            imgEvent.src = "../images/" + product_code + ".jpg";
        });
}
display_product_info();