function editar(id,nombreCategoria,nombreImagen){
    document.getElementById('Agregar').style.display="none";
    document.getElementById('editarBtn').style.display="block";

var boton=document.getElementById('editarBtn');
   
    //variable para editar
    var editarColeccion = db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(id)
    //configurar el boton
    

    //llenar el campo de nombre categoria
    document.getElementById("nombreCategoria").value=nombreCategoria;
    eliminarImg(nombreImagen)
    //accion del boton
    boton.onclick=function(){
        
        //recuperar datos del file
        var imagenNueva=document.getElementById("imagenCategoria").files[0];
        
        //si esta el campo de file vacio se va a cambiar todo lo demas menos la imagen
        if(imagenNueva==undefined){
            
            var nombreCategoria=document.getElementById("nombreCategoria").value;

            return editarColeccion.update({
                nombreCategoria: nombreCategoria,
            })
            .then(() => {
                document.getElementById('nombreCategoria').value='';
                    
                document.getElementById('Agregar').style.display="block";
                document.getElementById('editarBtn').style.display="none"; 
                
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        }else{
            agregarImagen(id)
            
        }
    }
}
function eliminarImg(nombreImagen){
    var inputImage=document.getElementById('imagenCategoria');
    inputImage.addEventListener('change',function(){
        
        var storageRef = firebase.storage().ref("imagesCategorias");
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
    var imagenNueva=document.getElementById("imagenCategoria").files[0];
    //se crea la refencia en donde se va a agregar la imagen
    var referenciaImg = firebase.storage().ref("imagesCategorias/"+imagenNueva.name);
    var nombreImagen=imagenNueva.name;
    //subir imagen
    var agregarImg=referenciaImg.put(imagenNueva);
    //guardar url de la imagen
    var imgUrl;
    //revisar que se suba la imagen
    agregarImg.on('state_changed', null,
    function(error){
        console.log('Error al subir el archivo', error);
    },
    function(){
        agregarImg.snapshot.ref.getDownloadURL().then(function (URL) {
            imgUrl=URL; 
            console.log(imgUrl);
            subirColeccion(nombreImagen,imgUrl,id);
        });
        
    }
    );

}
function subirColeccion(nombreImagen,imgUrl,id){

    var editarColeccion = db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(id)
    var nombreCategoria=document.getElementById('nombreCategoria').value;
    
    

    return editarColeccion.update({
        nombreCategoria: nombreCategoria,
        imagenCategoria: imgUrl,
        nombreImagen:nombreImagen
    })
    .then(() => {
        document.getElementById('nombreCategoria').value='';
        document.getElementById('imagenCategoria').value='';
            
        document.getElementById('Agregar').style.display="block";
        document.getElementById('editarBtn').style.display="none"; 
        
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}

