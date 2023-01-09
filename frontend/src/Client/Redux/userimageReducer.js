import {createSlice} from '@reduxjs/toolkit';
console.log('image reducer called')
const INITIAL_STATE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const userimageSlice = createSlice({
    name:'userimage',
    initialState: INITIAL_STATE,
    reducers:{
        imageChange : (state,action)=>{
            console.log('imageChange function inside reducer hitting',action)
            return action.payload;
            
        }
    },
    extraReducers:{
        logout:()=>{

            return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' ;
        }
    }
})

export const {imageChange} = userimageSlice.actions;
export default userimageSlice.reducer;