//recuperar id mayor de los items
var ultimoIdItem;



//llenar tabla de items
var tabla_items=document.getElementById('tabla_items');

db.collection("items").onSnapshot((querySnapshot) => {
    tabla_items.innerHTML='';
    querySnapshot.forEach((doc) => {

        //recuperando el id mayor de los items
        ultimoIdItem=Math.max(doc.id);

        tabla_items.innerHTML+=`
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombreItem}</td>
        <td>${doc.data().icono}</td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombreItem}','${doc.data().icono}')">Editar</button> </td>
        <th scope="col"><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></th>
      </tr>`

    });
    //validar que el item tenga un valor
    if(ultimoIdItem === undefined){
        ultimoIdItem=0;
    }
    //aumentar un valor para que no se repitan los Id
    ultimoIdItem=ultimoIdItem+1;
});
