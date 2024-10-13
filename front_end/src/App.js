import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Profile from './Components/Profile';
import PageNotFound from './Components/PageNotFound';
import Password from './Components/Password';
import Recovery from './Components/Recovery';
import Register from './Components/Register';
import Reset from './Components/Reset';
import Username from './Components/Username';

function App() {
  return (
    
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Username/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/password' element={<Password />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetpassword' element={<Reset/>} />
        <Route path='/recover' element={<Recovery/>} />
       
      </Routes>
     </Router>
    </div>
  );
}

export default App;
