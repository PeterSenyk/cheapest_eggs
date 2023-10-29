// function loadSkeleton() {

//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // logged in
//             console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
//             console.log($('#footerPlaceholder').load('./text/footer.html'));
//         } else {
//             // not logged in
//             console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
//             console.log($('#footerPlaceholder').load('./text/footer.html'));
//         }
//     });
// }

function loadSkeleton() {
    // not logged in
    console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
}

loadSkeleton();