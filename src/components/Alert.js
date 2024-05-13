import { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: "white",
      backgroundColor: this.bgColor,
      fontWeight: "bolder",
      borderRadius: "4px",
      textAlign: "center",
      fontSize: "12px",
      margin: "10px",
      padding: "10px",
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    const blue = "rgb(0, 128, 255)";
    this.bgColor = blue;
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    const orange = "rgb(255, 102, 0)";
    this.bgColor = orange;
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    const red = "rgb(255, 0, 0)";
    this.bgColor = red;
  }
}

export {InfoAlert, ErrorAlert};
