import Modal from "./Modal";
import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";

const MOCK_PROPS = {
  show: false,
  toggleModal: jest.fn(),
  currentImage: {
    index: 0,
    id: "Test",
    smallURL:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMzA4NH0",
    regularURL:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMzA4NH0",
    descripton: "car",
    alt_description: "car"
  },
  images: [
    {
      index: 0,
      id: "Test",
      smallURL:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMzA4NH0",
      regularURL:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMzA4NH0",
      descripton: "car",
      alt_description: "car"
    }
  ],
  setCurrentImage: jest.fn()
};

describe("Modal component", () => {
  it("renders without crashing", () => {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.append(modal);
    const component = shallow(<Modal />);
    expect(component).not.toBeNull();
  });
  it("close modal click", () => {
    const toggleModal = jest.fn();
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.append(modal);
    const component = shallow(<Modal show={true} toggleModal={toggleModal} />);
    component.find(".modal.display-block").simulate("click");
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
  it("switch images click", () => {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.append(modal);
    const component = shallow(<Modal {...MOCK_PROPS} />);
    component.find(".arrow-left").simulate("click", {
      stopPropagation: jest.fn(),
      target: { className: "arrow-left" }
    });
    expect(MOCK_PROPS.setCurrentImage).toHaveBeenCalled();
  });
  it("test props", () => {
    const propsError = checkPropTypes(
      Modal.propTypes,
      MOCK_PROPS,
      "prop",
      Modal.name
    );
    expect(propsError).toBeUndefined();
  });
});
