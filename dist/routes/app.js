// Initialize Cloud Firestore through Firebase
/*firebase.initializeApp({
    apiKey: "AIzaSyCwsFDdN2914nYD_9IiaEb35i_gGvTNa3U",
    authDomain: "proyectoprueba-b1664.firebaseapp.com",
    projectId: "proyectoprueba-b1664"
  });
  
  var db = firebase.firestore();
*/
 
// aqui el select


var select=document.getElementById('sel1');
var idmayor;
db.collection("users").onSnapshot((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
         idmayor=Math.max(doc.id);
         
        

        select.innerHTML+=`
        <option value='${doc.id}'> ${doc.data().first}</option>
        `
    });

    if(idmayor === undefined){
        idmayor=0;
    }

    console.log("el id mayor en este arreglo es",idmayor);
    idmayor=idmayor+1;
    console.log("El id aumentado 1 es ", idmayor)

});
function prueba(){
    var valor=document.getElementById('sel1').value;
    

    alert(valor);
}




//leer documentos
var tabla=document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    
tabla.innerHTML='';
    querySnapshot.forEach((doc) => {

        //console.log(`${doc.id} => ${doc.data()}`);
       

        tabla.innerHTML+=`
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button> </td>
        <th scope="col"><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></th>
      </tr>`

    });
});


var tabla2=document.getElementById('tabla2');

db.collection("pruebaItems").onSnapshot((querySnapshot) => {
    tabla2.innerHTML='';

    querySnapshot.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tabla2.innerHTML+=`
        <tr>
        <th scope="row">${doc.id}</th>
        <th scope="row">${doc.data().image}</th>
        <th scope="row">${doc.data().nombre}</th>
        </tr>
        
        `
    });
});

//funciones de los botones

//agregar documentos una subcoleccion

function guardad(){
    var nombre=document.getElementById('nombre').value;
    var apellido=document.getElementById('apellido').value;
    var fecha=document.getElementById('fecha').value;

          db.collection("users").doc(`${idmayor}`).set({
        first: nombre,
        last: apellido,
        born: fecha
      })
      .then(() => {
          console.log("Document written with ID: ",);
          document.getElementById('nombre').value='';
          document.getElementById('apellido').value='';
          document.getElementById('fecha').value='';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
     
}


//borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(() => {
        
        console.log("Document successfully deleted!");
        
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    var tabla=document.getElementById('tabla')
    tabla.innerHTML='';
}
//tabla categorias
var tablaCategoria=document.getElementById('tablaCategoria');
db.collection("pruebaItems").doc('2').collection('categorias').onSnapshot((querySnapshot) => {
    tablaCategoria.innerHTML='';
    querySnapshot.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tablaCategoria.innerHTML+=`
        <tr>
        <th scope="row">${doc.id}</th>
        <th scope="row">${doc.data().idCategoria}</th>
        <th scope="row">${doc.data().nombreCategoria}</th>
        </tr>      
        `
    });
});

//editar un documento

function editar(id,nombre,apellido,fecha){


    document.getElementById('nombre').value=nombre;
    document.getElementById('apellido').value=apellido;
    document.getElementById('fecha').value=fecha;

    boton=document.getElementById('boton');
    boton.innerHTML='Editar';
    boton.onclick=function(){

        var washingtonRef = db.collection("users").doc(id);

        var nombre=document.getElementById('nombre').value;
        var apellido=document.getElementById('apellido').value;
        var fecha=document.getElementById('fecha').value;
        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            first: nombre,
            last: apellido,
            born: fecha
    })
    .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML='Guardar';
        document.getElementById('nombre').value='';
    document.getElementById('apellido').value='';
    document.getElementById('fecha').value='';
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
   
}
 

}