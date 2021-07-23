import React from 'react';
import  Square  from "./Square.js";
class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(Array(9).fill(null)),
      isBlack:true,
      isWin:false
    };
  }
  handleClick(x,y){
    if(this.state.squares[x][y]){ // 有棋子的棋格不能再落子
      return false
    }
    const item = this.state.isBlack?'X':'O'
    let newsquares = [...this.state.squares]
    newsquares[x]= newsquares[x].map((v,index)=>index===y?item:v)
    this.setState({
      squares:newsquares,
      isBlack: !this.state.isBlack
    },()=>{
      this.calcWin()
    });
  }

  calcWin(){
    
    //
    const currentSquare = [...this.state.squares]
    const currentTarget = this.state.isBlack?'O':'X'

    this.calcX(currentSquare,currentTarget) //横向计算

    var newCurrentSquare = currentSquare[0].map(function(col, i) { //横纵列转换
      return currentSquare.map(function(row) {
        return row[i];
       })
    });
    this.calcX(newCurrentSquare, currentTarget)

    
  }
  calcX(arr,target){
    let num = 0
    for (let index = 0; index < arr.length; index++) {
      for (let idx = 0; idx < arr[index].length; idx++) {
        const element = arr[index][idx];
        if(element===target){
          num++
          if(num>=5){
            console.log('获胜！游戏结束！')
            return false
          }
        }else{
          num = 0
        }
      }
    }
  }
  renderSquare(x,y){
    return <Square value={this.state.squares[x][y]} key={y} isBlack={this.state.isBlack} onClick={() => this.handleClick(x,y)}/>
  }
  
  render(){
    return (
      <div className='board'>
        {this.state.isBlack?'黑棋下':'白棋下'}
        {this.state.squares.map((square,xindex)=>
          {
            return (
              <div className='square' key={xindex}>
                {square.map((item,yindex)=>this.renderSquare(xindex,yindex))}
              </div>
            )
          }
        )}
      </div>
    )
  }
}
export default Board;