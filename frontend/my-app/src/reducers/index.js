export const initialState = null

  const isLoged = (state=initialState,action)=>{
    switch(action.type){
        case "Login": return {
               ...state,
              user : action.data
        }
        case "Logout" : return{
          user : initialState
        }
        default : return {
          user: initialState
        }   
    }
}

export default isLoged
