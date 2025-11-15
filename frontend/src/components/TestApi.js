import React, {useEffect, useState} from 'react';
import api from '../../api/api';

export default function TestApi(){
  const [data, setData] = useState(null);
  useEffect(()=>{
    api.get('/doctors')
      .then(r=>setData(r.data))
      .catch(e=>setData({ error: e.message }));
  },[]);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}