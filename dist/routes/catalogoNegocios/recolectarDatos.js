//valor de los select
var selectItems=document.getElementById('selectItems');
//valor del select categoria
var selectCategoria=document.getElementById('selectCategoria');
var valorSelectItem;
var valorSelectCategoria;

var ultimoIdNegocio;

//llenar el select de items
db.collection("items").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        selectItems.innerHTML+=`
        <option  value="${doc.id}" >${doc.data().nombreItem}</option>
       `
       
    });
});
//contenedor del select categoria
var contenedorCategoria=document.getElementById('contentCategoria');
//contenedor general
var contenedor=document.getElementById('contenedor');
function activarCategoria(){
    valorSelectItem=document.getElementById('selectItems').value;
    if(valorSelectItem!==''){
        contenedorCategoria.style.display="block";
        selectCategoria.innerHTML='<option value="">Seleccione</option>';
        //agregar datos al select de categorias
        db.collection("items").doc(`${valorSelectItem}`).collection("categorias").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                selectCategoria.innerHTML+=`
                <option  value="${doc.id}" >${doc.data().nombreCategoria}</option>
               `
            });
        });

    }else{
        selectCategoria.innerHTML='';
        contenedorCategoria.style.display="none";
        contenedor.style.display='none';
    }

}
function activarListaNeg(){
    valorSelectCategoria=document.getElementById('selectCategoria').value;
    //contenedor
    var contentListaNegocios=document.getElementById('contentListaNegocios');
    if(valorSelectCategoria!==''){
        contenedor.style.display="block";
        //recolectar datos 
        db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").onSnapshot((querySnapshot) => {
            contentListaNegocios.innerHTML='';
             
            querySnapshot.forEach((doc) => {
                ultimoIdNegocio=Math.max(doc.id);
                contentListaNegocios.innerHTML+=`
                <div class="container-fluid card shadow mb-4">
                <h3> ${doc.data().nombreNegocio}</h3>
                    <table class="table table-bordered">
                        <thead class="text-primary">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col">Ubicacion</th>
                                <th scope="col">Horario</th>
                                <th scope="col">Facebook</th>
                                <th scope="col">telefono</th>
                                <th scope="col">Imagen Portada</th>
                                <th scope="col" colspan="2" class=" text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col">${doc.id}</td>
                                <td scope="col">${doc.data().descripcion}</td>
                                <td scope="col">${doc.data().ubicacion}</td>
                                <td scope="col">Dede ${doc.data().horaInicio} Hasta ${doc.data().horaCierre}</td>
                                <td scope="col">${doc.data().facebook}</td>
                                <td scope="col">${doc.data().telefono}</td>
                                <td scope="col"><img src="${doc.data().imagenPortada}" alt="" id="imgListaNegoico" style="width: 100px; height: 50px;"></td>
                                <td><button class="btn btn-warning" onclick="editar(
                                    '${doc.id}',
                                    '${doc.data().nombreNegocio}',
                                    '${doc.data().descripcion}',
                                    '${doc.data().ubicacion}',
                                    '${doc.data().horaInicio}',
                                    '${doc.data().horaCierre}',
                                    '${doc.data().urlUbicacion}',
                                    '${doc.data().facebook}',
                                    '${doc.data().telefono}',
                                    '${doc.data().nombreImagen}'
                                
                                )">Editar</button> </td>
                                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}','${doc.data().nombreImagen}')">Eliminar</button></th>
                            </tr>
                
                        </tbody>
                    </table>
                
                </div>
            

               `
            });

            if(ultimoIdNegocio === undefined){
                ultimoIdNegocio=0;
            }
            //aumentar un valor para que no se repitan los Id
            ultimoIdNegocio=ultimoIdNegocio+1;
        });

    }else{
        contenedor.style.display="none";
    }
}
//llenar el select de categorias



/*
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
                <td >${doc.id}</td>
                <td >${doc.data().nombreCategoria}</td>
                <td >${doc.data().nombreImagen}</td>
                <td > <img src="${doc.data().imagenCategoria}" alt="imagen Categoria" style="width: 100px; height: 50px;"></td>
                
                <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombreCategoria}','${doc.data().nombreImagen}')">Editar</button> </td>
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
*/