
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DefaultPage from "./pages/defaultPage/DefaultPage";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
// } from "react-router-dom";
import {
  Outlet,
  Navigate,
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import { useSelector } from "react-redux";


function App() {

  const admin = useSelector((state) => state.user.currentUser ? state.user.currentUser.isAdmin : null);  

  // let router = createBrowserRouter([{
  //   path:'/login',
  //   element: <Login />
  // }])
  // if(admin === true) {
  //   router = createBrowserRouter([
  //     {
  //       path: "/",
  //       element: ( admin === true ) ? <DefaultPage><Home /></DefaultPage> : <Navigate to='/login' />
  //     },
  //     {
  //       path: "/users",
  //       element: <DefaultPage><UserList /></DefaultPage>
  //     },
  //     {
  //       path: "/user/:userId",
  //       element: <DefaultPage><User /></DefaultPage>
  //     },
  //     {
  //       path: "/newUser",
  //       element: <DefaultPage><NewUser /></DefaultPage>
  //     },
  //     {
  //       path: "/products",
  //       element: <DefaultPage><ProductList /></DefaultPage>
  //     },
  //     {
  //       path: "/product/:productId",
  //       element: <DefaultPage><Product /></DefaultPage>
  //     },
  //     {
  //       path: '/newproduct',
  //       element: <DefaultPage><NewProduct /></DefaultPage>
  //     }
  //   ])
   
  // }
  return(
        //<RouterProvider router={router}/>
        <div>
          <Router>
            <Routes>
                  <Route path="/login" element={ (admin === false || admin === null) ? <Login />: <Navigate to='/'/>}/>
                  <Route element={admin ? <Outlet /> : <Navigate to="/login"/>}>
                    <Route path="/" element={<DefaultPage><Home /></DefaultPage>}/>
                    <Route path="/users" element={<DefaultPage><UserList /></DefaultPage>}/>
                    <Route path="/user/:userId" element={<DefaultPage><User /></DefaultPage>}/>
                    <Route path="/newUser" element={<DefaultPage><NewUser /></DefaultPage>}/>
                    <Route path="/products" element={<DefaultPage><ProductList /></DefaultPage>}/>
                    <Route path="/product/:productId" element={<DefaultPage><Product /></DefaultPage>}/>
                    <Route path="/newProduct" element={<DefaultPage><NewProduct /></DefaultPage>}/>
                  </Route>          
            </Routes>
          </Router>
        </div>
  )
}

export default App;
