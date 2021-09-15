import './assets/css/reset.less';
import './assets/css/App.less';
import './assets/css/common.less';
// import FiveInRow from "./pages/FiveInRow";
// import ApiTest from "./pages/ApiTest";
import  BasicRoute  from "./pages/Router";

function App() {
  return (
    <div className="App">
      {/* <FiveInRow/> */}
      {/* <ApiTest/> */}
      <BasicRoute/>
    </div>
  );
}

export default App;
