import React, { useState, useEffect } from "react";
import axios from "axios";
import { chunk } from "lodash";
import ReactPaginate from "react-paginate";
import Modal from "./components/Modal";
import "./App.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, toggleModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=${currentPage}&per_page=30&query=car&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then(data => {
        let images = [];
        let refs = [];
        if (data.data.results) {
          data.data.results.forEach((result, index) => {
            refs.push(React.createRef());
            let image = {
              index,
              id: result.id,
              smallURL: result.urls.small,
              regularURL: result.urls.regular,
              description: result.description,
              alt_description: result.alt_description
            };
            images.push(image);
          });
        }
        setPageCount(data.data.total_pages);
        setRefs(refs);
        setImages(images);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [currentPage]);

  const handlePageClick = e => {
    setCurrentPage(e.selected + 1);
  };

  const imageClickHandler = image => {
    setCurrentImage(image);
    toggleModal(true);
  };

  const updateCurrentImage = image => {
    refs[image.index].current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    setCurrentImage(image);
  };

  const renderColumn = array => {
    return (
      <div className="img-column">
        {array.map(image => {
          return (
            <img
              ref={refs[image.index]}
              key={image.id}
              onClick={() => imageClickHandler(image)}
              src={image.smallURL}
              alt="result"
            ></img>
          );
        })}
      </div>
    );
  };

  const renderImages = images => {
    let arrays = chunk(images, 8);
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
      <Modal
        show={showModal}
        toggleModal={toggleModal}
        currentImage={currentImage}
        images={images}
        setCurrentImage={updateCurrentImage}
      />
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={8}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        previousClassName={"previous"}
        nextClassName={"next"}
      />
      {images.length ? renderImages(images) : null}
      {loading ? <div className="loader"></div> : null}
    </div>
  );
};

export default App;
