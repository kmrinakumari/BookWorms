import React, { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [userData, setUserData] = useState([]);

  // getting saved user data from backend
  const getData = async () => {
    const response = await fetch("http://localhost:5000/user/getall");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } else {
      console.log("something went wrong");
    }
  };

  // calling the above function
  useEffect(() => {
    getData();
  }, []);

  // to delete user from database
  const deleteUser = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/user/delete/" + id, {
      method: "DELETE",
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        text: "User Deleted!!",
      });

      getData();
    }
  };

  // to display users data on screen
  const displayUsers = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th><b><u>ID</u></b></th>
            <th><b><u>Email</u></b></th>
            <th><b><u>Password</u></b></th>
            
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr>
              <td><b>{user._id}</b></td>
              <td><b>{user.email}</b></td>
              <td><b>{user.password}</b></td>
              
              <td>
                <button
                  onClick={() => {
                    deleteUser(user._id);
                  }}
                  className="btn btn-danger"
                >
                  {" "}
                  <i class="fas fa-trash"></i>{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="manageuser-bg">
      <div className="col-md-6 mx-auto pt-5">
        <div className="container">
          <h1 className="text-center mb-5"><b><u>ManageUser</u></b></h1>
          {displayUsers()}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
