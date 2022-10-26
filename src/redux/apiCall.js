import { loginStart, loginSuccess, loginFailure, logOut} from "./userRedux";
import { getUsersStart, getUsersSuccess, getUsersFailure,
        deleteUsersStart, deleteUsersSuccess, deleteUsersFailure,
        addUsersStart, addUsersSuccess, addUsersFailure,
        updateUsersStart, updateUsersSuccess, updateUsersFailure
} from './usersRedux'
import { 
    getProductStart, getProductSuccess, getProductFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure
}  from './productRedux'
import { publicRequest, userRequest } from '../api'
import { async } from "@firebase/util";


//user
export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logout = async (dispatch) => {
   await dispatch(logOut())
}


//users
export const getUsers = async (dispatch) => {

    dispatch(getUsersStart())
    try {
        const res = await userRequest.get('/users')
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure())
    }
}

export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUsersStart())
    try {
        await userRequest.delete(`/users/${id}`)
        dispatch(deleteUsersSuccess(id))
    } catch (error) {
        dispatch(deleteUsersFailure())
    }
}

export const addUser = async (dispatch, user) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post('/users', user)
        dispatch(addProductSuccess(res.data))
    } catch (error) {
        dispatch(addProductFailure())
    }
}

export const updateUser = async (dispatch, user, id) => {
    dispatch(updateUsersStart())
    try {
        const res = await userRequest.put(`/users/${id}`, user)
        dispatch(updateUsersSuccess({
            id, user: res.data
        }))
    } catch (error) {
        dispatch(updateUsersFailure())
    }
}


//product
export const getProducts = async (dispatch, products) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get('/products')
        dispatch(getProductSuccess(res.data))
    } catch (error) {
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart)
    try {
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (error) {
        dispatch(deleteProductFailure())
    }   
}

export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart())
    try {
        const res = await userRequest.put(`products/${id}`, product)
        dispatch(updateProductSuccess({id, product: res.data}))
    } catch (error) {
        dispatch(updateProductFailure())
    }
}

export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post('/products', product )
        dispatch(addProductSuccess(res.data))
    } catch (error) {
        dispatch(addProductFailure())
    }
}