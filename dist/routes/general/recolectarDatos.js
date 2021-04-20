var ultimoIdSlider;
var tabla_enlaces=document.getElementById('tabla_Enlaces');

db.collection("enlaces").onSnapshot((querySnapshot) => {
    tabla_enlaces.innerHTML='';
    querySnapshot.forEach((doc) => {

        tabla_enlaces.innerHTML+=`
        <tr>
        <td>${doc.data().facebook}</td>
        <td>${doc.data().youtube}</td>
        <td><button class="btn btn-warning" data-toggle="modal" data-target="#modalEditarEnlaces"  onclick="editarEnlaces('${doc.id}','${doc.data().facebook}','${doc.data().youtube}')">Editar</button> </td>
        
        </tr>
       `
       
    });
});


var tabla_slider=document.getElementById('tabla_imagenes');
db.collection("sliderPublicidad").onSnapshot((querySnapshot) => {
    tabla_slider.innerHTML='';
     
    querySnapshot.forEach((doc) => {

        ultimoIdSlider=Math.max(doc.id);
        tabla_slider.innerHTML+=`
        <tr>
            <td>${doc.data().nombreImagen}</td>
            <td><img src="${doc.data().imagenSlider}" alt="imagen Categoria" style="width: 100px; height: 50px;"></td>

            <td><button class="btn btn-warning" data-toggle="modal" data-target="#modalEditarImagenes" onclick="editarImagen('${doc.id}','${doc.data().nombreImagen}')">Editar</button> </td>
            <th scope="col"><button class="btn btn-danger" onclick="eliminarImagen('${doc.id}','${doc.data().nombreImagen}')">Eliminar</button></th>
        </tr>
       `
    });

    if(ultimoIdSlider === undefined){
        ultimoIdSlider=0;
    }
    //aumentar un valor para que no se repitan los Id
    ultimoIdSlider=ultimoIdSlider+1;
});

var tablaPopUp=document.getElementById('tabla_PopUp');
db.collection("imagenPublicidad").onSnapshot((querySnapshot) => {
    tablaPopUp.innerHTML='';
     
    querySnapshot.forEach((doc) => {

        tablaPopUp.innerHTML+=`
        <tr>
            <td>${doc.data().nombreImagen}</td>
            <td><img src="${doc.data().imagenSlider}" alt="imagen Categoria" style="width: 100px; height: 50px;"></td>

            <td><button class="btn btn-warning" data-toggle="modal" data-target="#modalEditarImagenes" onclick="editarImagenPopUp('${doc.id}','${doc.data().nombreImagen}')">Editar</button> </td>
            
        </tr>
       `
    });

    
});
