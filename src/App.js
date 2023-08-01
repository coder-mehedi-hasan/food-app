import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Signup from './Pages/Signup';
import MyCart from './Pages/MyCart';
import MyOrders from './Pages/MyOrders';
import { CartProvider } from './reducer/ContextReducer';
import ProductManage from './Pages/ProductManage';
import ProductDetails from './Pages/ProductDetails';
import ApiUrl from './Local/ApiUrl';
import Cookies from 'js-cookie';

function App() {
  const router = createBrowserRouter([
    {
      element: (<Main></Main>),
      children: [
        {
          path: '/',
          element: (<Home></Home>)
        },
        {
          path: '/login',
          element: (<Login></Login>)
        },
        {
          path: '/signup',
          element: (<Signup></Signup>)
        },
        {
          path: '/mycart',
          element: (<MyCart></MyCart>)
        },
        {
          path: '/myorder',
          element: (<MyOrders></MyOrders>)
        },
        {
          path: '/manage/product',
          element: (<ProductManage></ProductManage>)
        },
        {
          path: '/product/details/:id',
          element: (<ProductDetails />),
          loader: async ({ params }) => {
            const response = await fetch(`${ApiUrl}/product/details/${params.id}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                foodapp:Cookies.get('foodapp')
              },
              credentials: 'include'
            })
            return response.json()
          }
        },
        {
          path: '*',
          element: (<Error></Error>)
        },
      ]
    }
  ])
  return (
    <CartProvider>
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}

export default App;
