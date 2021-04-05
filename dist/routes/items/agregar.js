//agregar items


function agregarItem(){
    var nombreItem=document.getElementById('nombreItem').value;
    var icono=document.getElementById('iconoItem').value;

    db.collection("items").doc(`${ultimoIdItem}`).set({
        icono: icono,
        nombreItem: nombreItem,
      })
      .then(() => {
          document.getElementById('nombreItem').value='';
          document.getElementById('iconoItem').value='';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
}