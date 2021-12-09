import '../App.css';
import React, { useState }  from 'react'; 
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { login } from '../redux/actions';

function Director({ contract }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [id, setId] = useState(0);
  const addressOwner = useSelector(state => state.reducer.address)
  const [newrole, setNewrole] = useState(0);
  return (<>
      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        <TextField onChange={res => setAddress(res.target.value)} id="standard-basic" label="Введите адрес кошелька" variant="standard" />
        <TextField onChange={res => setNewrole(res.target.value)} id="standard-basic" label="Введите роль" variant="standard" />
        <Button onClick={() => contract.methods.setRole(address, newrole).send({from: addressOwner, gas:3000000}).then(res => navigate('/'))}>
        Сменить роль
        </Button>
      </div>
      <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
      <TextField onChange={res => setId(res.target.value)} id="standard-basic" label="Введите номер заказа" variant="standard" />
      <Button onClick={() => contract.methods.removeOrder(id).send({from: addressOwner, gas:3000000}).then(res => navigate('/'))}>
      Удалить заказ
      </Button>
    </div>
    </>
  );
}

export default Director;
