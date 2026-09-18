import { useState } from 'react'

import './App.css'
import { Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Navbar from './components/common/Navbar'
import Login from "./pages/Login"
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
//import verifyEmail from './pages/verifyEmail'
import VerifyEmail from "./pages/verifyEmail";
import MyProfile from "./components/Auth/MyProfile";
import Dashboard from "./pages/Dashboard";
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import PrivateRoute from './components/Auth/PrivateRoute'
import Error from './pages/Error'
import EnrolledCourse from './components/dashboard/EnrolledCourse'
import Cart from './components/dashboard/Cart/Cart'
import MyCourses from './components/dashboard/MyCourse/MyCourses'
import { ACCOUNT_TYPE } from './utils/constants'
import AddCourse from './components/dashboard/AddCourse/AddCourse'
import { useSelector } from 'react-redux'
import EditCourse from './components/dashboard/MyCourse/EditCourse'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/courseDetails/CourseDetails'
import ViewCourse from './pages/viewCourse/ViewCourse'
import VideoDetails from './pages/viewCourse/VideoDetails'



function App() {
   const { user } = useSelector((state) => state.profile)
  return (
   <div className='w-screen min-h-screen bg-richblack-700 flex flex-col font-inter'>
<Navbar/>
<Routes>

<Route path='/' element={<Home/>}/>

<Route path="/catalog/:catalogName" element={<Catalog />} />
<Route path="course/:courseId" element={<CourseDetails/>}/>
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login/>} />
<Route path='/forgot-password' element={<ForgotPassword/>}/>
<Route path='/update-password/:id' element={<UpdatePassword/>}/>
<Route path='/verify-email' element={<VerifyEmail/>}/>

{/* <Route path='/dashboard/cart' element={<Dashboard/>}/> */}


<Route  path="/about"  element={<About/>} />
<Route path='/contact' element={<ContactUs/>}/>

<Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      {/* <Route path="dashboard/settings" element={<Setting />} /> */}

    </Route>


{
  user?.accountType=== ACCOUNT_TYPE.STUDENT &&(
    <> 
<Route  path='dashboard/enrolled-courses' element={<EnrolledCourse/>}/>
<Route path='/dashboard/cart' element={<Cart/>}/>

    </>
  )
}


{
  user?.accountType===ACCOUNT_TYPE.INSTRUCTOR &&(
    <>
    <Route path='dashboard/add-course' element={<AddCourse/>}/>
        <Route path='dashboard/my-courses' element={<MyCourses/>}/>
        <Route path='dashboard/edit-course/:courseId' element={<EditCourse/>}/>

    
    </>
  )
}

<Route element={<PrivateRoute>
  <ViewCourse/>
</PrivateRoute>}>

{
  user?.accountType===ACCOUNT_TYPE.STUDENT &&(
    <>
    <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
    </>
  )
}


</Route>


<Route path="*" element={<Error/>} />

</Routes>

   </div>
  )
}

export default App
