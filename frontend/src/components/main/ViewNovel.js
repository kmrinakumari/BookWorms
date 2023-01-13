import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import app_config from "../../config";

const ViewNovel = () => {
  const { id } = useParams();
  const url = app_config.apiurl;
  const [novelData, setNovelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getNovelData = async () => {
    setLoading(true);
    const res = await fetch(url + "/novel/getbyid/" + id);
    const data = await res.json();
    console.log(data);
    setNovelData(data);
    setLoading(false);
  };

  useEffect(() => {
    getNovelData();
  }, []);

  const buyNovel = () => {
    sessionStorage.setItem('novel', JSON.stringify(novelData));
    navigate('/user/checkout');
  }

  const displayNovelData = () => {
    if (!loading && novelData) {
      return (
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-fluid w-100"
              src={url + "/" + novelData.image}
              alt=""
            />
          </div>
          <div className="col-md-6 ">
            <div className="card h-100">
              <div className="card-body ">
                <h2 className="display-4">{novelData.title}</h2>
                <p><i class="fas fa-pen"></i> <b>{novelData.author}</b></p>
                <p><b>{new Date(novelData.createAt).toLocaleDateString()}</b></p>
                <p><b>{novelData.genre}</b></p>
                <p><b>{novelData.publisher}</b></p>
                <p><b><i class="fas fa-rupee-sign"></i></b>&nbsp;{novelData.rentPrice}</p>
                <p><b><i class="fas fa-rupee-sign"></i></b>&nbsp;{novelData.sellPrice}</p>
                <p><b>{novelData.user.name}</b></p>
                <p><b>{novelData.id}</b></p>

                <div className="d-flex">
                  {!novelData.sellable && (
                    <button className="btn btn-primary me-4" onClick={buyNovel}>Buy Now</button>
                  )}
                  {novelData.rentable && (
                    <button className="btn btn-danger"  onClick={buyNovel}>Rent Now</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="viewnovel-bg">
      <div className="container">
        <h1 className="text-center mb-5">ViewNovel</h1>
        {displayNovelData()}
      </div>
    </div>
  );
};

export default ViewNovel;
