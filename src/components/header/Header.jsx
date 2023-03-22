import React, { useState, useContext } from "react";
import desktopLight from "../../assets/bg-desktop-light.jpg";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import Modal from "../modal/Modal";
import { AppContext } from "../../App";

const Header = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const { theme, setTheme } = useContext(AppContext);

  const handleModal = () => {
    setToggleModal(!toggleModal);
  };

  return (
    <>
      <section
        className="image-section"
        style={{
          backgroundImage: `url(${desktopLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="image-section__container">
          <h1 className="image-section__title">TODO</h1>
          {theme ? (
            <BsFillSunFill
              className="icon-sun"
              onClick={() => {
                setTheme(!theme);
              }}
            />
          ) : (
            <BsFillMoonStarsFill
              className="icon-moon"
              onClick={() => {
                setTheme(!theme);
              }}
            />
          )}
        </div>
        <div
          className={theme ? "create-new-task--black" : "create-new-task"}
          onClick={handleModal}
        >
          Create a new todo...
        </div>
      </section>
      {toggleModal ? (
        <Modal
          modal={toggleModal}
          setModal={setToggleModal}
          handleModal={handleModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
