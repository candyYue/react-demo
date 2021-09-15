
import './assets/css/reset.less';
import './assets/css/App.less';
import './assets/css/common.less';
import  BasicRoute  from "./pages/Router";
import HotVideo from './pages/HotVideo'
import EchartMap from './pages/Map/EchartMap2'

import { createContext, useState ,useReducer} from 'react';
import {initialState,reducer } from './reduce'


export const context = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [maptype,setmaptype] = useState(1)

  const settype = (val)=>{
    setmaptype(val)
  }

  return (
    <context.Provider value={{maptype,state,dispatch}}>

        <div className="App">

        {/* <div className='map-btn'>
          <button onClick={()=>settype(1)}>今日数据</button>
          <button onClick={()=>settype(2)}>历史数据</button>
          <button onClick={()=>settype(3)}>风险区域</button>
        </div> */}
        {/* <EchartMap/> */}

        <BasicRoute/>
      </div>

    </context.Provider>
  );
}

export default App;
