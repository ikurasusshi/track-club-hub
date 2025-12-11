import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Main from './components/Main';
import NotFound from './components/NotFound';
import UserDetailPage from './components/users/UserDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/' element={<Main />}/>
        <Route path='/users/:id' element={<UserDetailPage />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
