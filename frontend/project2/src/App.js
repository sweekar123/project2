import Register from "./Components/Register";
import Login from "./Components/Login";
import Otp from "./Components/Otp";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{
          display: "flex",
          background: '#d2dbdd',
          padding: '5px 0 5px 5px',
          fontSize: '30px',
          fontFamily: 'cursive',
          marginLeft: '50px',
          marginRight: '20px',
          marginTop: '10px',
          textAlign: 'center'


        }}>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/otp" element={<Otp />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            {/* <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route exact path="/activate/:uid/:token" element={<Activate />} /> */}
          </Routes>
        </div>

      </BrowserRouter>

    </>
  );
}

export default App;
