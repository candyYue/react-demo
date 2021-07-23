import React from 'react';
import '../../assets/css/fiveinrow.scss'
class Square extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  get squareClassName() {
    const name = this.props.value?(this.props.value==='X'?'square-item-piece black-item':'square-item-piece white-item'):'square-item-piece'
    return name
  }
  render(){
    return(
      <div className='square-item' onClick={this.props.onClick}>
        <span className='line-horizontal'></span>
        <span className='line-vertical'></span>
        <span className={this.squareClassName}>{this.props.value}</span>
      </div>
    )
  }
}
export default Square;