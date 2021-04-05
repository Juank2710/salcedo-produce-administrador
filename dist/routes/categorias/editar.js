function editar(id,nombreCategoria,nombreImagen){
    
   
    //variable para editar
    var editarColeccion = db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(id)
    //configurar el boton
    var boton=document.getElementById('Agregar');
    boton.innerHTML='Editar';

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
                boton.innerHTML='Agregar';
                document.getElementById('nombreCategoria').value='';
                
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
    var boton=document.getElementById('Agregar');
    

    return editarColeccion.update({
        nombreCategoria: nombreCategoria,
        imagenCategoria: imgUrl,
        nombreImagen:nombreImagen
    })
    .then(() => {
        boton.innerHTML='Agregar';
        document.getElementById('nombreCategoria').value='';
        document.getElementById('imagenCategoria').value='';
        
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

}






/*
function editar(id,nombreCategoria,nombreImagen){
    alert(nombreImagen);
    
    var nombreImagen;
    //eliminar la imagen
    var storageRef = firebase.storage().ref();
    var desertRef = storageRef.child('imagesCategorias/'+nombreImagen);
    desertRef.delete().then(function() {
        // File deleted successfully
        console.log("eliminado correctamente");
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error);
      });

    var nombreCategoria=document.getElementById('nombreCategoria').value=nombreCategoria;
   
    
    boton.innerHTML='Editar';
    boton.onclick=function(){
       
        //variable del url
       
       
       editarCategoria = db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(id);
        
        nombreCategorianuevo=document.getElementById('nombreCategoria').value;
        //agregarImagen
        var imagenCategoriaNueva=document.getElementById('imagenCategoria').files[0];

         //valida que este una imagen
         if(imagenCategoriaNueva!==undefined){

             var referenciaImgNueva = firebase.storage().ref("imagesCategorias/"+imagenCategoriaNueva.name);
             //nombre image
             nombreImagen=imagenCategoriaNueva.name;
             console.log("nueva inagem"+nombreImagen)
             //subir imagen
             var edtiarImg=referenciaImgNueva.put(imagenCategoriaNueva);
             //guardar url de la imagen
             edtiarImg.snapshot.ref.getDownloadURL().then(function (URL) {
                imgUrlEditado=URL;
                
               });
             
                //revisar que se suba la imagen
                edtiarImg.on('state_changed', null,
                function(error){
                    console.log('Error al subir el archivo', error);
                },
                function(){
                    console.log('Subida completada');
                    editarColeccion(nombreImagen)
                }
                );
                
            }else{
                alert("No ha seleccionado ninguna Imagen")
            }
            
        
        
    }
}
function editarColeccion(nombreImagen){

    
    
    console.log('aqui el enlace');
    console.log("url de la imagen "+imgUrlEditado);  
    console.log("uNombre "+nombreCategorianuevo);    
    console.log("imagen "+nombreImagen);



    return editarCategoria.update({
        nombreCategoria: nombreCategorianuevo,
        imagenCategoria: imgUrlEditado,
        nombreImagen:nombreImagen
    })
    .then(() => {
        boton.innerHTML='Agregar';
        document.getElementById('nombreCategoria').value='';
        document.getElementById('imagenCategoria').value='';
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}
*/