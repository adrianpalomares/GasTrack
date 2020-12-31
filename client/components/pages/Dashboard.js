import React from "react";
import axios from "axios";
import FuelRecord from "./FuelRecord";
import AddFuelRecordModal from "../AddFuelRecordModal";

const Dashboard = () => {
    // Fuel records and maintenance records
    const [fuelRecords, setFuelRecords] = React.useState([]);
    const [maintenanceRecords, setMaintenanceRecords] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        axios({
            url: "http://localhost:8080/api/fuelrecords",
            method: "GET",
        }).then((res) => {
            setFuelRecords(res.data);
            setIsLoading(false);
            console.log(fuelRecords);
        });
    }, [isLoading]);

    return (
        <div className="container">
            <button
                className="btn btn-primary mb-4 mt-4"
                data-toggle="modal"
                data-target="#addFuelRecordModal"
            >
                Add Fuel Record
            </button>
            <AddFuelRecordModal />
            {fuelRecords.map((fuelRecord) => (
                <FuelRecord
                    key={fuelRecord._id}
                    car={fuelRecord.car}
                    createdAt={fuelRecord.createdAt}
                    date={fuelRecord.date}
                    fullTank={fuelRecord.fullTank}
                    gallons={fuelRecord.gallons}
                    odometer={fuelRecord.odometer}
                    pricePerGallon={fuelRecord.pricePerGallon}
                    updatedAt={fuelRecord.updatedAt}
                />
            ))}
        </div>
    );
};

export default Dashboard;
