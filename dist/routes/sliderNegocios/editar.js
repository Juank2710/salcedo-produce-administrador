
function editar(id,nombreImagen){

var boton=document.getElementById('editarBtn');

    //si detecta que se a cambiado la imagen va a eliminar
    var inputImage=document.getElementById('imagenSliderEditar');
    inputImage.addEventListener('change',function(){
        
        var storageRef = firebase.storage().ref("imagesSlider");
        var desertRef = storageRef.child(nombreImagen);
        desertRef.delete().then(function() {
            // File deleted successfully
            console.log("eliminado correctamente");
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
    });
   
    var editarColeccion = db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("slider").doc(id);
        
   
    
    document.getElementById('nombreImageneditada').value=nombreImagen;

    boton.onclick=function(){
        var imagenNueva=document.getElementById("imagenSliderEditar").files[0];
        if(imagenNueva !== undefined){
            var referenciaImg = firebase.storage().ref("imagesSlider/"+imagenNueva.name);
            var nombreImagenNueva=imagenNueva.name;
            //subir imagen
            var agregarImg=referenciaImg.put(imagenNueva);
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
                    
                    accionEditar(imgUrl,nombreImagenNueva,editarColeccion)
                });
            }
            );
            
        }else{
            alert("No a modificado la imagen una imagen");
            document.getElementById('nombreImageneditada').value='';
        }
    }
}
function btnEditar(){
    
}
function accionEditar(imgUrl,nombreImagenNueva,editarColeccion){
    return editarColeccion.update({
        nombreImagen: nombreImagenNueva,
        imagenSlider: imgUrl,
    })
    .then(() => {
        document.getElementById('imagenSliderEditar').value='';
        document.getElementById('nombreImageneditada').value='';
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

