
function editar(id,nombreProducto,descripcion,valor,nombreImagen){

var boton=document.getElementById('editarBtn');

eliminarImg(nombreImagen);

    document.getElementById('nombreProductoEditar').value=nombreProducto;
    document.getElementById('descripcionProductoEditar').value=descripcion;
    document.getElementById('valorProductoEditar').value=valor;

    var editarColeccion = db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("catalogo").doc(id);
        
   

    boton.onclick=function(){
        var imagenNueva=document.getElementById("imagenProductoEditar").files[0];
        if(imagenNueva == undefined){
            
            var nombreProductoEditada=document.getElementById('nombreProductoEditar').value;
            var DescripcionEditada=document.getElementById('descripcionProductoEditar').value;
            var valorEditada=document.getElementById('valorProductoEditar').value;
            
            return editarColeccion.update({
                nombreProducto:nombreProductoEditada,
                descripcion:DescripcionEditada,
                valor:valorEditada,
                
            })
            .then(()=>{
                document.getElementById('nombreProductoEditar').value='';
                document.getElementById('descripcionProductoEditar').value='';
                document.getElementById('valorProductoEditar').value='';
                
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
            
        }else{
            agregarImagen(id);
        }
    }
}


function eliminarImg(nombreImagen){

    var inputImage=document.getElementById('imagenProductoEditar');
    inputImage.addEventListener('change',function(){
        
        var storageRef = firebase.storage().ref("imagesCatalogo");
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
    var imagenPortadaNeg=document.getElementById('imagenProductoEditar').files[0];
    if(imagenPortadaNeg!==undefined){

        var referenciaImg = firebase.storage().ref("imagesCatalogo/"+imagenPortadaNeg.name);
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
    var nombreProductoEditada=document.getElementById('nombreProductoEditar').value;
    var DescripcionEditada=document.getElementById('descripcionProductoEditar').value;
    var valorEditada=document.getElementById('valorProductoEditar').value;
    
    //subir coleccion
    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("catalogo").doc(id).set({
        nombreProducto:nombreProductoEditada,
        descripcion:DescripcionEditada,
        valor:valorEditada,
        nombreImagen:nombreImagen,
        imagenPortada:imgUrl
        
      })
      .then(() => {
        document.getElementById('nombreProductoEditar').value='';
        document.getElementById('descripcionProductoEditar').value='';
        document.getElementById('valorProductoEditar').value='';           
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
}