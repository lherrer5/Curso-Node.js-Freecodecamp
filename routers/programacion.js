const express= require('express');
const routerProgramacion= express.Router();

//Las funciones middleware (q se ejecutan despues de recibir la solicitud y antes d enviar la respuesta),
//m sirve para procesar .body en formato json. OJo va antes de las rutas
//tienen acceso al obj de la solic, al objt de la respuesta y a next()(func q se llama pa ejecutar el prox middleware)
routerProgramacion.use(express.json());

//Importo cursos
const{programacion}=require('../datos/cursos').infoCursos

routerProgramacion.get('/', (req,res)=>{
    //.send envia la respuesta en formato .json x lo q no es necesario escribir (JSON.stringify(programacion))
    //y en vez de .send puedo usar .json q convierte el argumento a f}este formato antes d enviarlo
    res.send(JSON.stringify(programacion))
});

routerProgramacion.get('/:lenguaje', (req,res)=>{
    const lenguaje= req.params.lenguaje.toLocaleLowerCase();
    const resultados= programacion.filter(curso=>curso.lenguaje===lenguaje);
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    if(req.query.ordenar==='vistas'){
        res.send(JSON.stringify(resultados.sort((a,b)=>b.vistas-a.vistas)));
    }else{
        res.send(JSON.stringify(resultados));
    }
});

routerProgramacion.get('/:lenguaje/:nivel', (req,res)=>{
    const lenguaje= req.params.lenguaje.toLocaleLowerCase();
    const nivel= req.params.nivel.toLocaleLowerCase();
    const resultados= programacion.filter(curso=>curso.lenguaje===lenguaje && curso.nivel===nivel);
    if(resultados.length===0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} en nivel ${nivel}`);
    }
    res.send(JSON.stringify(resultados));
});

routerProgramacion.post('/', (req,res)=>{
    //deberia validar q si sea formato json
    //Extraigo el cuerpo de la req con req.body
    let cursoNuevo=req.body;
    //lo agrego al arreglo q estoy importando const{programacion}, en la realidad seria la base de datos
    programacion.push(cursoNuevo);
    //envio el nuevo arreglo al cliente
    res.send(JSON.stringify(programacion))
});

//PUT para actualizar una entidad (en una base de datos es un "item" q tiene conjunto de propiedades y valores)OJO hay q enviarlas todas, 
//hasta las q no se van a actualizar
routerProgramacion.put('/:id', (req,res)=>{
    //recibo el curso actualizado
    const cursoActualizado=req.body;
    //extraigo id del curso
    const id=req.params.id;
    //encuentro el indice de mi id con el metodo findIndex (en la func flecha el 1er id es el del curso y el 2do es el parametro URL que paso arriba desp d put)
    //NP uso === xq mi id es un numero pero el q m pasa el cliente es una cadena de caracteres 
    const indice=programacion.findIndex(curso=>curso.id==id);
    if(indice>=0){
        //cojo arreglo del archivo cursos con indice y le asigno el nuevo
        programacion[indice]=cursoActualizado;
    }else{
        res.status(404).send();
    }
    res.send(JSON.stringify(programacion))
}
)

//PACTH: para actualizar solo una pequeña parte de un registro existente
routerProgramacion.patch('/:id', (req,res)=>{
    //recibo la info q voy a actualizar
    const infoActualizada=req.body;
    //extraigo id del curso
    const id=req.params.id;
    //encuentro el indice 
    const indice=programacion.findIndex(curso=>curso.id==id);
    if(indice>=0){
        //obtengo el curso q voy a modificar
        const cursoAmodificar= programacion[indice];
        //uso metodo .assign q m permite adctualizar solo la parte q quiero poniendo el target y 
        //la clave valor nueva q guardo en info actualizada segun lo q pase el cliente
        Object.assign(cursoAmodificar, infoActualizada);
    }
    res.send(JSON.stringify(programacion))
}
)

//DELETE
routerProgramacion.delete('/:id', (req,res)=>{
    //extraigo id del curso a eliminar (no necesita body xq no le voy a "pasar"nada)
    const id=req.params.id;
    //encuentro el indice 
    const indice=programacion.findIndex(curso=>curso.id==id);
    if(indice>=0){
        //con .splice "corto" el indice e indico q sólo elimino 1 elemento (el cortado)
        programacion.splice(indice, 1);
    }
    res.send(JSON.stringify(programacion))
}
)

//Exporto router
module.exports= routerProgramacion;