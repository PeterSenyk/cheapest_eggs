function displayListCards(collection){
    let card = document.getElementById("list_card");

    db.collection(collection).get().then(docs =>{
        docs.forEach(doc => {
            // if (doc.userid === user.uid){
                id = doc.data().itemid
                console.log(db.collection("products").doc(id));
                let product = db.collection("products").doc(id);
            let title = product.produce_name;
            let price = product.price;
            let store = product.store;
            let img = product.plu_code;
            let desc = product.details;

            let newCard = card.content.cloneNode(true);
            newCard.querySelector(".card_img").src = `./images/${img}.png`;
            newCard.querySelector(".card_title").innerHTML = title;
            newCard.querySelector(".card_cost").innerHTML = price;
            newCard.querySelector(".card_store").innerHTML = store;
            newCard.querySelector(".card_text").innerHTML = desc;

            newCard.querySelector(".card_quantity").value = doc.data().quantity;
            // };

            document.getElementById(collection).appendChild(newCard);
        })
    })
}

displayListCards("list-cart");