var nombreImagen;

function agregarNegocio(){
    
    var imagenPortadaNeg=document.getElementById('imagenPortadaNeg').files[0];
    if(imagenPortadaNeg!==undefined){

        var referenciaImg = firebase.storage().ref("ImagesNegocios/"+imagenPortadaNeg.name);
        nombreImagen=imagenPortadaNeg.name;
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
                      
                       subir(imgUrl)
                    });
                }
                );

    }else{
        alert("No a seleccionado una imagen");
    }

}
function subir(imgUrl){
   
    
    var nombreNegocio=document.getElementById('nombreNegocio').value;
    var descripcion=document.getElementById('descripcion').value;
    var ubicacion=document.getElementById('ubicacion').value;
    var horaInicio=document.getElementById('horaInicio').value;
    var horaCierre=document.getElementById('horaCierre').value;
    var urlUbicacion=document.getElementById('urlUbicacion').value;
    var facebook=document.getElementById('facebook').value;
    var telefono=document.getElementById('telefono').value;

    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${ultimoIdNegocio}`).set({
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
          document.getElementById('nombreNegocio').value='';
          document.getElementById('descripcion').value='';
          document.getElementById('ubicacion').value='';
          document.getElementById('horaInicio').value='08:00';
          document.getElementById('horaCierre').value='17:00';
          document.getElementById('urlUbicacion').value='';
          document.getElementById('facebook').value='';
          document.getElementById('telefono').value='';
          document.getElementById('imagenPortadaNeg').value='';          
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    
    
}
