import { Routes, Route } from 'react-router-dom';
import './asset/css/App.css';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Predict from './components/Predict'
import ProtectedRoute from './routes/Protected';
import UnProtectedRoute from './routes/Unprotected';
function App() {
  return (
    <div>
      <Routes>
        <Route element={<UnProtectedRoute />} >
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path = "/predict" element={<Predict/>}/>
        </Route>
        
        <Route element={<ProtectedRoute />} >
        
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        </Routes>
    </div>
  );
}

export default App;
