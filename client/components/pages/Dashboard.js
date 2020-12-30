import React from "react";
import axios from "axios";
import FuelRecord from "./FuelRecord";

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
        });
    }, [isLoading]);

    return (
        <div className="container">
            <FuelRecord />
            <br></br>
            <div className="card text-center">
                <div className="card-header">Saturday September 19, 2020</div>
                <div className="card-body">
                    <h5 className="card-title">Maintenance</h5>
                    {/* <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p> */}
                    <p style={{ color: "green", fontSize: "20px" }}>30.2 mpg</p>
                    <a href="#" className="btn btn-primary">
                        View Details
                    </a>
                </div>
                <div className="card-footer text-muted">1990 Mazda MX-5</div>
            </div>
        </div>
    );
};

export default Dashboard;
