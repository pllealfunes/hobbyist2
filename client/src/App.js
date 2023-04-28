import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

// Library
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import RootLayout from './layouts/RootLayout'

// Pages
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import CreatePost from './pages/CreatePost'
import EditComment from './pages/EditComment'
import UserProfile from './pages/UserProfile'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import EditProfile from './pages/EditProfile';
import PrivateRoutes from './utils/PrivateRoutes'
import Category from './pages/Category';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >

      <Route index element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/category/:category" element={<Category />} />

      <Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/createNewPost" element={<CreatePost />} />
          <Route path="/post/editPost/:id" element={<EditPost />} />
          <Route path="/post/comment/editComment/:id" element={<EditComment />} />
          <Route path="/editProfile/:id" element={<EditProfile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
