function eliminarImagen(id,nombreImagen){
    
    db.collection("sliderPublicidad").doc(id).delete().then(() => {
        
        var storageRef = firebase.storage().ref("imagenesPublicidad");
        var desertRef = storageRef.child(nombreImagen);
        desertRef.delete().then(function() {
            // File deleted successfully
            console.log("eliminado correctamente");
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
}