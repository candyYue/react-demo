<<<<<<< Updated upstream
import './assets/css/reset.less';
import './assets/css/App.less';
import './assets/css/common.less';
// import FiveInRow from "./pages/FiveInRow";
// import ApiTest from "./pages/ApiTest";
import  BasicRoute  from "./pages/Router";
=======
import './assets/css/App.css';
import './assets/css/reset.css';
// import FiveInRow from "./pages/FiveInRow";
import HotVideo from './pages/HotVideo'
import EchartMap from './pages/Map/EchartMap2'
import BDMap from './pages/Map/BDMap'
import { createContext, useState ,useReducer} from 'react';
import {initialState,reducer } from './reduce'


export const context = createContext()
>>>>>>> Stashed changes

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [maptype,setmaptype] = useState(1)

  const settype = (val)=>{
    setmaptype(val)
  }

  return (
<<<<<<< Updated upstream
    <div className="App">
      {/* <FiveInRow/> */}
      {/* <ApiTest/> */}
      <BasicRoute/>
    </div>
=======
    <context.Provider value={{maptype,state,dispatch}}>

        <div className="App">
        {/* <FiveInRow/> */}
        {/* <HotVideo /> */}

        <div className='map-btn'>
          <button onClick={()=>settype(1)}>今日数据</button>
          <button onClick={()=>settype(2)}>历史数据</button>
          <button onClick={()=>settype(3)}>风险区域</button>
        </div>
        <EchartMap/>
        {/* <BDMap/> */}
      </div>

    </context.Provider>
    
>>>>>>> Stashed changes
  );
}

export default App;
