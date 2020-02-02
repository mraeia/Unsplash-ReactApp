import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./style.scss";

const Modal = ({
  show,
  toggleModal,
  currentImage,
  images,
  setCurrentImage
}) => {
  let imageURL = currentImage ? currentImage.regularURL : null;
  let description = currentImage
    ? currentImage.description
      ? currentImage.description
      : currentImage.alt_description
    : null;

  const arrowClicked = e => {
    e.stopPropagation();
    if (e.target.className === "arrow-left") {
      if (currentImage.index - 1 >= 0)
        setCurrentImage(images[currentImage.index - 1]);
      else setCurrentImage(images[images.length - 1]);
    } else {
      if (currentImage.index + 1 <= images.length - 1)
        setCurrentImage(images[currentImage.index + 1]);
      else setCurrentImage(images[0]);
    }
  };

  const className = show ? `modal display-block` : `modal display-none`;
  return ReactDOM.createPortal(
    <div onClick={() => toggleModal(false)} className={className}>
      <div className="modal-main">
        <img src={imageURL} alt="full" />
        <div className="desc">{description}</div>
      </div>
      <i onClick={arrowClicked} className="arrow-left" />
      <i onClick={arrowClicked} className="arrow-right" />
    </div>,
    document.querySelector("#modal")
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  toggleModal: PropTypes.func,
  currentImage: PropTypes.shape({
    index: PropTypes.number,
    id: PropTypes.string,
    smallURL: PropTypes.string,
    regularURL: PropTypes.string,
    description: PropTypes.string,
    alt_description: PropTypes.string
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      id: PropTypes.string,
      smallURL: PropTypes.string,
      regularURL: PropTypes.string,
      description: PropTypes.string,
      alt_description: PropTypes.string
    })
  ),
  setCurrentImage: PropTypes.func
};

export default Modal;
