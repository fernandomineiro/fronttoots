import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";

const List = (props) => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:8000/api/products";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);
  const showDetail = (id) => {
    props.history.push({
      pathname: "/show/" + id,
    });
  };
  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">carregando...</span>
        </Spinner>
      )}
      <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => {
              showDetail(item.id);
            }}
          >
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default List;
