auth.onAuthStateChanged(async (user)=>{
    if(user){
        console.log(1);
    }else{
        window.location.href="/dist/login.html";
    }
})