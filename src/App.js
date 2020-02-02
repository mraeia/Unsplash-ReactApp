import React, { useState, useEffect } from "react";
import axios from "axios";
import { chunk } from "lodash";
import "./App.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=0&per_page=30&query=car&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then(data => {
        let images = [];
        if (data.data.results) {
          data.data.results.forEach((result, index) => {
            let image = {
              index,
              id: result.id,
              smallURL: result.urls.small,
              regularURL: result.urls.regular,
              description: result.description
            };
            images.push(image);
          });
        }
        setImages(images);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const renderColumn = array => {
    return (
      <div className="img-column">
        {array.map(image => {
          return <img key={image.id} src={image.smallURL} alt="result"></img>;
        })}
      </div>
    );
  };

  const renderImages = images => {
    let arrays = chunk(images, 10);
    return (
      <div className="flex-container">
        {arrays.map((arr, index) => {
          return (
            <React.Fragment key={index}>{renderColumn(arr)}</React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {images.length ? renderImages(images) : null}
      {loading ? <div className="loader"></div> : null}
    </div>
  );
};

export default App;
