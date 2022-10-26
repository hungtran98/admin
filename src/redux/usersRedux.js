import { createSlice} from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users = action.payload
        },
        getUsersFailure: (state) => {
            state.error = true
        },
        deleteUsersStart: (state) => {
            state.isFetching = true
        },
        //splice(index , 1)
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users.splice( 
                state.users.find( user => user._id === action.payload.id), 1 )
        },
        deleteUsersFailure: (state) => {
            state.error = true
        },
        addUsersStart: (state) => {
            state.isFetching = true
        },
        addUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users.push(action.payload)
        },
        addUsersFailure: (state) => {
            state.error = true
        },
        updateUsersStart: (state) => {
            state.isFetching = true
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users[state.users.findIndex(item => item._id === action.payload.id)] = action.payload.user
        },
        updateUsersFailure: (state) => {
            state.error = true
        },


    }

})


export const { 
    getUsersStart, getUsersSuccess, getUsersFailure, deleteUsersStart, deleteUsersSuccess,
    deleteUsersFailure, addUsersStart, addUsersSuccess, addUsersFailure, updateUsersStart,
    updateUsersSuccess, updateUsersFailure
} = usersSlice.actions
export default usersSlice.reducer