
function editar(id,nombreImagen){
    document.getElementById('Agregar').style.display="none";
    document.getElementById('editarBtn').style.display="block";

var boton=document.getElementById('editarBtn');

    //si detecta que se a cambiado la imagen va a eliminar
    var inputImage=document.getElementById('imagenSlider');
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
        
   
    
    
    document.getElementById('contentNombreImagen').style.display="block";
    document.getElementById('nombreImageneditada').value=nombreImagen;

    boton.onclick=function(){
        var imagenNueva=document.getElementById("imagenSlider").files[0];
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
                    
                    accionEditar(imgUrl,nombreImagenNueva,editarColeccion,boton)
                });
            }
            );
            
        }else{
            alert("No a modificado la imagen una imagen");
            document.getElementById('contentNombreImagen').style.display="none";
            document.getElementById('nombreImageneditada').value='';
            document.getElementById('Agregar').style.display="block";
        document.getElementById('editarBtn').style.display="none";
        }
    }
}
function btnEditar(){
    
}
function accionEditar(imgUrl,nombreImagenNueva,editarColeccion,boton){
    return editarColeccion.update({
        nombreImagen: nombreImagenNueva,
        imagenSlider: imgUrl,
    })
    .then(() => {
        document.getElementById('imagenSlider').value='';
        document.getElementById('nombreImageneditada').value='';
        document.getElementById('contentNombreImagen').style.display="none";
        document.getElementById('Agregar').style.display="block";
        document.getElementById('editarBtn').style.display="none";
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

