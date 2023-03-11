//Importo express
const express= require('express');

//Importo routers
const routerProgramacion=require('./routers/programacion')
const routerMatematicas=require('./routers/matematicas')

//Creo mi app con función express()
const app= express();

//Simulo una base de datos con el archivo cursos.js y lo importo con sintaxis de desestructuracion
const {infoCursos}= require('./datos/cursos');

//Routers: Me permiten optimizar codigo reusando parte del path
//Indico uso especifico indicando el camino especifico asociado a mi constante 
app.use('/api/cursos/programacion', routerProgramacion)
app.use('/api/cursos/matematicas', routerMatematicas)


app.get('/', (req,res)=>{
    res.send('Bienvenido a mi sitio')
});

app.get('/api/cursos', (req,res)=>{
    res.send(infoCursos)
    //pa enviarlo en formato json: res.send(JSON.stringify(infoCursos))
});






//para que mi servidor empiece a escuchar solicitudes. Le especifico el puerto en 1er argumento y 2do funcion flecha q indica q hacer al escuchar 
//En la realidad cuando publico mi app en servicio externo, se me asigna el puerto dinamicamente por lo que pa tomar el puerto de las variables de 
// ambiente, uso process.env.port
const PORT= process.env.port||3000;

//la función se corre cuando el servidor empieza a escuchar
app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}...`);
})
//para poder acceder en el navegador a http://localhost:3000/ debo escribir en terminal node app.js (nombre de archivo q contiene al servidor)
//o en command prompt nodemon app.js para q se actualice automatico con los cambios
//para detener el servidor, en consola ctrl+C
