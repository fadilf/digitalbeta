/*
    Clear localStorage
*/
localStorage.removeItem("ID");
localStorage.removeItem("Username");
localStorage.removeItem("Password");

$(window).ready(function(){
//    $("#checkswitch").prop("checked", true);
    $(".form").submit(function(){
        event.preventDefault();
        if($(this).attr("id") == "login"){
            // Logging In
            $.post(
                localStorage.getItem("serverurl"),
                {
                    Username: $("#login input[name=username]").val(),
                    Password: $("#login input[name=password]").val(),
                    Function: "profile"
                },
                function(data){
                    if(data == "Error code: 37"){
                        alert("Account-Password combination does not exist.");
                    } else {
                        data = $.parseJSON(data);
                        localStorage.setItem("ID", data.ID);
                        localStorage.setItem("Username", data.Username);
                        localStorage.setItem("Password", data.Password);
                        window.location.href = "index.html";
                    }
                }
            );
            
        } else {
            if($("#signup input[name=email]").val() == ""){
                alert("Email not given.");
            } else if($("#signup input[name=username]").val() == ""){
                alert("Username not given.");
            } else if($("#signup input[name=password]").val() == ""){
                alert("Password not given.");
            } else {
            // Signing Up
                $.post(
                    localStorage.getItem("serverurl"),
                    {
                        Email: $("#signup input[name=email]").val(),
                        Username: $("#signup input[name=username]").val(),
                        Password: $("#signup input[name=password]").val(),
                        Function: "sign_up"
                    },
                    function(data){
                        if(data == "exists"){
                            alert("Account already exists.");
                        } else if(data == 1){
                            alert("Account created successfully! Please login to the account.");
                            window.location.href = "login.html";
                        } else {
                            alert("An error occurred when creating the account. Please try again later.");
                        }
                        /*if(data == "Error code: 38"){
                            alert("Account does not exist.");
                        } else {
                            data = $.parseJSON(data);
                            localStorage.setItem("ID", data.ID);
                            localStorage.setItem("Username", data.Username);
                            localStorage.setItem("Password", data.Password);
                            localStorage.setItem("Thumbnail", data.Thumbnail);
                            window.location.href = "index.html";
                        }*/
                    }
                );
            }
        }
    });
});