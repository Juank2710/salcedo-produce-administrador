function editar(id,nombreNegocio,descripcion,ubicacion,horaInicio,horaCierre,urlUbicacion,facebook,telefono,nombreImagen){

    eliminarImg(nombreImagen);


    var editarColeccion = db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(id);
        
    var boton=document.getElementById('Agregar');
    boton.innerHTML='Editar';
    document.getElementById('nombreNegocio').value=nombreNegocio;
    document.getElementById('descripcion').value=descripcion;
    document.getElementById('ubicacion').value=ubicacion;
    document.getElementById('horaInicio').value=horaInicio;
    document.getElementById('horaCierre').value=horaCierre;
    document.getElementById('urlUbicacion').value=urlUbicacion;
    document.getElementById('facebook').value=facebook;
    document.getElementById('telefono').value=telefono;


    boton.onclick=function(){
        var imagenNueva=document.getElementById("imagenPortadaNeg").files[0];
        if(imagenNueva==undefined){
            var nombreNegocio=document.getElementById('nombreNegocio').value;
            var descripcion=document.getElementById('descripcion').value;
            var ubicacion=document.getElementById('ubicacion').value;
            var horaInicio=document.getElementById('horaInicio').value;
            var horaCierre=document.getElementById('horaCierre').value;
            var urlUbicacion=document.getElementById('urlUbicacion').value;
            var facebook=document.getElementById('facebook').value;
            var telefono=document.getElementById('telefono').value;
            return editarColeccion.update({
                nombreNegocio: nombreNegocio,
                descripcion: descripcion,
                ubicacion:ubicacion,
                horaInicio:horaInicio,
                horaCierre:horaCierre,
                urlUbicacion:urlUbicacion,
                facebook:facebook,
                telefono:telefono
                
            })
            .then(() => {
                boton.innerHTML='Agregar';
                document.getElementById('nombreNegocio').value='';
                document.getElementById('descripcion').value='';
                document.getElementById('ubicacion').value='';
                document.getElementById('horaInicio').value='08:00';
                document.getElementById('horaCierre').value='17:00';
                document.getElementById('urlUbicacion').value='';
                document.getElementById('facebook').value='';
                document.getElementById('telefono').value='';          
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        }else{
            agregarImagen(id)
            
        }
    }
}
function eliminarImg(nombreImagen){

    var inputImage=document.getElementById('imagenPortadaNeg');
    inputImage.addEventListener('change',function(){
        
        var storageRef = firebase.storage().ref("ImagesNegocios");
        var desertRef = storageRef.child(nombreImagen);
        desertRef.delete().then(function() {
            // File deleted successfully
            console.log("eliminado correctamente");
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
    });

}

function agregarImagen(id){
    var imagenPortadaNeg=document.getElementById('imagenPortadaNeg').files[0];
    if(imagenPortadaNeg!==undefined){

        var referenciaImg = firebase.storage().ref("ImagesNegocios/"+imagenPortadaNeg.name);
        var nombreImagen=imagenPortadaNeg.name;
        //subir imagen
        var agregarImg=referenciaImg.put(imagenPortadaNeg);
        //guardar url de la imagen
        
        //revisar que se suba la imagen
        agregarImg.on('state_changed', null,
                function(error){
                    console.log('Error al subir el archivo', error);
                },
                function(){
                    console.log('Subida completada');
                    agregarImg.snapshot.ref.getDownloadURL().then((URL)=> {
                       var imgUrl=URL; 
                       subirColeccion(nombreImagen, imgUrl,id)
                    });
                }
                );

    }else{
        alert("No a seleccionado una imagen");
    }
}
function subirColeccion(nombreImagen, imgUrl,id){
    var boton=document.getElementById('Agregar');


    var nombreNegocio=document.getElementById('nombreNegocio').value;
    var descripcion=document.getElementById('descripcion').value;
    var ubicacion=document.getElementById('ubicacion').value;
    var horaInicio=document.getElementById('horaInicio').value;
    var horaCierre=document.getElementById('horaCierre').value;
    var urlUbicacion=document.getElementById('urlUbicacion').value;
    var facebook=document.getElementById('facebook').value;
    var telefono=document.getElementById('telefono').value;
    //subir coleccion
    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(id).set({
        nombreNegocio: nombreNegocio,
        descripcion: descripcion,
        ubicacion:ubicacion,
        horaInicio:horaInicio,
        horaCierre:horaCierre,
        urlUbicacion:urlUbicacion,
        facebook:facebook,
        telefono:telefono,
        nombreImagen:nombreImagen,
        imagenPortada:imgUrl
      })
      .then(() => {
        boton.innerHTML='Agregar';
          document.getElementById('nombreNegocio').value='';
          document.getElementById('descripcion').value='';
          document.getElementById('ubicacion').value='';
          document.getElementById('horaInicio').value='08:00';
          document.getElementById('horaCierre').value='17:00';
          document.getElementById('urlUbicacion').value='';
          document.getElementById('facebook').value='';
          document.getElementById('telefono').value='';          
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
}