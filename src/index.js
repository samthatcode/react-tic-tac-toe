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
      // Taking turns
      xIsNext: true,
    };
  };
  //now the state is stored in the Board component instead of the individual Square components.  

  handleClick(i) {
    const squares = this.state.squares.slice();
    // change the “statusWinner” text in Board’s render so that it displays which player has the next turn:
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
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
    const status = 'Next Player: ';
    let displayWinner = '';
    const winner = calculateWinner(this.state.squares);
    let statusWinner;
    if (winner) {
      displayWinner = 'Winner: ' + winner;
    } else {
      statusWinner = (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div>
        <div className="status">
          {status} <span className="statusWinner">{statusWinner}</span>
        </div>
        <div className='displayWinner'>{displayWinner}</div>
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

// Helper function for declaring a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}