import React from "react";
import Footer from "./Footer";

function NotFound() {
  return (
    <React.Fragment>
      <section id="notFound" className="main-body-sections">
        <div className="container" id="notFound">
          <div>
            <div>
              <h1>404 Not Found</h1>
              <p style={{ paddingBottom: '40px' }}>A page does not exist at this location.</p>
              <p>
                <a href="/">Return to main site.</a>
              </p>
              <p>
                Looking for the movies section? It has moved to <a href="https://movies.nathanjms.co.uk">https://movies.nathanjms.co.uk</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">
        <Footer />
      </footer>
    </React.Fragment>
  );
}
export default NotFound;
