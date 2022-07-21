export const loged = (data)=>{
    return{
        type:"Login",
        data:data
    }
}

export const logout = ()=>{
    return{
        type:'Logout'
    }
}
