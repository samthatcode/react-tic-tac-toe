import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


/**
  // To remember things, Components use state

  React components can have state 
  by setting this.state to their constructor

  // Adding state to constructor to store value 
  in square component
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  when you call setState in a component, 
          React automatically updates the child components
           inside of it too
       
          // this.setState({ value: 'X' })
**/
const Square = (props) => {
  return (
    <button className='square'
      onClick={props.onClick}>
      {props.value}

    </button>

  )
}




class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  };



  //now the state is stored in the Board component instead of the individual Square components.  

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    // To remember things, Components use state
    // Passing down two props from Board to Square: value and onClick
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i)
        }}
      />
    );

  }

  render() {
    const status = 'Next player:';
    const statusWinner = 'X';


    return (
      <div>
        <div className="status">
          {status} <span className="statusWinner">{statusWinner}</span>
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

