function ordenarPdto(producto){
    return new Promise((resolve,reject)=>{
        console.log(`Ordenando ${producto}`);
        setTimeout(()=>{
            if(producto==="Camisa"){
                resolve("Camisa en proceso con numero de orden xxx")
            }else{
                reject("Camisa no disponible");
            }
        },2000);
    });
}

function procesarPedido(respuesta){
    return new Promise(resolve=>{
        //solo será exitosa
        console.log("Procesando respuesta");
        //en un escenario real, usamos esa respuesta para hacer otra accion x ejemplo el numero de pago para sacar artivulo del inventario
        console.log(`La respuesta fue: ${respuesta}`);
        setTimeout(()=>{
            resolve('Gracias por su compra')
        }, 4000)
});
}

//FORMA1
//Para garantizar que las funciones se ejecuten en el orden que mi proceso lo requiere, utilizo el encadenamiento de promesas pa q sucedan en orden
// ordenarPdto("Camisa")
// .then(respuesta=>{
//     console.log("Respuesta recibida");
//     //al llamar esta funcion en el return, estoy generando una nueva promesa x lo que haré otro .then
//     return procesarPedido(respuesta)
// })
// .then(respuestaProcesada=>{
//     //este es el valor retornado por el segundo resolve 'Gracias por su compra'
//     console.log(respuestaProcesada)
// })
// //este catch m devuelve mensaje del reject
// .catch(error=>{
//     console.log(error)
// })



//FORMA 2 ASYNC AWAIT

async function realizarPedido(producto) {
  try {
    const respuesta = await ordenarPdto(producto);
    console.log("respuesta Recibida");
    const respuestaProcesada = await procesarPedido(respuesta);
    console.log(respuestaProcesada);
  } catch (error) {
    console.log(error);
  }
}

realizarPedido("Camisa")