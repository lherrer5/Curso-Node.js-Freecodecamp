const express= require('express');
//Importo cursos
const{matematicas}=require('../datos/cursos').infoCursos
const routerMatematicas=express.Router();

//Las funciones middleware (q se ejecutan despues de recibir la solicitud y antes d enviar la respuesta),
//m sirve para procesar .body en formato json. OJo va antes de las rutas
//tienen acceso al obj de la solic, al objt de la respuesta y a next()(func q se llama pa ejecutar el prox middleware)
routerMatematicas.use(express.json());


routerMatematicas.get('/', (req,res)=>{
    res.send(JSON.stringify(matematicas))
});

routerMatematicas.get('/:tema', (req,res)=>{
    const tema= req.params.tema.toLocaleLowerCase();
    const resultados= matematicas.filter(curso=>curso.tema===tema);
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${tema}`);
    }
    res.send(JSON.stringify(resultados));
});

routerMatematicas.post('/', (req,res)=>{
    //deberia validar q si sea formato json
    //Extraigo el cuerpo de la req con req.body
    let cursoNuevo=req.body;
    //lo agrego al arreglo q estoy importando const{matematicas}, en la realidad seria la base de datos
    matematicas.push(cursoNuevo);
    //envio el nuevo arreglo al cliente
    res.send(JSON.stringify(matematicas));
});

//Exporto router
module.exports= routerMatematicas;