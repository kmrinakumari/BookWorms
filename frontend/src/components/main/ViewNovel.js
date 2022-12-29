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
    const res = await fetch(url+'/novel/getbyid/'+id);
    const data = await res.json();
    console.log(data);
    setNovelData(data);
    setLoading(false);
  };

  useEffect(() => {
    getNovelData();
  }, [])

  const displayNovelData = () => {
    if(!loading && novelData){
      return <div className="container">
        {novelData.title}
      </div>
    }
  }
  

  return <div>
    {displayNovelData()}
  </div>;
};

export default ViewNovel;
