import React, {AsyncStorage}  from 'react-native';
//import console = require('console');

const cart = {
    itemTotal() {
      
        if (AsyncStorage.getItem('bs_cart')) {
          return JSON.parse(AsyncStorage.getItem('bs_cart')).length
        }
      
      return 0
    },
    setType({item, to, fromVal}){
      console.log(item, to)
      switch(to){
        case 'p':
            AsyncStorage.getItem('bs_process').then((bs_process)=>{
              console.log("bs_process",bs_process)
              AsyncStorage.removeItem('bs_process').then(()=>{

                this.removeFrom({value:fromVal, item})

                let finalProcess = []
                if(bs_process){
                  let Res = JSON.parse(bs_process)
                  finalProcess.push(...Res,item)
                }
                else {
                  finalProcess.push(item)
                }
                console.log('finalProcess',finalProcess)
                AsyncStorage.setItem('bs_process', JSON.stringify(finalProcess))
              })
            })  
            break; 
        case 'd':
            AsyncStorage.getItem('bs_delivered').then((bs_delivered)=>{
              console.log("bs_delivered",bs_delivered)
              AsyncStorage.removeItem('bs_delivered').then(()=>{

                this.removeFrom({value:fromVal, item})

                let finalDelivered = []
                if(bs_delivered){
                  let Res = JSON.parse(bs_delivered)
                  finalDelivered.push(...Res,item)
                }
                else {
                  finalDelivered.push(item)
                }
                console.log('finalDelivered',finalDelivered)
                AsyncStorage.setItem('bs_delivered', JSON.stringify(finalDelivered))
              })
            }) 
            break; 
        case 'o':
            AsyncStorage.getItem('bs_ordered').then((bs_ordered)=>{
              console.log("bs_ordered",bs_ordered)
              AsyncStorage.removeItem('bs_ordered').then(()=>{

                this.removeFrom({value:fromVal, item})

                let finalOrdered = []
                if(bs_ordered){
                  let Res = JSON.parse(bs_ordered)
                  finalOrdered.push(...Res,item)
                }
                else {
                  finalOrdered.push(item)
                }
                console.log('finalOrdered',finalOrdered)
                AsyncStorage.setItem('bs_ordered', JSON.stringify(finalOrdered))
              })
            })
            break; 

          
    }
    },
      removeFrom({value, item}){
        console.log("remove from", value)
          switch(value){
            case 'o':
            console.log('changing from ordered')
                  AsyncStorage.getItem('bs_ordered').then((gat)=>{ //from 
                    AsyncStorage.removeItem('bs_ordered').then(()=>{
                      console.log("bs_ordered",gat)
                    let orderFinal = []
                    if(gat){
                        let dish = JSON.parse(gat)
                        console.log("dish", dish)
                        console.log("item.transID", item.transID)
                        let idsc = dish.filter((data, i)=>data.transID!=item.transID) //finding the correct Order
                        orderFinal.push(...idsc)
                        console.log("idsc",idsc)
                        console.log("orderFinal1",orderFinal)
                        AsyncStorage.setItem('bs_ordered', JSON.stringify(orderFinal))
                    }
                    else{
                      orderFinal.push(item)
                      console.log("orderFinal",orderFinal)
                      AsyncStorage.setItem('bs_ordered', JSON.stringify(orderFinal))
                    }
                    
                    })
                })
                break;
            case 'd': //remove from delivered
            console.log('removing from delivered')
                  AsyncStorage.getItem('bs_delivered').then((gat)=>{ //from 
                    AsyncStorage.removeItem('bs_delivered').then(()=>{
                      console.log("bs_delivered",gat)
                    let deliverFinal = []
                    if(gat){
                        let dish = JSON.parse(gat)
                        console.log("dish", dish)
                        console.log("item.transID", item.transID)
                        let idsc = dish.filter((data, i)=>data.transID!=item.transID) //finding the correct Order
                        deliverFinal.push(...idsc)
                        console.log("idsc",idsc)
                        console.log("orderFinal1",deliverFinal)
                        AsyncStorage.setItem('bs_delivered', JSON.stringify(deliverFinal))
                    }
                    else{
                      deliverFinal.push(item)
                      console.log("deliverFinal",deliverFinal)
                      AsyncStorage.setItem('bs_delivered', JSON.stringify(deliverFinal))
                    }
                    
                    })
                })
                break;
            case 'p': //remove from delivered
            console.log('removing from delivered')
                  AsyncStorage.getItem('bs_process').then((gat)=>{ //from 
                    AsyncStorage.removeItem('bs_process').then(()=>{
                      console.log("bs_process",gat)
                    let processFinal = []
                    if(gat){
                        let dish = JSON.parse(gat)
                        console.log("dish", dish)
                        console.log("item.transID", item.transID)
                        let idsc = dish.filter((data, i)=>data.transID!=item.transID) //finding the correct Order
                        processFinal.push(...idsc)
                        console.log("idsc",idsc)
                        console.log("processFinal",processFinal)
                        AsyncStorage.setItem('bs_process', JSON.stringify(processFinal))
                    }
                    else{
                      processFinal.push(item)
                      console.log("processFinal",processFinal)
                      AsyncStorage.setItem('bs_process', JSON.stringify(processFinal))
                    }
                    
                    })
                })
                break;
          }
      },

    order (item) {
      let cart = [],items=[];
      
      try{
        console.log("item", item)
        AsyncStorage.getItem('bs_ordered')
        .then((resa)=>{
          let Res = JSON.parse(resa)
          let orderArray = []
          console.log("Res ", Res)
              AsyncStorage.removeItem('bs_ordered')
              .then(()=>{
                  AsyncStorage.removeItem('bs_cart').then(()=>{
                    try{
                      orderArray.push(Res,item)
                    }
                    catch(e){
                      orderArray.push(item)
                    }
                    
                    console.log("orderArray", orderArray)
                    AsyncStorage.setItem('bs_ordered',JSON.stringify(orderArray))
                    return 1
                  })
              })
             
        })

      }catch(e){console.log(e); return null}
      
    },

    getOrdered(){
      AsyncStorage.getItem('bs_ordered')
      .then((res)=>{
        console.log("result res", res)
          return JSON.parse(res)
      })
    },

   addItem ({_id,sellingprice,productname}) {
     console.log(_id,sellingprice,productname,)
      
     let cart = []
     AsyncStorage.getItem('bsc_cart').then((resa)=>{
       if(resa){ //not empty
        let Res = JSON.parse(resa)
          AsyncStorage.setItem('bsc_cart',JSON.stringify([...Res,{_id,sellingprice,productname}]))
       }
       else { //@first
          AsyncStorage.setItem('bsc_cart',JSON.stringify([{_id,sellingprice,productname}]))
       }
     })
     

      
    },
    updateCart(itemIndex, quantity) {
      let cart = []
      
        if (AsyncStorage.getItem('bs_cart')) {
          cart = JSON.parse(AsyncStorage.getItem('bs_cart'))
        }
        cart[itemIndex].quantity = quantity
        AsyncStorage.setItem('bs_cart', JSON.stringify(cart))
      
    },
    // getCart() {
    //   AsyncStorage.getItem('bsc_cart').then((out)=>{
    //     if(!out)
    //      return []
    //     else
    //      return JSON.parse(out)
    // })
    // },
    removeItem(id) {
      let cart = []
      
      AsyncStorage.getItem('bs_cart').then((resa)=>{
        let Res = JSON.parse(resa)
        AsyncStorage.removeItem('bs_cart').then(()=>{
          let Res = JSON.parse(resa)
          console.log("bs_cart ", Res)
          // map and get ID and Check its quantity....
          let finalArr = []
          var notChange = true
          var continueChange = true
              Res.forEach((dim, index) => {
                console.log(index)
                if(dim._id==id) {
                    if(dim.quantity!=1){
                      finalArr.push({...dim,quantity:dim.quantity-1})
                    }
                }
                else {
                  finalArr.push(dim)
                }
              })
              AsyncStorage.setItem('bs_cart',JSON.stringify(finalArr)) 
                console.log("finalArr ", finalArr) //true is 1
                  // if(finalArr.length>0){
                  //   console.log("increasin Quantity ",[...Res,{...pro,quantity:alreadyThere[0].quantity+1}])
                  //     let newCart = [...Res,{...pro,quantity:alreadyThere[0].quantity+1}]
                  //             AsyncStorage.setItem('bs_cart',JSON.stringify(newCart)) // after first
                  // }
                  // else {
                  //   let newCart = [...Res,pro]
                  //             AsyncStorage.setItem('bs_cart',JSON.stringify(newCart)) // after first
                  // }

        })
      })
    },
    emptyCart() {
      
        AsyncStorage.removeItem('bs_cart')
        
      
    },
    checkHistory(id) {
      console.log("checkHistory ID ", id)
      AsyncStorage.getItem('bs_cart').then((resa)=>{
        if(resa) {
              let Res = JSON.parse(resa)
              console.log(Res)
              const status =  Res.filter((val)=>{
                if(val._id==id){
                  return val
                }
              })
              console.log("status", status)
              return status
          }else{ 
            return 0
          }
      })
    }
  }
  
  export default cart;