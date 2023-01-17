document.addEventListener("DOMContentLoaded", () => {
    showProducts();
})

//* Traer productos de la BD
const fetchData = async () => {
    try {
        const res = await fetch("/productos");
        const data = await res.json()
        return data;
    } catch (e) {
        console.log()
    }
}

const contendorProductos = document.getElementById("productos")

const showProducts = async (data) => {
    console.log("hola")
    const productos = await fetchData(data)
    productos.forEach(product=>{
        const div  = document.createElement("div")
        div.classList.add("card")
        div.innerHTML += `
        <img src="${product.thumbnail}">
        <h5 class="product-name">${product.title}</h5>
        `
        contendorProductos.appendChild(div)
        const boton = document.getElementById(`boton${product._id}`)
        boton.addEventListener("click", () =>{

        })
    })
}