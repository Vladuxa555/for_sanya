import '../App.css';
import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';

function Header() {
  const dispatch = useDispatch();
  const role = useSelector(state => state.reducer.role);
  const rolename = useMemo(() => {
      if (role == 1) return 'Админ'
      else if (role == 2) return 'Директор'
      else if(role == 3) return 'Официант'
      else if(role == 4) return 'Повар'
      else return 'Посетитель'
  }, [role]);
  const navigate = useNavigate();
  return (
      <div style={{display:"flex", backgroundColor:'blueviolet', height:70, alignItems:'center', color:'white'}}>
          <Button onClick={() => navigate('/')} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Главная
          </Button>
          {role == 0 && <Button onClick={() => navigate('/login')} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Войти
          </Button>}
        {role > 0 && <Button onClick={() => navigate('/stuff')} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Для персонала
          </Button>}
          {role == 1 &&<Button onClick={() => navigate('/admin')} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Для Админа
          </Button>}
          {(role == 2 || role == 2 ) && <Button onClick={() => navigate('/director')} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Для Директора
          </Button>}
          {(role != 0) && <Button onClick={() => {dispatch(login(0, '')); navigate('/')}} style={{marginRight:20, marginLeft:30}} color="success" variant="contained">
              Выйти
          </Button>}
          <Typography>
              Ваша роль {rolename}
          </Typography>
        </div>
  );
}

export default Header;
