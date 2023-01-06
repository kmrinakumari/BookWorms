import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";

const ViewNovel = () => {
  const { id } = useParams();
  const url = app_config.apiurl;
  const [novelData, setNovelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNovelData = async () => {
    setLoading(true);
    const res = await fetch(url + '/novel/getbyid/' + id);
    const data = await res.json();
    console.log(data);
    setNovelData(data);
    setLoading(false);
  };

  useEffect(() => {
    getNovelData();
  }, [])

  const displayNovelData = () => {
    if (!loading && novelData) {
      return <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img className="img-fluid" src={url + "/" + novelData.image}/>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body ">
                <h2>{novelData.title}</h2>
                <p><i class="fas fa-pen"></i> <b>{novelData.author}</b></p>
                <p><b>{new Date(novelData.createAt).toLocaleDateString()}</b></p>
                <p><b>{novelData.genre}</b></p>
                <p><b>{novelData.publisher}</b></p>
                <p><b>{novelData.rentable}</b></p>
                <p><b>{novelData.sellable}</b></p>
                <p><i class="fas fa-periscope"></i><b>{novelData.rentPrice}</b></p>
                <p><i class="fas fa-periscope"></i><b>{novelData.sellPrice}</b></p>
                <p><b>{novelData.user.name}</b></p>
                <p><b>{novelData.id}</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  }


  return (
    <div className="viewnovel-bg">
      <div className="col-md-6 mx-auto pt-5">
        <div className="container">
          <h1 className="text-center mb-5">ViewNovel</h1>
    {displayNovelData()}
    </div>
    </div>
  </div>
  );
};

export default ViewNovel;
