import React,{useState, useEffect} from 'react'
import axios from 'axios';

function Group() {

  const [hello, setHello] = useState('');

  useEffect(() => {
    const token =localStorage.getItem('token')
    const headers = {
      Authorization: token
    }
    axios.get('admin/test',{headers})
    .then((res)=>setHello(res.data))
  }, []);

  return (
    <div>
      <h1>{hello}</h1>
    </div>
  )
}

export default Group
