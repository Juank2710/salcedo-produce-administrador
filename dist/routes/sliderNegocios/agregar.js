var nombreImagen;

function agregarImagenSlider(){
    
    var imagenNuevaSlider=document.getElementById('imagenSlider').files[0];
    if(imagenNuevaSlider!==undefined){

        var referenciaImg = firebase.storage().ref("imagesSlider/"+imagenNuevaSlider.name);
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
    
    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("slider").doc(`${ultimoIdSlider}`).set({
        
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