import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import '../App.css';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../redux/actions';

function Home({contract}) {
  const [address, setAddress] = useState(0);
  const dispatch = useDispatch();
  const [table, setTable] = useState(0);
  const [salats, setSalats] = useState(0);
  const [borsch, setBorsch] = useState(0);
  const [pelmeni, setPelmeni] = useState(0);
  const orders = useSelector(state => state.reducer.orders)
  const amount = salats*70 + borsch*120 + pelmeni*200;
  let withDiscount = amount;
  const getOrderers = () => {
    contract.methods.getOrders().call().then(res => dispatch(getOrders(res)));
  }

  useEffect(() => {
    getOrderers();
  }, []);
  if (amount >= 100 && amount <200) withDiscount = amount - amount * 0.05;
  else if (amount >= 200 && amount < 500) withDiscount = amount - amount * 0.1;
  else if (amount >= 500) withDiscount = amount - amount * 0.15;
    const makeOrder = () => { 
        contract.methods.makeOrder(address, (Math.floor(Math.random()*Math.pow(10,10))), `${salats}X Салат, ${borsch}X Борщ, ${pelmeni}X Пельмени`,
        table, 'Не готов' ).send({from:address, value:withDiscount*Math.pow(10,9), gas:3000000}).then(res => getOrderers()).catch(err => console.log(err))
      }
  return (
  <div style={{width:'100%', height:'100%', display:'flex'}}>
    <div style={{width:'100%', marginLeft:100}}>
      <div style={{display:'flex', alignItems:'center', flexDirection:'column',width:'50%'}}>
      <TextField style={{width:'90%'}} onChange={res => setAddress(res.target.value)} id="standard-basic" label="Введите адрес вашего счета" variant="standard" />
      <TextField style={{width:'90%'}} onChange={res => setTable(res.target.value)} id="standard-basic" label="Введите номер столика" variant="standard" />
      <Button disabled={!address || !table || !(salats || borsch || pelmeni)} onClick={() => makeOrder()}>Сделать заказ</Button>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', flexDirection:'column',width:'50%', marginTop:250,}}>
        <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-around', width: '100%'}}><Typography>Салат </Typography>
        <TextField onChange={res => setSalats(res.target.value)} id="standard-basic" label="Количество" variant="standard" /><Typography>Цена 70 gwei</Typography>
        </div>
        <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-around', width: '100%'}}><Typography>Борщ </Typography>
        <TextField onChange={res => setBorsch(res.target.value)} id="standard-basic" label="Количество" variant="standard" /><Typography>Цена 120 gwei</Typography>
        </div>
        <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-around', width: '100%'}}><Typography>Пельмени </Typography>
        <TextField onChange={res => setPelmeni(res.target.value)} id="standard-basic" label="Количество" variant="standard" /><Typography>Цена 200 gwei</Typography>
        </div>
        <Typography style={{marginTop:40}}>Общая сумма с учетом скидки: {withDiscount} gwei</Typography>
      </div>
      </div>
      <div style={{width:'45%', display:'flex', flexDirection:'column', marginRight:300}}>
        <Typography style={{fontSize:30}}>Заказы</Typography>
        <div style={{overflowY:'scroll', width:'100%', height:400, display:'flex', flexDirection:'column',alignItems:'flex-start'}}>
          {orders?.map(item => {
            return (
              <div style={{border: '1px solid black', width: '95%', display:'flex', flexDirection:'column', height:'30%', justifyContent:'space-evenly',marginTop:10}}>
              <p>
                Номер заказа: {item.id}
              </p>
              <p>
                Блюда: {item.dishes}
              </p>
              <p>
                Цена: {item.price}
              </p>
              <p>
                Покупатель: {item.owner}
              </p>
              <p>
                Статус заказа: {item.status}
              </p>
              <p>
                Столик: {item.table}
              </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
