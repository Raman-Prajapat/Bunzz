
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Owner from './Pages/Owner';
import Users from './Pages/Users';
import { Fragment } from 'react';

function App() {

  const navigate = useNavigate();


  return (
    <Fragment>
      {/* <button onClick={() => navigate('/owner')}>Owner</button>
      <button>User</button> */}
      <Routes>
        <Route path='/owner' element={<Owner />}></Route>
        <Route path='/user' element={<Users />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
