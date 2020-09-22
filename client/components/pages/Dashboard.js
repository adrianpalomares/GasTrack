import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [gasRecords, setGasRecords] = useState([]);
    const [maintenanceRecords, setMaintenanceRecords] = useState([]);

    return (
        <div class="container">
            <div class="card text-center">
                <div className="card-header">Saturday September 19, 2020</div>
                <div class="card-body">
                    <h5 class="card-title">Gas</h5>
                    {/* <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p> */}
                    <p style={{ color: "green", fontSize: "20px" }}>30.2 mpg</p>
                    <a href="#" class="btn btn-primary">
                        View Details
                    </a>
                </div>
                <div class="card-footer text-muted">1990 Mazda MX-5</div>
            </div>
            <br></br>
            <div class="card text-center">
                <div class="card-header">Saturday September 19, 2020</div>
                <div class="card-body">
                    <h5 class="card-title">Maintenance</h5>
                    {/* <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p> */}
                    <p style={{ color: "green", fontSize: "20px" }}>30.2 mpg</p>
                    <a href="#" class="btn btn-primary">
                        View Details
                    </a>
                </div>
                <div class="card-footer text-muted">1990 Mazda MX-5</div>
            </div>
        </div>
    );
};

export default Dashboard;
