import React, { useContext } from "react";
import ListContainer from "../listContainer/ListContainer";
import { AppContext } from "../../App";

const Background = () => {
  const { theme } = useContext(AppContext);
  return (
    <section
      className={theme ? "background-section--dark" : "background-section"}
    >
      <ListContainer />
    </section>
  );
};

export default Background;
