
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import UpdatePost from './components/UpdatePost';
import Profile from './components/Profile';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<RegisterComponent />} />
        <Route exact path="/login" element={<LoginComponent />} />
        <Route exact path="/home" element={<HomeComponent />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/post/:id" element={<UpdatePost />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
