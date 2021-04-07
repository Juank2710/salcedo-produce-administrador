function editar(id,nombreItem,icono){
    document.getElementById('Agregar').style.display="none";
    document.getElementById('editarBtn').style.display="block";

var boton=document.getElementById('editarBtn');
   
    var nombreItem=document.getElementById('nombreItem').value=nombreItem;
    var icono=document.getElementById('iconoItem').value=icono;
    
    
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
