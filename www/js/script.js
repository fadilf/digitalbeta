localStorage.setItem("serverurl", "http://192.168.43.138/server-api/api.php");
if(localStorage.getItem("serverurl") === null){
    localStorage.setItem("serverurl", "http://192.168.43.138/server-api/api.php");
//    localStorage.setItem("serverurl", "http://77.104.154.250/~maveri87/server-api/api.php");
}
if(localStorage.getItem("Username") === null){
    window.location.href = "login.html";
}