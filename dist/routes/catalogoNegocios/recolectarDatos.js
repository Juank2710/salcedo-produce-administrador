//valor de los select
var selectItems=document.getElementById('selectItems');
//valor del select categoria
var selectCategoria=document.getElementById('selectCategoria');
//valor del select del negocio
var selectNegocio =document.getElementById('selectNegocio');

var valorSelectItem;
var valorSelectCategoria;
var valorSelectNegocio;

var ultimoIdCatalogo;

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
//content del select negocio
var contentNegocio=document.getElementById('contentNegocio');

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
        contentNegocio.style.display="none";
        contenedor.style.display='none';
    }

}
function activarListaNeg(){
    valorSelectCategoria=document.getElementById('selectCategoria').value;
    
    if(valorSelectCategoria!==''){
        //contenedorCategoria.style.display="block";
        document.getElementById('contentNegocio').style.display="block";
        
        selectNegocio.innerHTML='<option value="">Seleccione</option>';
        //agregar datos al select de categorias
        db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                selectNegocio.innerHTML+=`
                <option  value="${doc.id}" >${doc.data().nombreNegocio}</option>
               `
            });
        });

    }else{
        selectNegocio.innerHTML='';
        document.getElementById('contentNegocio').style.display="none";
        contenedor.style.display='none';
        
    }

}




function activarContent(){
    valorSelectNegocio=document.getElementById('selectNegocio').value;
    //contenedor
    var contentListaNegocios=document.getElementById('contentListaNegocios');
    //contenedor tabla
    var tabla_slider=document.getElementById('tabla_imagenes');
    if(valorSelectNegocio!==''){
        contenedor.style.display="block";
        //recolectar datos 
        db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("catalogo").onSnapshot((querySnapshot) => {
            tabla_slider.innerHTML='';
             
            querySnapshot.forEach((doc) => {

                ultimoIdCatalogo=Math.max(doc.id);
                tabla_slider.innerHTML+=`
                <tr>
                    <td>${doc.data().nombreProducto}</td>
                    <td>${doc.data().descripcion}</td>
                    <td>${doc.data().valor}</td>
                    <td><img src="${doc.data().imagenProducto}" alt="imagen Categoria" style="width: 100px; height: 50px;"></td>

                    <td><button class="btn btn-warning" data-toggle="modal" data-target="#modalEditar" onclick="editar('${doc.id}','${doc.data().nombreProducto}','${doc.data().descripcion}','${doc.data().valor}','${doc.data().nombreImagen}')">Editar</button> </td>
                    <th scope="col"><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></th>
                </tr>
               `
            });

            if(ultimoIdCatalogo === undefined){
                ultimoIdCatalogo=0;
            }
            //aumentar un valor para que no se repitan los Id
            ultimoIdCatalogo=ultimoIdCatalogo+1;
        });

    }else{
        contenedor.style.display="none";
    }
}
