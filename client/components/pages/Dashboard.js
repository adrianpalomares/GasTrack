import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    // Fuel records and maintenance records
    const [gasRecords, setGasRecords] = useState([]);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/fuelrecords")
            .then((res) => res.json())
            .then((res) => {
                setGasRecords(res);
                setIsLoading(false);
                console.log(gasRecords);
            })
            .catch((err) => console.log(err));
    }, [isLoading]);

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">Saturday September 19, 2020</div>
                <div className="card-body">
                    <h5 className="card-title">Gas</h5>
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
