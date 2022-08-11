import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import Button from "react-bootstrap/Button";

function Show(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:8000/api/products/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editProduct = (id) => {
    props.history.push({
      pathname: "/edit/" + id,
    });
  };

  const deleteProduct = (id) => {
    setShowLoading(true);
    axios
      .delete(apiUrl, id)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/list");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
      )}

      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <h2>{data.voltagee}</h2>
      <h2>{data.brand}</h2>
      <p>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            editProduct(data.id);
          }}
        >
          Editar
        </Button>
        &nbsp;
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            deleteProduct(data.id);
          }}
        >
          Deletar
        </Button>
      </p>
    </div>
  );
}

export default Show;
