import '../App.css';
import React, { useState }  from 'react'; 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { login } from '../redux/actions';

const sha256 = require('js-sha256');

function Login({ contract }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const role = useSelector(state => state.reducer.role);

  return (
      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <TextField onChange={res => setAddress(res.target.value)} id="standard-basic" label="Введиете адрес вашего кошелька" variant="standard" />
        <TextField onChange={res => setPassword(res.target.value)} id="standard-basic" label="Введите пароль" variant="standard" />
         <Button disabled={!password && !address} onClick={() => {
            contract.methods.login(address, sha256(password)).call().then(role => {
                if (role != 0 ) {
                dispatch(login(role, address));
                navigate('/');
                } else {
                    setError(true)
                }
            });
        }}>Войти</Button>
        {error && <span>Неправильный пароль</span>}
      </div>
  );
}

export default Login;
