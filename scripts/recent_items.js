//place holder - to do friday
function populateHomePage() {
    console.log("test");
    let homeCardTemplate = document.getElementById("reviewCardTemplate");  // get hike card template and populate it
    let homeCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let homeID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("reviews")
        .where("hikeDocID", "==", hikeID)  // .where a hike code ID is == to hikeID, got info from url of page, see if 2 matches because want to populate hike with correct review (review should have the hike ID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var level = doc.data().level;
                var season = doc.data().season;
                var description = doc.data().description;
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                reviewCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
                reviewCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;

                // Populate the star rating based on the rating value

                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                hikeCardGroup.appendChild(reviewCard);
            });
        });
}
