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
    let num = 0
    const currentSquare = [...this.state.squares]
    const currentTarget = this.state.isBlack?'X':'O'
    for (let index = 0; index < currentSquare.length; index++) {
      for (let idx = 0; idx < currentSquare[index].length; idx++) {
        const element = currentSquare[idx];
        console.log(element)
        if(element===currentTarget){
          num++
          console.log(num)
          if(num>=5){
            alert('获胜！游戏结束！')
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