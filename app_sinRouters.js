//Importo express
const express= require('express');

//Creo mi app con función express()
const app= express();

//Simulo una base de datos con el archivo cursos.js y lo importo con sintaxis de desestructuracion
const {infoCursos}= require('./cursos');

//Routers: Me permiten optimizar codigo reusando parte del path
const routerProgramacion= express.Router();
//Indico uso especifico indicando el camino especifico asociado a mi constante 
app.use('/api/cursos/programacion', routerProgramacion)

//Implemento rutas: Routing
//indico que hacer al recibirse y qué responder
app.get('/', (req,res)=>{
    res.send('Bienvenido a mi sitio')
});

app.get('/api/cursos', (req,res)=>{
    res.send(infoCursos)
    //pa enviarlo en formato json: res.send(JSON.stringify(infoCursos))
});

//FORMA1
// app.get('/api/cursos/programacion', (req,res)=>{
//     res.send(JSON.stringify(infoCursos.programacion))
// });

//FORMA CON ROUTER
routerProgramacion.get('/', (req,res)=>{
    res.send(JSON.stringify(infoCursos.programacion))
});


app.get('/api/cursos/matematicas', (req,res)=>{
    res.send(JSON.stringify(infoCursos.matematicas))
});

//FORMA1
app.get('/api/cursos/programacion/:lenguaje', (req,res)=>{
    //Pa extraer mi parametro, cojo el objeto de la solicitud (req)y accedo a la propiedad params y luego el nombre que asigne a ese parametro en mi objeto
    const lenguaje= req.params.lenguaje.toLocaleLowerCase();
    //filtro con metodo filter mi lista de cursos segun el parametro q escogi (lenguaje) q === a mi const arriba (lenguaje)
    const resultados= infoCursos.programacion.filter(curso=>curso.lenguaje===lenguaje);
    //si encuentro resultados, envio objeto filtrado al cliente, sino la longitud es 0 y respondo con status 404 no encontrado
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    //Pa trabajar con parametros query (/?clave=valor) y obtener contenido dinamico, ejemplo, ordenar cursos por # de vistas con metodo .sort
    //http://localhost:3000/api/cursos/programacion/python?ordenar=vistas
    if(req.query.ordenar==='vistas'){
        res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas-a.vistas)));
        //para no poner else, puedo poner return dentro de corchetes de if
    }else{
        res.send(JSON.stringify(resultados));
    }
});

//FORMA CON ROUTER
//routerProgramacion.get('/:lenguaje', (req,res)=>{........


app.get('/api/cursos/programacion/:lenguaje/:nivel', (req,res)=>{
    const lenguaje= req.params.lenguaje.toLocaleLowerCase();
    const nivel= req.params.nivel.toLocaleLowerCase();
    const resultados= infoCursos.programacion.filter(curso=>curso.lenguaje===lenguaje && curso.nivel===nivel);
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} en nivel ${nivel}`);
    }
    res.send(JSON.stringify(resultados));
});

app.get('/api/cursos/matematicas/:tema', (req,res)=>{
    const tema= req.params.tema.toLocaleLowerCase();
    const resultados= infoCursos.matematicas.filter(curso=>curso.tema===tema);
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
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
