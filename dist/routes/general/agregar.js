var nombreImagen;

function agregarImagenSlider(){
    
    var imagenNuevaSlider=document.getElementById('imagenSlider').files[0];
    if(imagenNuevaSlider!==undefined){

        var referenciaImg = firebase.storage().ref("imagenesPublicidad/"+imagenNuevaSlider.name);
        nombreImagen=imagenNuevaSlider.name;
        //subir imagen
        var agregarImg=referenciaImg.put(imagenNuevaSlider);
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
    
    db.collection("sliderPublicidad").doc(`${ultimoIdSlider}`).set({
        nombreImagen:nombreImagen,
        imagenSlider:imgUrl
      })
      .then(() => {
          
          document.getElementById('imagenSlider').value='';          
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    
    
}





/*otra parte*/










//variable del url
var imgUrl;
var nombreImagen;
function agregarCategoria(){
    
    var imagenCategoria=document.getElementById('imagenCategoria').files[0];
    
    //valida que este una imagen
    if(imagenCategoria!==undefined){
       

        var referenciaImg = firebase.storage().ref("imagesCategorias/"+imagenCategoria.name);
        nombreImagen=imagenCategoria.name;
        //subir imagen
        var agregarImg=referenciaImg.put(imagenCategoria);
        //guardar url de la imagen
        
        //revisar que se suba la imagen
        agregarImg.on('state_changed', null,
                function(error){
                    console.log('Error al subir el archivo', error);
                },
                function(){
                    console.log('Subida completada');
                    agregarImg.snapshot.ref.getDownloadURL().then((URL)=> {
                       imgUrl=URL; 
                       subirColeccion(imgUrl)
                    });
                }
                );

    }else{
        alert("No ha seleccionado ninguna Imagen")
    }
    
    function subirColeccion(imgUrl){
        var nombreCategoria=document.getElementById('nombreCategoria').value;

       db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(`${ultimoIdCategoria}`).set({
            nombreCategoria: nombreCategoria,
            imagenCategoria: imgUrl,
            nombreImagen:nombreImagen
          })
          .then(() => {
              document.getElementById('nombreCategoria').value='';
              document.getElementById('imagenCategoria').value='';
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });
    }

/*

    var imagen= imagenCategoria.files[0];

    var imagenReferencia= firebase.storage().ref();
    var uploadTask=imagenReferencia.child('images/'+imagen.name).put(imagen);

   */

    
}







    //nombre foto
    
    
/*
    db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(`${ultimoIdCategoria}`).set({
        nombreCategoria: nombreCategoria,
        imagenCategoria: imagenCategoria,
      })
      .then(() => {
          document.getElementById('nombreCategoria').value='';
          document.getElementById('imagenCategoria').value='';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });*/
