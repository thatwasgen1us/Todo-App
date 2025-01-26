import { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSeconds: 0,
      isRunning: false,
    };
    this.timerId = null;
  }

  componentDidMount() {
    const { minutes, seconds } = this.props;
    if (minutes || seconds) {
      this.setState({
        newSeconds: (minutes || 0) * 60 + (seconds || 0),
      });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerId = setInterval(() => {
        this.setState((prevState) => {
          const { minutes, seconds } = this.props;

          if (minutes || seconds) {
            if (prevState.newSeconds > 0) {
              return { newSeconds: prevState.newSeconds - 1 };
            } else {
              this.clearTimer();
              return { isRunning: false };
            }
          } else {

            return { newSeconds: prevState.newSeconds + 1 };
          }
        });
      }, 1000);
    }
  };

  pauseTimer = () => {
    this.setState({ isRunning: false });
    this.clearTimer();
  };

  clearTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  };

  padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  render() {
    const { newSeconds, isRunning } = this.state;

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.startTimer} disabled={isRunning}></button>
        <button className="icon icon-pause" onClick={this.pauseTimer} disabled={!isRunning}></button>
        {this.formatTime(newSeconds)}
      </span>
    );
  }
}
