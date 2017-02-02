if(localStorage.getItem("serverurl") === null){
    localStorage.setItem("serverurl", "http://localhost/server-api/api.php");
}
if(localStorage.getItem("Username") === null){
    window.location.href = "login.html";
}