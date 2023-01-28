const idCompra = await fetch("/api/compra").then(res => res.json()).then((json)=>{
    const id =json[0]._id
    return id
})
const idCar = await fetch("/api/carrito")
    .then(response=>response.json())
    .then((json)=>{
        const id =json[0]._id
        return id
})


const mostrarCarrito =()=>{
    fetch("/api/carrito")
    .then((response)=> response.json())
    .then((json)=>{
        const idCarrito = json[0]._id
        const carrito = Object.assign({}, json[0].productos)
        const prodController= Handlebars.compile(viewCarrito)
        const prodHtml =prodController({carrito})
        document.getElementById('divCarrito').innerHTML = prodHtml
        finalizarCompra(idCarrito)
        botonesQuitar(idCarrito)
        
    })

}

const finalizarCompra =(idCarrito)=>{
    const boton = document.getElementById("finalizarCompra")
    boton.addEventListener("click",(e)=>{
        e.preventDefault()
        fetch(`/api/compra/${idCompra}/carrito/${idCarrito}`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            console.log("se logro con exito la compra");
        })
    })
}

const botonesQuitar =(idCarrito)=>{
    const tabla= document.getElementById('tablaCarrito')
    const botones = tabla.querySelectorAll("button")

    for(let i= 0; i<botones.length; i++){
        botones[i].addEventListener('click',(e)=>{
          e.preventDefault()
          const idProductos = e.target.value
          quitarProducto(idCarrito,idProductos) 
        },false)
      }
}
const quitarProducto =(idCarrito,idProductos)=>{
    fetch(`api/carrito/${idCarrito}/productos/${idProductos}`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(`se quito el producto : ${idProductos}`)
    }) 


}

const viewCarrito= `
<div class="container mt-3">
<h1>View Carrito</h1>
<table  id="tablaCarrito" class="table table-primary" align="center">
    <thead>
        <tr class="table-dark">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
        </tr>
    </thead>
    {{#each carrito}}
        <tr> 
            <td class="table-info">{{this.title}}</td>
            <td class="table-success"> {{this.description}}</td>
            <td class="table-danger"><button  value="{{this._id}}" class="btn btn-danger comprar">Quitar el producto del Carrito</button></td>

        </tr>
    {{/each}}
</table>
  <div>
    <button  id="finalizarCompra" class="btn btn-info comprar">Finalizar Compra</button>
  </div>
`

mostrarCarrito()

