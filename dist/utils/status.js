auth.onAuthStateChanged(async (user)=>{
    if(user){
    }else{
        window.location.href="/dist/login.html";
    }
})