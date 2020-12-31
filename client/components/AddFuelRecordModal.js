import React from "react";

const AddFuelRecordModal = () => {
    // car={fuelRecord.car}
    // date={fuelRecord.date}
    // fullTank={fuelRecord.fullTank}
    // gallons={fuelRecord.gallons}
    // odometer={fuelRecord.odometer}
    // pricePerGallon={fuelRecord.pricePerGallon}
    // updatedAt={fuelRecord.updatedAt}

    const [car, setCar] = React.useState(""); // Will be car id?
    const [dateFilled, setDateFilled] = React.useState(Date.now());
    const [fullTank, setFullTank] = React.useState(false);
    const [gallons, setGallons] = React.useState(0);
    const [odometer, setOdometer] = React.useState(0);
    const [pricePerGallon, setPricePerGallon] = React.useState(0);

    const [userCars, setUserCars] = React.useState([]);

    // Grab users cars
    React.useEffect(() => {}, []);

    // Can have a useEffect for when car is set -> retrieves odometer reading
    React.useEffect(() => {
        // when we get car just get it from there
        console.log("test");
    }, [car]);

    // Submit form
    const handleSubmit = () => {
        console.log(car);
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
                            {/* <div className="form-group">
                                <label htmlFor="inputCar">Car</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCar"
                                    placeholder="Choose car"
                                />
                            </div> */}
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
                                    <option value="testvalue">Miata</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFullTank">Full Tank</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputFullTank"
                                    placeholder="Enter if full tank"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputGallons">Gallons</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputGallons"
                                    placeholder="Enter gallons"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputOdometer">Odometer</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputOdometer"
                                    placeholder="Enter odometer reading"
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
