var auth=firebase.auth();
//para el logout
const logoutButton =document.getElementById('logoutButton');

async function logout(){
    return await auth.signOut();
}
logoutButton.addEventListener("click",async (event)=>{
    event.preventDefault();
    await logout();
    console.log("user logged out!");
    window.location.href="/dist/login.html";
})