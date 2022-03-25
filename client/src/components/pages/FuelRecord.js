import React from "react";
const FuelRecord = (props) => {
    return (
        <div className="card text-center rounded">
            <div className="card-header">Saturday September 19, 2020</div>
            <div className="card-body">
                <h5 className="card-title">Gas</h5>
                {/* <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p> */}
                <p style={{ color: "green", fontSize: "20px" }}>30.2 mpg</p>
                <a href="/cars" className="btn btn-primary">
                    View Details
                </a>
            </div>
            <div className="card-footer text-muted">1990 Mazda MX-5</div>
        </div>
    );
};
export default FuelRecord;
