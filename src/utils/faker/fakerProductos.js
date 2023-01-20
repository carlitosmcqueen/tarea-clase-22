import {faker} from '@faker-js/faker'
faker.locale = "es_MX"

const randomProductos = () => {
    const productosFake = [];
    for (let i = 0; i < 5; i++) {
        const producto = {
            
            title: faker.commerce.product(),
            price: faker.commerce.price(0, 500, 0, '$'),
            thumbnail: faker.image.image(),
        }
        productosFake.push(producto);
    }
    return productosFake;
}

export default randomProductos