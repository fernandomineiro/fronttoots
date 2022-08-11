import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Edit = (props) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    voltagee: "",
    brand: "",
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:8000/api/products/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setProduct(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateProduct = (id) => {
    setShowLoading(true);
    axios
      .put(apiUrl, id)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/show/" + id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Form onSubmit={updateProduct(product.id)}>
        <Form.Group>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            placeholder="Entre com o Nome"
            value={product.name}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            id="description"
            rows="3"
            placeholder="Entre com a Descrição"
            value={product.description}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tensão</Form.Label>
          <Form.Control
            type="number"
            name="voltagee"
            id="voltagee"
            placeholder="Entre com a Tensão"
            value={product.voltagee}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="number"
            name="brand"
            id="brand"
            placeholder="Entre com a Marca"
            value={product.brand}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
