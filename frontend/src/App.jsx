import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Main from './pages/Main'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import PrivateRoute from './PrivateRoute'
import CourseInfo from './pages/CourseInfo'

import AdminCourses from './pages/AdminCourses'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/home/:name' element={<PrivateRoute><HomePage/></PrivateRoute>} />
<Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>} />
<Route path='/courseinfo/:id' element={<PrivateRoute><CourseInfo/></PrivateRoute>}/>
<Route path='/admin/courses' element= {<PrivateRoute><AdminCourses/></PrivateRoute>}/>
        <Route path='/signup' element ={<SignUp/>}/>
        <Route path='/signin' element ={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App