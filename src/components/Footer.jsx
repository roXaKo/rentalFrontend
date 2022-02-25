import React from "react";

function Footer(props) {
  return (
    <footer className="footer mt-auto py-3 bg-light fixed-bottom">
      <div className="container">
        <span className="text-muted">
          Created by Robin Hartmann. As you may have noticed, this isn't a real
          video rental service, but a demo.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
