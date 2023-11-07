function displayListCards(collection){
    let card = document.getElementById("list_card");
    
    var total = 0;

    db.collection(collection).get().then(docs =>{
        docs.forEach(docL => {
            // if (doc.userid === user.uid){
                id = docL.data().itemid
                let newCard = card.content.cloneNode(true);
                db.collection("products").doc(id).get().then(doc => {
                    let data = doc.data();
                    console.log(data);
                    let title = data.produce_name;                    ;
                    let price = data.price;
                    let store = data.store;
                    let img = String(data.plu_code);
                    let desc = data.details;
                    console.log(title, price, store, desc);
                    total += Number(price);

            newCard.querySelector(".card_img").src = `./images/${img}.png`;
            newCard.querySelector(".card_title").innerHTML = title;
            newCard.querySelector(".card_cost").innerHTML = price;
            newCard.querySelector(".card_store").innerHTML = store;
            newCard.querySelector(".card_text").innerHTML = desc;

            newCard.querySelector(".card_quantity").value = docL.data().quantity;

            newCard.querySelector(".subtract").addEventListener("click", function(){
                
            });
            document.getElementById("cost").innerHTML = total;
            document.getElementById(collection).appendChild(newCard);
                });

            // newCard.querySelector(".card_quantity").value = docL.data().quantity;
            // };

            // document.getElementById(collection).appendChild(newCard);
        })
    })
}

displayListCards("list-cart");
