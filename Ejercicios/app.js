// const saludo= require ("./saludo");

// console.log(saludo.saludar("Lina"));


//Creando mi servidor
const http= require('http');
const servidor= http.createServer((request,response)=>{
    response.end("Hola cliente!")
    //esta función se ejecuta c/vez q recibo request, en este caso cada q accedo a localhost:3000
});
//para que mi servidor empiece a escuchar solicitudes. Le especifico el puerto en 1er argumento y 2do funcin flecha q indica q hacer al escuchar 
const PORT= 3000;
servidor.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`);
})
//para poder acceder en el navegador a http://localhost:3000/ debo escribir en terminal node app.js (nombre de archivo q contiene al servidor)
//para detener el servidor, en consola ctrl+C