function editar(id,nombreItem,icono){
  

var boton=document.getElementById('editarBtn');
   
document.getElementById('nombreItemEditar').value=nombreItem;
document.getElementById('iconoItemEditar').value=icono;
    
    
    boton.onclick=function(){

        var editarItem = db.collection("items").doc(id);
        
        var nombreItem=document.getElementById('nombreItemEditar').value;
        var icono=document.getElementById('iconoItemEditar').value;
        
        return editarItem.update({
            icono: icono,
            nombreItem: nombreItem,
        })
        .then(() => {
            document.getElementById('nombreItemEditar').value='';
            document.getElementById('iconoItemEditar').value='';
            
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }
    
}

