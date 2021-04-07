function editar(id,nombreNegocio,descripcion,ubicacion,horaInicio,horaCierre,urlUbicacion,facebook,telefono,nombreImagen){
    

var boton=document.getElementById('editarBtn');

    eliminarImg(nombreImagen);


    var editarColeccion = db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(id);
        
    
    document.getElementById('nombreNegocioEditar').value=nombreNegocio;
    document.getElementById('descripcionEditar').value=descripcion;
    document.getElementById('ubicacionEditar').value=ubicacion;
    document.getElementById('horaInicioEditar').value=horaInicio;
    document.getElementById('horaCierreEditar').value=horaCierre;
    document.getElementById('urlUbicacionEditar').value=urlUbicacion;
    document.getElementById('facebookEditar').value=facebook;
    document.getElementById('telefonoEditar').value=telefono;


    boton.onclick=function(){
        var imagenNueva=document.getElementById("imagenPortadaNegEditar").files[0];
        if(imagenNueva==undefined){
            var nombreNegocio=document.getElementById('nombreNegocioEditar').value;
            var descripcion=document.getElementById('descripcionEditar').value;
            var ubicacion=document.getElementById('ubicacionEditar').value;
            var horaInicio=document.getElementById('horaInicioEditar').value;
            var horaCierre=document.getElementById('horaCierreEditar').value;
            var urlUbicacion=document.getElementById('urlUbicacionEditar').value;
            var facebook=document.getElementById('facebookEditar').value;
            var telefono=document.getElementById('telefonoEditar').value;
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
                document.getElementById('nombreNegocioEditar').value='';
                document.getElementById('descripcionEditar').value='';
                document.getElementById('ubicacionEditar').value='';
                document.getElementById('horaInicioEditar').value='08:00';
                document.getElementById('horaCierreEditar').value='17:00';
                document.getElementById('urlUbicacionEditar').value='';
                document.getElementById('facebookEditar').value='';
                document.getElementById('telefonoEditar').value='';         
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

    var inputImage=document.getElementById('imagenPortadaNegEditar');
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
    var imagenPortadaNeg=document.getElementById('imagenPortadaNegEditar').files[0];
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

    var nombreNegocio=document.getElementById('nombreNegocioEditar').value;
    var descripcion=document.getElementById('descripcionEditar').value;
    var ubicacion=document.getElementById('ubicacionEditar').value;
    var horaInicio=document.getElementById('horaInicioEditar').value;
    var horaCierre=document.getElementById('horaCierreEditar').value;
    var urlUbicacion=document.getElementById('urlUbicacionEditar').value;
    var facebook=document.getElementById('facebookEditar').value;
    var telefono=document.getElementById('telefonoEditar').value;
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
          document.getElementById('nombreNegocioEditar').value='';
          document.getElementById('descripcionEditar').value='';
          document.getElementById('ubicacionEditar').value='';
          document.getElementById('horaInicioEditar').value='08:00';
          document.getElementById('horaCierreEditar').value='17:00';
          document.getElementById('urlUbicacionEditar').value='';
          document.getElementById('facebookEditar').value='';
          document.getElementById('telefonoEditar').value='';
          document.getElementById('imagenPortadaNegEditar').value='';           
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
}