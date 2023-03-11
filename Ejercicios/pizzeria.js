const statusPedido= ()=>{
    //si es menor es true el 80% de las veces y mayor es false, lo q indica si pedido cumplido o no
    return Math.random()<0.8;
}

const pedidoPizza= new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if (statusPedido()){
            resolve('Pizza en camino');
        }else{
            reject('Lo sentimos, vuelva a llamar');
        }
    }, 3000);
})


//FORMA 1
// const pedidoExitoso= (mensajeResolve)=>{
//     console.log(mensajeResolve)
// }

// const pedidoFallido= (mensajeReject)=>{
//     console.log(mensajeReject)
// }

// pedidoPizza.then(pedidoExitoso,pedidoFallido)

//FORMA 2
// pedidoPizza
// .then((mensajeResolve)=>{
//     console.log(mensajeResolve)
// })
// .then(null,(mensajeReject)=>{
//     console.log(mensajeReject)
// })

//FORMA 3
pedidoPizza
.then((mensajeResolve)=>{
    console.log(mensajeResolve)
})
.catch((mensajeReject)=>{
    console.log(mensajeReject)
})
