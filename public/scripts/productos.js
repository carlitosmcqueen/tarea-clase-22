
const mostrarProductos =()=>{
    fetch("/api/productos")
    .then((response)=> response.json())
    .then((json)=>{
        const productos = Object.assign({}, json)
        const prodController= Handlebars.compile(viewProductos)
        const prodHtml =prodController({productos})
        document.getElementById('divProductos').innerHTML = prodHtml
        botonesAgregar()
    })
}
function mostrarProductosCategory(category){
    fetch(`/api/productos/categoria/${category}`)
    .then((response) => response.json)
    .then((json)=>{
        
        const productos = Object.assign({}, json)
        const prodController= Handlebars.compile(viewProductos)
        const prodHtml =prodController({productos})
        document.getElementById('divProductos').innerHTML = prodHtml
        botonesAgregar()
    })    
}
const boton = document.getElementById("botonCategory")

boton.addEventListener("click",()=>{
    console.log(boton.value)
    mostrarProductosCategory(boton.value)
})



//devuelve lista de carrito
const idCar = await fetch("/api/carrito")
    .then(response=>response.json())
    .then((json)=>{
        const id =json[0]._id
        return id
    })


const botonesAgregar=() =>{
    const tabla = document.getElementById('tabla')
    const botones = tabla.querySelectorAll("button")
    for(let i= 0; i<botones.length; i++){
        botones[i].addEventListener('click',(e)=>{
          e.preventDefault()
          const idProductos = e.target.value
          agregarProductoCarrito(idProductos)
        },false)
      }
}


const agregarProductoCarrito =(id)=> {
    fetch(`/api/carrito/${idCar}/productos/${id}`,{
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        console.log(`se agrego el productos ${id}`)
    })    
}


const viewProductos= `
<div class="container mt-3">
<h1>View Productos</h1>
<table  id="tabla" class="table table-primary" align="center">
    <thead>
        <tr class="table-dark">
            <th>Producto</th>
            <th>Precio</th>
            <th>Miniatura</th>
            <th>Acciones</th>
        </tr>
    </thead>
    {{#each productos}}
        <tr> 
            <td class="table-info">{{this.title}}</td>
            <td class="table-success"> {{this.precio}}</td>
            <td class="table-warning"><img style="height: 30px" class="img-fluid" src="{{this.thumbnail}}" alt="imagen"/></td>
            <td class="table-danger"><button  value="{{this._id}}" class="btn btn-danger comprar">Agregar al Carrito</button></td>
        </tr>
    {{/each}}
</table>
`

mostrarProductos()
mostrarProductosCategory("arroz")


