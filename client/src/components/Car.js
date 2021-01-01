import React from "react";

const Car = (props) => {
    return (
        <div className="card mb-4">
            <h5 className="card-header">
                {props.modelYear} {props.make} {props.model}
            </h5>
            <div className="card-body">
                <h5 className="card-title">{props.carName}</h5>
                <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                </p>
                <a href="/cars" className="btn btn-primary">
                    Go somewhere
                </a>
            </div>
        </div>
    );
};

export default Car;
