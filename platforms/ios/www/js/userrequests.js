// Wait for DOM to load
$(window).ready(function(){
    
    // Get listing function
    $.post(
        localStorage.getItem("serverurl"),
        {
            Username: localStorage.getItem("Username"),
            Password: localStorage.getItem("Password"),
            Function: "list_user_requests"
        },
        function(data){
            $("#loadingmessage").css("display","none");
            data = $.parseJSON(data);
            datalen = data.length;
            for(var i=0;i<datalen;i++){
                var item = data[i];
                $("#listings").append('<li z-depth="2" class="listingitem" itemid="'+item.ID+'"><div class="delete"><span class="deletebutton" itemid="'+item.ID+'">Delete</span></div><div class="listinginfo"><div class="listingtitle">'+item.Title+'</div><div class="listingdescription">'+item.Description+'</div></div></li>');
            }
            $(".deletebutton").click(function(){
                var itemid = $(this).attr("itemid");
                $.post(
                    localStorage.getItem("serverurl"),
                    {
                        Username: localStorage.getItem("Username"),
                        Password: localStorage.getItem("Password"),
                        ID: itemid,
                        Function: "delete_request"
                    },
                    function(data){
                        if(data === "true"){
                            window.location.href = "userrequests.html";
                        } else {
                            alert(data);
                        }
                    }
                );
            });
        }
    );
    
});