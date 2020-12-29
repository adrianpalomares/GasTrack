import React from "react";
import axios from "axios";
import Car from "../Car";

// TODO: Manage state input values
const Cars = () => {
    const [cars, setCars] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState("");

    React.useEffect(() => {
        // make request
        axios({
            url: "http://localhost:8080/api/cars",
            method: "GET",
        }).then((res) => console.log(res));
    }, [isLoading]);

    return (
        <div className="container">
            <h1>This is the cars page!</h1>
            <button
                type="button"
                className="btn btn-primary mb-4"
                data-toggle="modal"
                data-target="#addCarModal"
            >
                Add Car
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="addCarModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add Car
                            </h5>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* Form goes here */}
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="inputCarMake">
                                        Car Make
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCarMake"
                                        placeholder="Enter car make"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputCarModel">
                                        Car Model
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCarModel"
                                        placeholder="Enter car model"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputModelYear">
                                        Model Year
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputModelYear"
                                        placeholder="Enter model year"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputCarName">
                                        Car Name
                                    </label>
                                    {/* TODO: Add a hint stating a custom name */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputCarName"
                                        placeholder="Enter car name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputLicensePlate">
                                        License Plate
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputLicensePlate"
                                        placeholder="Enter license plate"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputVin">VIN #</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputVin"
                                        placeholder="Enter vin number"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Car />
        </div>
    );
};

export default Cars;
