import '../App.css';
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function Stuff( {contract} ) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [id, setId] = useState(0);
  const addressOwner = useSelector(state => state.reducer.address)
  const role = useSelector(state => state.reducer.role)
  return (
      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <TextField onChange={res => setId(res.target.value)} id="standard-basic" label="Введите номер заказа" variant="standard" />
      <TextField onChange={res => setStatus(res.target.value)} id="standard-basic" label="Введите статус заказа" variant="standard" />
      <Button onClick={() => contract.methods.setOrderStatus(id, status).send({from: addressOwner, gas:3000000}).then(res => navigate('/'))}>
        Изменить статус заказа
      </Button>
    </div>
  );
}

export default Stuff;
