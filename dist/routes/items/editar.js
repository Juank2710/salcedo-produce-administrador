function editar(id,nombreItem,icono){
    var nombreItem=document.getElementById('nombreItem').value=nombreItem;
    var icono=document.getElementById('iconoItem').value=icono;
    var boton=document.getElementById('Agregar');
    boton.innerHTML='Editar';
    boton.onclick=function(){

        var editarItem = db.collection("items").doc(id);
        
        var nombreItem=document.getElementById('nombreItem').value;
        var icono=document.getElementById('iconoItem').value;
        
        return editarItem.update({
            icono: icono,
            nombreItem: nombreItem,
        })
        .then(() => {
            boton.innerHTML='Agregar';
            document.getElementById('nombreItem').value='';
            document.getElementById('iconoItem').value='';
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}
