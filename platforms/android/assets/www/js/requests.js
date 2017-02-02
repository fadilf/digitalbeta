// Wait for DOM to load
$(window).ready(function(){
    var page = 1;
    var number = 4;
    var first = true;
    
    // Get listing function
    function getlistings(){
        $.post(
            localStorage.getItem("serverurl"),
            {
                Username: localStorage.getItem("Username"),
                Password: localStorage.getItem("Password"),
                Function: "list_latest_requests",
                Number: number,
                Page: page++
            },
            function(data){
                if(first){
                    first = false;
                    $("#loadingmessage").css("display","none");
                }
                if(data == "[]"){
                    $("#loadmore").css("display","none");
                } else {
                    data = $.parseJSON(data);
                    datalen = data.length;
                    for(var i=0;i<datalen;i++){
                        var item = data[i];
                        $("#listings").append('<li z-depth="2" class="listingitem" itemid="'+item.ID+'"><div class="listinginfo"><div class="listingtitle">'+item.Title+'</div><div class="listingdescription">'+item.Description+'</div></div></li>');
                    }
                }
            }
        );
    }
    
    // Get first batch of latest listings
    getlistings();
    $("#loadmore").css("display","block");
    
    $("#loadmore").click(function(){
        getlistings();
    });
    
    $("#add").click(function(){
        $("#addform").css("display", "block");
    });
    
    $("#addlisting").submit(function(){
        event.preventDefault();
        var title = $("#addlisting input[name='Title']").val();
        var description = $("#addlisting textarea[name='Description']").val();
        $.post(
            localStorage.getItem("serverurl"),
            {
                Username: localStorage.getItem("Username"),
                Password: localStorage.getItem("Password"),
                Function: "create_request",
                Title: title,
                Description: description
            },
            function(data){
                if(data == "Error code: 95"){
                    alert("No Title/Description.");
                } else if(data == "true") {
                    window.location.href = "requests.html";
                } else {
                    alert("An error occurred.");
                }
            }
        );
    });
});