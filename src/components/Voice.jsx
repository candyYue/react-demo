import React from 'react';
import { Slider,Button} from 'antd';
import { timeFormat } from "../utils/filters";
import { request } from "../service";

class Voice extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          playstate:1,
          voiceSider:"none",
          // text:[],
          playSlider:0,
          voiceSlider:30,
          currentTime:0,
          durationTime:0,
          textList:{}
        };
        this.audioRecord=null;
        this.time=null
    }
    componentWillMount(){
      request('/voice.json').then(res=>{
          this.setState({textList:res.data})
      })
    }
    componentDidMount(){
      const that = this
      var voiceTotext=document.getElementsByClassName("voiceTotext")[0];
      voiceTotext.innerHTML=""
      this.audioRecord=this.refs.audioRecord
      this.audioRecord.addEventListener("canplaythrough",function(e){
        that.setState({currentTime:timeFormat(that.audioRecord.currentTime)})
        that.setState({durationTime:timeFormat(that.audioRecord.duration)})
      })
      
      this.audioRecord.addEventListener('timeupdate', function(e){
        that.setState({playSlider:100*that.audioRecord.currentTime/that.audioRecord.duration})
        that.setState({currentTime:timeFormat(that.audioRecord.currentTime)})
        that.setState({durationTime:timeFormat(that.audioRecord.duration)})
        
        if(that.audioRecord.currentTime===that.audioRecord.duration){
          that.setState({playstate:1});
          clearInterval(that.time)
        }
      });
    }
    changeplayBtn(e){
      clearInterval(this.time)
      e.stopPropagation();
      if(this.state.playstate===1){
        this.setState({playstate:2});
        this.audioRecord.play();
        var that=this;
        this.time=setInterval(function(){
          that.state.textList.forEach(v=>{
              if(v.start===parseInt(that.audioRecord.currentTime)){
                var voiceTotext=document.getElementsByClassName("voiceTotext")[0];
                var voice=document.createElement("p")
                voiceTotext.appendChild(voice);
                voice.innerHTML=v.text;
                voice.classList.add("voice"+v.cid)
                return false;
              }
          })
        },1000)
      }else{
        this.setState({playstate:1});
        this.audioRecord.pause();
      }
    }
    changeVoice(e){
      e.stopPropagation();
      if(this.state.voiceSider==="none"){
        this.setState({voiceSider:"inherit"})
      }else{
        this.setState({voiceSider:"none"})
      }
    }
    // ignore(){
    //   clearInterval(this.time);
    //   this.state.textList.forEach(v=>{
    //         var voiceTotext=document.getElementsByClassName("voiceTotext")[0];
    //         var voice=document.createElement("p")
    //         voiceTotext.appendChild(voice);
    //         voice.innerHTML=v.text;
    //         voice.classList.add("voice"+v.cid)
    //         return false;
          
    //   })
    // }
    // 滑动播放滑块
    playChange(value) {
      this.setState({playSlider:value})
      this.refs.audioRecord.currentTime=(value/100)*this.refs.audioRecord.duration
    }
    // 滑动音量滑块
    voiceChange(value) {
      this.setState({voiceSlider:value})
      this.refs.audioRecord.volume =value/100
    }
    render() {
        return (
            <div>
                <div>
                  <h4>语音:  
                  <br/>
                  <br/><span>{this.state.currentTime}</span>/<span>{this.state.durationTime}</span></h4>
                  {/* <Button onClick={this.ignore.bind(this)}>跳过</Button> */}
                  <audio src={this.props.srcAddress} ref="audioRecord" controls></audio>
                  <div className='audioplay'>
                    <Button icon={this.state.playstate===1?"double-right":"pause"} size='small' className='playBtn' onClick={this.changeplayBtn.bind(this)}></Button>
                    <Slider defaultValue={0} value={this.state.playSlider} onChange={this.playChange.bind(this)} className='playSlider'/>
                    <div className='voiceBtn'>
                      <Button icon="sound" size='small' onClick={this.changeVoice.bind(this)}></Button>
                      <Slider vertical defaultValue={30} value={this.state.voiceSlider} className='voiceSlider' style={{"display":this.state.voiceSider}} onChange={this.voiceChange.bind(this)}/>
                    </div>
                  </div>
                  
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <h4>文本:</h4>
                  <div className="voiceTotext" rows={4}>
                    {/* {
                        this.state.text.map(function (item,index) {
                            return <div className="item" key={index}>{item}</div>
                        })
                    } */}
                  </div>
                </div>
            </div>
        );
    }
}


export default Voice;