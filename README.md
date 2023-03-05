"# tarea-clase-22" 

- instalar Todas las dependencias 
npm i 

- Iniciar programa 
npm run start


- FUNCIONAMIENTO
1- Primero se debe registrar el usuario con sus parametros
{
    username,password,edad,telefono,imagen(url)
}
Esto creara al usuario un carrito propio

2- Iniciar session con los parametros 
{
    username,password
}
Para acceder a las caracteristicas : Pagina Principal, Mensajes, Productos, Carrito y las Compras

3- Usar las rutas api/carrito/producto/:id_producto
para agregar los productos al carrito correspondiente al usuario logeado

4- Usar la ruta api/compra 
Para emitir la compra y quede guardada en la base de datos  
------------------------------------------------------------------------

Se dejo rutas para que el administrador cambie productos,carrito,compras de forma Manual


-----------------------------------------------------------------------
Las dependicias en uso son :
"bcrypt": "^5.1.0",
"connect-mongo": "^4.6.0",
"cookie-parser": "^1.4.6",
"dotenv": "^16.0.3",
"express": "^4.18.2",
"express-handlebars": "^6.0.6",
"express-session": "^1.17.3",
"log4js": "^6.7.1",
"moment": "^2.29.4",
"mongoose": "^6.8.3",
"nodemailer": "^6.8.0",
"passport": "^0.6.0",
"passport-local": "^1.0.0",
"session-file-store": "^1.5.0",
"socket.io": "^4.5.3",
