import React, { useEffect } from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';

const NovelManager = () => {
    
    const [novelData, setNovelData] = useState([]);


    // getting saved user data from backend
    const getData = async () => {
        const response = await fetch('http://localhost:5000/novel/getall');
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setNovelData(data);
        }else{
            console.log('something went wrong');
        }
    }

    // calling the above function
    useEffect(() => {
      
        getData();

    }, [])


    // to delete novel from database
    const deleteNovel = async (id) => {
        console.log(id);
        const response = await fetch('http://localhost:5000/novel/delete/'+id, {
            method: 'DELETE'
        })

        if(response.status === 200){
            Swal.fire({
                icon : 'success',
                text: 'Novel Deleted!!'
            })

            getData();
        }
    }


    // to display users data on screen
    const displayNovels = () => {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        novelData.map((novel) => (
                            <tr>
                                <td>{novel._id}</td>
                                <td>{novel.name}</td>
                                <td>{novel.email}</td>
                                <td>{novel.password}</td>
                                <td>
                                    <button onClick={() => { deleteNovel(novel._id) }} className='btn btn-danger'> <i class="fas fa-trash"></i> </button>
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
        <h1 className='text-center mb-5'>NovelManager</h1>
        {displayNovels()}
    </div>
  )
}

export default NovelManager;