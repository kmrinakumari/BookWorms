import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import app_config from "../../config";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const labels = ["January", "February", "March", "April", "May"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [34, 23, 12, 56, 78],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [12, 67, 23, 45, 67],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("admin"))
  );
  const [userList, setUserList] = useState([]);
  const [novelList, setNovelList] = useState([]);
  const url = app_config.apiurl;

  const fetchUsers = async () => {
    const res = await fetch(url + "/user/getall");
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setUserList(data);
    } else {
      console.log("something went wrong");
    }
  };

  const fetchNovels = async () => {
    const res = await fetch(url + "/novel/getall");
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      setNovelList(data);
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchNovels();
  }, []);

  return (
    <div style={{ backgroundColor: "#ccc" }} className="p-3">
      <div className="card p-3">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="fw-bold m-0">User Accounts</p>
                    <p className="display-3 m-0">{userList.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="fw-bold m-0">Novels Uploaded</p>
                    <p className="display-3 m-0">{novelList.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <p className="fw-bold m-0">Novels Uploaded</p>
                    <p className="display-3 m-0">{novelList.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-3">
              <div className="card-header">
                <p className="h3 m-0">User Activity</p>
              </div>
              <div className="card-body">
                <Line options={options} data={data} className="w-100" />
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border">
              <div className="card-header"></div>
              <div className="card-body"></div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
