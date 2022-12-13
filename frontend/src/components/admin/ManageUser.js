import React, { useEffect } from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';

const ManageUser = () => {
    
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:5000/user/getall');
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setUserData(data);
        }else{
            console.log('something went wrong');
        }
    }

    useEffect(() => {
      
        getData();

    }, [])

    const deleteUser = async (id) => {
        console.log(id);
        const response = await fetch('http://localhost:5000/user/delete/'+id, {
            method: 'DELETE'
        })

        if(response.status === 200){
            Swal.fire({
                icon : 'success',
                text: 'User Deleted!!'
            })

            getData();
        }
    }


    const displayUsers = () => {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData.map((user) => (
                            <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button onClick={() => { deleteUser(user._id) }} className='btn btn-danger'> <i class="fas fa-trash"></i> </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    

  return (
    <div className='container'>
        <h1 className='text-center mb-5'>ManageUser</h1>
        {displayUsers()}
    </div>
  )
}

export default ManageUser;