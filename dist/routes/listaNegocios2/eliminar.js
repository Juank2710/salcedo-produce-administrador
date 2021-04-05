function eliminar(id,nombreImagen){
    db.collection("items").doc(`${valorSelect}`).collection("categorias").doc(id).delete().then(() => {
        
        var storageRef = firebase.storage().ref("imagesCategorias");
        var desertRef = storageRef.child(nombreImagen);
        desertRef.delete().then(function() {
            // File deleted successfully
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    var tabla=document.getElementById('tabla_categorias');
    
}