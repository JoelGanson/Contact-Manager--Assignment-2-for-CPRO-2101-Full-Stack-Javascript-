import React, { useState, useEffect } from "react";

export default function HomeList(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [category, setCategory] = useState([]);
  //console.log("id:");
  //console.log(props);

  useEffect(() => {
    fetch("http://localhost:3020/cat/category?categoryId=" + props.id)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setCategory(data.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  //   console.log("successful response:");
  //   console.log(category);
  //   console.log("error response:");
  //   console.log(error);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <span>{category.categoryName}</span>;
  }
}
