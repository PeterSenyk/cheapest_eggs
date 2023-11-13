// Adds the search function to the search button
$("#searchBtn").on("click", function(){
    var url = "search_result.html?q=" + $("#search").val();
    
        let sort = document.getElementsByName("sort");
        for (var i = 0; i < url.length; i++) {
            if (sort[i].checked) {
                url += "&sort=" + sort[i].value;
                break;
            }
        }
        let order = document.getElementsByName("order");
        for (var i = 0; i < order.length; i++) {
            if (order[i].checked) {
                url += "&order=" + order[i].value;
            } 
        }
    window.location.href = url
})





$("#search").on("click", function(){
    $("#search_dropdown").css("display", "block")
    $("body").css({"background-color":"grey"})
    $("main").css("opacity", "0.5")
}) 
$("#close").on("click", function(){
    $("#search_dropdown").css("display", "none")
    $("body").css({"background-color":"white"})
    $("main").css("opacity", "1")
}) 


