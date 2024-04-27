import React from "react";

// Footer component
export default class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: "#008eb0",
          color: "white",
          padding: "15px 15px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        EMS &copy; {new Date().getFullYear()}
      </footer>
    );
  }
}
