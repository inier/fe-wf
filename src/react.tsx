import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import './style/react.scss';
import checkedSvg from '@/assets/images/checked.svg';
interface IMyComponentState {
    value: string;
}
interface IMyComponentProps {}

class Square extends React.Component<IMyComponentProps, IMyComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
        };
    }

    render() {
        return (
            <button className="square" onClick={() => this.setState({ value: 'X' })}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className={'test status'}>{status}</div>
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
                    <hr />
                    <div>
                        <div className="svgBg"></div>
                        <img src={checkedSvg} />
                        <div style={{ width: 100, height: 100, background: `url(${checkedSvg})` }}></div>
                    </div>
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

ReactDOM.render(<Game />, document.getElementById('root'));
