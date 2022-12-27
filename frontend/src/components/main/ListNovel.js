import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import app_config from '../../config';

const ListNovel = () => {
    
    const [userData, setUserData] = useState([]);
    const url = app_config.apiurl;


    // getting saved user data from backend
    const getData = async () => {
        const response = await fetch('http://localhost:5000/novel/getall');
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setUserData(data);
        }else{
            console.log('something went wrong');
        }
    }

    // calling the above function
    useEffect(() => {
      
        getData();

    }, [])


    // to delete user from database
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


    // to display users data on screen
    const displayNovels = () => {
        return (
            userData.map((novel) => (
                <div className='col-md-3'>
                    <div className='card'>
                        <img className='card-img-top' src={url+"/"+ novel.image } alt="" />
                        <div className="card-body">
                            <h3>{novel.title}</h3>
                            <Link className='btn btn-link' to={'/view/'+novel._id}>View More</Link>
                        </div>
                    </div>
                </div>
                
            ))
        )
    }
    

  return (
    <div className='container'>
        <h1 className='text-center mb-5'>ManageUser</h1>
        <div className="row mt-5">

        {displayNovels()}
        </div>
    </div>
  )
}

export default ListNovel;