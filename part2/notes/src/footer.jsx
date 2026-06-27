const Footer = () => {
  // define a css in react as a JS object
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
  };
  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  );
};

export default Footer;
