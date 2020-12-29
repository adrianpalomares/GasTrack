import React from "react";
import axios from "axios";
import Car from "../Car";
import { AuthContext } from "../../App";

// TODO: Manage state input values
const Cars = () => {
    const [cars, setCars] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState("");

    // Grab context need user
    const { user } = React.useContext(AuthContext); // Remember to parse this

    // For modal form
    const [model, setModel] = React.useState("");
    const [make, setMake] = React.useState("");
    const [modelYear, setModelYear] = React.useState("");
    const [carName, setCarName] = React.useState("");
    const [licensePlate, setLicensePlate] = React.useState("");
    const [vin, setVin] = React.useState("");

    React.useEffect(() => {
        // make request
        axios({
            url: "http://localhost:8080/api/cars",
            method: "GET",
        }).then((res) => {
            console.log(res);
        });
    }, [isLoading]);

    const handleAddCar = (event) => {
        // Make api request
        event.preventDefault();
        console.log(model, make, modelYear, carName, licensePlate, vin);
        const parsedUser = JSON.parse(user);
        axios({
            url: "http://localhost:8080/api/cars",
            method: "POST",
            data: {
                user: parsedUser.id,
                model: model,
                make: make,
                modelYear: modelYear,
                carName: carName,
                licensePlate: licensePlate,
                vin: vin,
            },
        }).then(res => {
            console.log(res);
        });
    };
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
                                        onChange={(e) =>
                                            setMake(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setModel(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setModelYear(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setCarName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setLicensePlate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputVin">VIN #</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputVin"
                                        placeholder="Enter vin number"
                                        onChange={(e) => setVin(e.target.value)}
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
                            <button
                                type="button"
                                onClick={handleAddCar}
                                className="btn btn-primary"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Loop through cars here */}
            <Car />
        </div>
    );
};

export default Cars;
