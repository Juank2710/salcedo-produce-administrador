function eliminar(id){
    db.collection("items").doc(id).delete().then(() => {
        
        
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    var tabla=document.getElementById('tabla')
    tabla.innerHTML='';
}