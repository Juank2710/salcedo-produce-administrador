function eliminar(id,nombreImagen){
    db.collection("items").doc(`${valorSelectItem}`).collection("categorias").doc(`${valorSelectCategoria}`).collection("listaNegocios").doc(`${valorSelectNegocio}`).collection("catalogo").doc(id).delete().then(() => {
        
        var storageRef = firebase.storage().ref("imagesCatalogo");
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
}