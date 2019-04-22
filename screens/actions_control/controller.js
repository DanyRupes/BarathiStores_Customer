import { AsyncStorage } from 'react-native'

const cart_load_setter = async ({choice, key})=>{
    console.log(choice, key)
    switch(choice){
        case 'loaded':
            console.log("setting true")
            const loade = await AsyncStorage.setItem(key,'true')
                if(!loade) {
                    return 'fine'
                }
                else {
                    return "not"}
            break
        case 'reset':
            const reset = await AsyncStorage.removeItem(key)
            if(reset){
                return 'not'
            }
            else return 'fine'
    }
}
const cart_load_getter= async ({key})=>{
    switch(key){
        case 'bsc_cart_load':
            const item = await AsyncStorage.getItem(key)
            if(item){
                return item
            }
            else{
                return 'empty'
            }
            break

    }
}

export  {cart_load_getter,cart_load_setter}