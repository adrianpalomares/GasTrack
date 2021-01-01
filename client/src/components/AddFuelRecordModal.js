import React from "react";
import axios from "axios";
import { AuthContext } from "../App";

const AddFuelRecordModal = () => {
    const [car, setCar] = React.useState(""); // Will be car id?
    const [dateFilled, setDateFilled] = React.useState(Date.now());
    const [fullTank, setFullTank] = React.useState(false);
    const [gallons, setGallons] = React.useState(0);
    const [odometer, setOdometer] = React.useState(0);
    const [pricePerGallon, setPricePerGallon] = React.useState(0);
    const [totalCost, setTotalCost] = React.useState(0);

    const { user } = React.useContext(AuthContext);
    const [userCars, setUserCars] = React.useState([]);

    // Grab users cars
    React.useEffect(() => {
        //
        axios({
            url: `http://localhost:8080/api/cars?user=${JSON.parse(user).id}`,
            method: "GET",
        }).then((res) => {
            console.log("from res", res.data);
            setUserCars(res.data);
        });
    });

    // Can have a useEffect for when car is set -> retrieves odometer reading
    React.useEffect(() => {
        // when we get car just get it from there
        console.log("test");
    }, [car]);

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: "http://localhost:8080/api/fuelrecords",
            method: "POST",
            data: {
                car: car,
                totalCost: totalCost,
                pricePerGallon: pricePerGallon,
                gallons: gallons,
                fullTank: fullTank,
                date: dateFilled,
                odometer: odometer,
            },
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <div
            className="modal fade"
            id="addFuelRecordModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add Fuel Record
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
                                <label htmlFor="inputCar">Car</label>
                                <select
                                    id="inputCar"
                                    className="custom-select"
                                    value={car}
                                    onChange={(e) => setCar(e.target.value)}
                                >
                                    <option defaultValue>Choose car</option>
                                    {/* List of users cars */}
                                    {userCars.map((car) => (
                                        <option key={car._id} value={car._id}>
                                            {car.model} {car.make}({car.carName}
                                            )
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Full Tank</label>
                                <div>
                                    <label htmlFor="fulltanktrue">Yes</label>
                                    <input
                                        name="fulltank"
                                        value="true"
                                        type="radio"
                                        id="fulltanktrue"
                                        className="mr-2"
                                        onChange={(e) =>
                                            setFullTank(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="fulltankfalse"
                                        className="ml-2"
                                    >
                                        No
                                    </label>
                                    <input
                                        name="fulltank"
                                        value="false"
                                        type="radio"
                                        id="fulltankfalse"
                                        onChange={(e) =>
                                            setFullTank(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDate">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    placeholder="Enter date"
                                    onChange={(e) =>
                                        setDateFilled(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputGallons">Gallons</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputGallons"
                                    placeholder="Enter gallons"
                                    onChange={(e) => setGallons(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPricePerGallon">
                                    Price per gallon
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputPricePerGallon"
                                    placeholder="Enter price per gallon"
                                    onChange={(e) =>
                                        setPricePerGallon(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputTotalCost">
                                    Total Cost
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputTotalCost"
                                    placeholder="Enter total cost"
                                    onChange={(e) =>
                                        setTotalCost(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputOdometer">Odometer</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputOdometer"
                                    placeholder="Enter odometer reading"
                                    onChange={(e) =>
                                        setOdometer(e.target.value)
                                    }
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
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFuelRecordModal;
