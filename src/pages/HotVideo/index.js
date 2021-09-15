import React, { useState, useEffect } from 'react';
import {getHotVideo,getRisk} from '../../request/action'

function HotVideo(){
    const [count,setCount] = useState(0)
    const addAction = ()=>{
        setCount(count+1)
    }
    const getlist = ()=>{
      getRisk().then(res=>{
          console.log(res)
        })
    }
    useEffect(() => {
      // getlist()
      // getHotVideo({
      //   key:'259f32a384e02f36cf4e83d0745993f1',
      //   type:'hot_video'
      // }).then(res=>{
      //   console.log(res)
      // })

    }, []);
    return (
        <div >
          <button onClick={addAction}>点击了{count}次</button>
        
        </div>
    )
}
export default HotVideo