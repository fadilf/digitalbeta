// Wait for DOM to load
$(window).ready(function(){
    var page = 1;
    var number = 7;
    var first = true;
    
    // Get listing function
    function getlistings(){
        $.post(
            localStorage.getItem("serverurl"),
            {
                Username: localStorage.getItem("Username"),
                Password: localStorage.getItem("Password"),
                Function: "list_latest_listings",
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
                        $("#listings").append('<li z-depth="2" class="listingitem"><div class="listingthumb" style="background-image:url('+item.Thumbnail+')"></div><div class="listinginfo"><div class="listingtitle">'+item.Title+'</div><div class="listingdescription">'+item.Description+'</div><a class="listingemail" href="'+mailto+'">Contact</a></div></li>');
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
    
    $("#addlisting").attr("action", localStorage.getItem("serverurl"));
    $('input[name="Username"]').attr("value", localStorage.getItem("Username"));
    $('input[name="Password"]').attr("value", localStorage.getItem("Password"));
    $('input[name="Redirect"]').attr("value", window.location.href);
    
    $("#add").click(function(){
        $("#addform").css("display", "block");
    });
//    setTimeout(function(){
//        $("#add").click();
//    },1000);
    
    $("#user").click(function(){
        window.location.href = "userlistings.html";
    });
    
    $("#closeadd").click(function(){
        $("#addform").css("display", "none");
    });
    
    $("#addlisting").submit(function(){
        if($('input[name="Title"]').val() === ""){
            alert("No title given");
            event.preventDefault();
        } else if($('textarea[name="Description"]').val() === ""){
            alert("No description given");
            event.preventDefault();
        }/* else {
            $("#addform").css("display", "none");
        }*/
    });
});