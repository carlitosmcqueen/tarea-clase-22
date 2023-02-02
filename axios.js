import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api/productos",proxy:false,withCredentials:true })

try {
    const getall = await api.get('/')
    console.log(getall.data)
} catch (e) {
    console.log(e)
}
try {
    const getid = await api.get('/63bb2c6c3a0dace2b76929bd')
    console.log(getid.data)
} catch (e) {
    console.log(e)
}

try {
    const post = await api.post("/", {
      title: "Mountains Duo",
      price:150,
      thumbnail: "hola",
      description: "soy un producto"
    });
    console.log(post.data);
  } catch (error) {
    console.log(error);
}