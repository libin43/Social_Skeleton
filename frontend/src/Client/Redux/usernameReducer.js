import {createSlice} from '@reduxjs/toolkit';
console.log('name reducer called')
const usernameSlice = createSlice({
    name:'username',
    initialState:'',
    reducers:{
        userChange:(state,action)=>{
            console.log('userchange function inside reducer hitting',action)
            return action.payload;
        }
    },
    extraReducers:{
        logout:()=>{
            return null;
        }
    }
})

export const {userChange} = usernameSlice.actions;
export default usernameSlice.reducer;