var nombreImagen;

function agregarProducto(){
    
    var imagenProducto=document.getElementById('imagenProducto').files[0];
    if(imagenProducto!==undefined){

        var referenciaImg = firebase.storage().ref("imagesCatalogo/"+imagenProducto.name);
        nombreImagen=imagenProducto.name;
        //subir imagen
        var agregarImg=referenciaImg.put(imagenProducto);
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
                      
                       subir(imgUrl)
                    });
                }
                );

    }else{
        alert("No a seleccionado una imagen");
    }
}
function subir(imgUrl){
    var nombreProducto=document.getElementById('nombreProducto').value;
    var descripcion=document.getElementById('descripcionProducto').value;
    var valor=document.getElementById('valorProducto').value;
    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("catalogo").doc(`${ultimoIdCatalogo}`).set({
        nombreProducto:nombreProducto,
        descripcion:descripcion,
        valor:valor,
        nombreImagen:nombreImagen,
        imagenProducto:imgUrl
      })
      .then(() => {
        document.getElementById('nombreProducto').value='';
        document.getElementById('descripcionProducto').value='';
        document.getElementById('valorProducto').value='';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    
    
}