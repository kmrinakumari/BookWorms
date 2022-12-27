import React from "react";
import { useParams } from "react-router-dom";

const ViewNovel = () => {
  const { id } = useParams();

  const getNovelData = () => {};

  return <div>ViewNovel</div>;
};

export default ViewNovel;
