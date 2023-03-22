import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../../App";
import { getTasks, postTask } from "../../services/http";

const Modal = ({ handleModal }) => {
  const { setTasks } = useContext(AppContext);
  const { theme } = useContext(AppContext);
  const [reload, setReload] = useState(false);

  const getData = async () => {
    const response = await getTasks();
    setTasks(response);
  };
  useEffect(() => {
    getData();
  }, [reload]);

  const [newTask, setNewTask] = useState({
    title: "",
    status: "pending",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await postTask({
      title: newTask.title,
      status: newTask.status,
    });
    if (response) {
      setReload(!reload);
    }
  };

  const handleChange = ({ target }) => {
    setNewTask({
      ...newTask,
      title: target.value,
    });
  };

  return (
    <section style={{ display: "grid" }}>
      <div className="transparent-background "></div>
      <article className={theme ? "modal--dark" : "modal"}>
        <div style={{ borderBottom: "1px solid gray", marginBottom: "13%" }}>
          <AiOutlineClose className="modal__icon-close" onClick={handleModal} />
        </div>
        <p className="modal__title">Create a new todo!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={theme ? "modal__input--dark" : "modal__input"}
            placeholder="Write here the title of your todo..."
            value={newTask.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button className="modal__button" type="submit">
            Create
          </button>
          <p className="footer-text">Close de modal when you have created!</p>
        </form>
      </article>
    </section>
  );
};

export default Modal;
