

//valor de los select
var selectItems=document.getElementById('selectItems');
//llenar tabla
var tabla_categoria=document.getElementById('tabla_categoria');
//id del select
var valorSelect;

//id mayor
var ultimoIdCategoria;

db.collection("items").onSnapshot((querySnapshot) => {
    
    querySnapshot.forEach((doc) => {

        selectItems.innerHTML+=`
        <option  value="${doc.id}" >${doc.data().nombreItem}</option>
       `
       
    });
});

var contenedor=document.getElementById('contenedor');

function elegir(){
   valorSelect=document.getElementById('selectItems').value;
   
    if(valorSelect!==''){
        contenedor.style.display="block";
        db.collection("items").doc(`${valorSelect}`).collection("categorias").onSnapshot((querySnapshot) => {
            tabla_categoria.innerHTML='';
            querySnapshot.forEach((doc) => {

                ultimoIdCategoria=Math.max(doc.id);
                
        
                tabla_categoria.innerHTML+=`
                <tr>
                <td >${doc.data().nombreCategoria}</td>
                <td >${doc.data().nombreImagen}</td>
                <td > <img src="${doc.data().imagenCategoria}" alt="imagen Categoria" style="width: 100px; height: 50px;"></td>
                
                <td><button class="btn btn-warning" data-toggle="modal" data-target="#modalEditar" onclick="editar('${doc.id}','${doc.data().nombreCategoria}','${doc.data().nombreImagen}')">Editar</button> </td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}','${doc.data().nombreImagen}')">Eliminar</button></th>
                </tr>   
               `
            });
            
            if(ultimoIdCategoria === undefined){
                ultimoIdCategoria=0;
            }
            //aumentar un valor para que no se repitan los Id
            ultimoIdCategoria=ultimoIdCategoria+1;
            
        });
    }else{
        contenedor.style.display="none";
    }
    
    
}
