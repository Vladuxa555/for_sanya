import '../App.css';
import React, { useState }  from 'react'; 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { login } from '../redux/actions';

const sha256 = require('js-sha256');

function Admin({ contract }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const addressOwner = useSelector(state => state.reducer.address)
  const [password, setPassword] = useState('');
  const [newrole, setNewrole] = useState(0);
  return (
      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <TextField onChange={res => setAddress(res.target.value)} id="standard-basic" label="Введите адрес кошелька" variant="standard" />
        <TextField onChange={res => setPassword(res.target.value)} id="standard-basic" label="Введите пароль" variant="standard" />
        <TextField onChange={res => setNewrole(res.target.value)} id="standard-basic" label="Введите роль" variant="standard" />
        <Button onClick={() => contract.methods.setPassword(address, sha256(password)).send({from: addressOwner}).then(res => {
            contract.methods.setRole(address, newrole).send({from: '0x8C8dF6DdFeF0bf54F242100324F46041642dE5A0'}).then(navigate('/'))})}>
            Создать пользователя
            </Button>
      </div>
  );
}

export default Admin;
