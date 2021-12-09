import './App.css';
import { useEffect } from 'react';
import { abi } from './abi';
import Web3 from 'web3';
import { Route, Routes } from 'react-router';
import Home from './pages/home';
import Header from './components/header';
import Stuff from './pages/stuff';
import Login from './pages/login';
import Admin from './pages/admin';
import Director from './pages/director';

const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(abi, '0xb7C283114b45552ca188ADD4C0E1Ff775bD59B24');

function App() {
  useEffect(() => {
    contract.methods.getRole('0x99Af96F2FA07A1a0546Da4F45Ef32dB61bC2f55D').call().then();
  }, []);
  return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home contract={contract} />} />
      <Route path="/login" element={<Login contract={contract} />} />
      <Route path="/stuff" element={<Stuff contract={contract} />} />
      <Route path="/admin" element={<Admin contract={contract} />} />
      <Route path="/director" element={<Director contract={contract} />} />
    </Routes>
  </>
  );
}

export default App;
