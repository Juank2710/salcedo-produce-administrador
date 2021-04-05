var auth=firebase.auth();
const loginForm=document.getElementById('loginForm');

//const email=document.getElementById('inputEmailAddress').value;
//const password=document.getElementById('inputPassword').value;

function getLogininFormInfo(){
const email=loginForm["inputEmailAddress"].value;
const password=loginForm["inputPassword"].value;
return  {email,password}
}

loginForm.addEventListener("submit", async event =>{
    event.preventDefault()
    try{
        const {email,password}=getLogininFormInfo();
        await login(email,password);
        console.log("user logged in!");
        window.location.href="/dist/routes/items/index.html";
    } catch(ex){
        alert("An error ocurred trying to login " + ex.message);
    }finally{
        document.getElementById('inputEmailAddress').value="";
        document.getElementById('inputPassword').value="";
    }
})
 

async function login(email, password){
    return await auth.signInWithEmailAndPassword(email,password)
}
