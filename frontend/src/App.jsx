import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Main from './pages/Main'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CourseInfo from './pages/CourseInfo'
import AdminCourses from './pages/AdminCourses'
import AllUsers from './pages/AllUsers'
import MainLayout from './pages/MainLayout'
import UpdateCourses from './pages/UpdateCourses'
import PrivateRoute from './PrivateRoute'   // ✅ import here

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>

        <Route path='/home/:name' element={
          <PrivateRoute allowedRoles={["user"]}>
            <HomePage/>
          </PrivateRoute>
        }/>

        <Route path='/courseinfo/:id' element={
          <PrivateRoute allowedRoles={["user"]}>
            <CourseInfo/>
          </PrivateRoute>
        }/>

        
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={["admin"]}>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminPage />} />   
          <Route path="courses" element={<AdminCourses />} />  
          <Route path="updateCourse/:id" element={<UpdateCourses/>}/>
          <Route path="users" element={<AllUsers />} />      
        </Route>

       
        <Route path='/signup' element ={<SignUp/>}/>
        <Route path='/signin' element ={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
