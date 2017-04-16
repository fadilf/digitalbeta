// Wait for DOM to load
$(window).ready(function(){
    var page = 1;
    var number = 9;
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
                        var mailto = "mailto:"+item.Email+"?subject="+encodeURIComponent('Response to: "'+item.Title+'" on Freecycle Dubai');
                        $("#listings").append('<li z-depth="2" class="listingitem" itemid="'+item.ID+'"><div class="listinginfo"><div class="listingtitle">'+item.Title+'</div><div class="listingdescription">'+item.Description+'</div><a class="listingemail" href="'+mailto+'">Contact</a></div></li>');
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
    
    $("#user").click(function(){
        window.location.href = "userrequests.html";
    });
    
    $("#closeadd").click(function(){
        $("#addform").css("display", "none");
    });
    
    $("#addlisting").submit(function(){
        event.preventDefault();
        var title = $("#addlisting input[name='Title']").val();
        var description = $("#addlisting textarea[name='Description']").val();
        if(title === ""){
            alert("No title given");
        } else if(description === "") {
            alert("No description given");
        } else {
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
                    if(data == "true") {
                        window.location.href = "requests.html";
                    } else {
                        alert("An error occurred.");
                    }
                }
            );
        }
    });
});