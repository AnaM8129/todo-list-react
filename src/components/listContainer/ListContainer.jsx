import React, { useEffect, useState, useContext, useMemo } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { AppContext } from "../../App";
import { deleteTask, getTasks, patchTask } from "../../services/http";

const ListContainer = () => {
  const { tasks, setTasks } = useContext(AppContext);
  const { theme } = useContext(AppContext);
  const [reload, setReload] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);

  const getData = async () => {
    const response = await getTasks();
    setTasks(response);
  };
  useEffect(() => {
    getData();
  }, [reload]);

  //Function for change the number about the items left and set pending tasks
  const listpendingTasks = useMemo(() => {
    const filterPendingTasks = tasks.filter(
      (pendingTask) => pendingTask.status === "pending"
    );
    setPendingTasks(filterPendingTasks);
    // console.log(pendingTasks);
  }, [tasks]);

  //Function for set complete tasks
  const listCompleteTasks = useMemo(() => {
    const filterCompleteTasks = tasks.filter(
      (completeTask) => completeTask.status === "complete"
    );
    setCompleteTasks(filterCompleteTasks);
    // console.log(completeTasks);
  }, [tasks]);

  const handleAll = () => {
    setAll(true);
    setActive(false);
    setComplete(false);
  };
  const handleActive = () => {
    setAll(false);
    setActive(true);
    setComplete(false);
  };
  const handleComplete = () => {
    setComplete(true);
    setAll(false);
    setActive(false);
  };

  const clearComplete = () => {
    setCompleteTasks([]);
  };

  const handleDelete = async (idTask) => {
    const response = await deleteTask(idTask);
    if (response) {
      setReload(!reload);
    }
  };

  const changeStatus = async (task) => {
    if (task.status == "pending") {
      const responseComplete = await patchTask(task.id, { status: "complete" });
      setReload(!reload);
    } else {
      const responsePending = await patchTask(task.id, { status: "pending" });
      setReload(!reload);
    }
  };

  return (
    <>
      <article className={theme ? "tasks-container--dark" : "tasks-container"}>
        {all &&
          tasks.map((task, index) => (
            <div key={index} className="task">
              <div className="container">
                <div
                  onClick={() => changeStatus(task)}
                  className={
                    task.status === "pending"
                      ? "check-container"
                      : "check-container--complete"
                  }
                ></div>
                <p
                  className={`${
                    task.status === "pending"
                      ? "text-task"
                      : "text-task--complete"
                  }
                  ${
                    theme && task.status === "pending"
                      ? "text-task--dark"
                      : "text-task"
                  }
                  `}
                >
                  {task.title}
                </p>
              </div>
              <TiDeleteOutline
                onClick={() => handleDelete(task.id)}
                className="close-icon"
              />
            </div>
          ))}
        {active &&
          pendingTasks.map((task, index) => (
            <div key={index} className="task">
              <div className="container">
                <div
                  onClick={() => changeStatus(task)}
                  className={
                    task.status === "pending"
                      ? "check-container"
                      : "check-container--complete"
                  }
                ></div>
                <p
                  className={`${
                    task.status === "pending"
                      ? "text-task"
                      : "text-task--complete"
                  }
                  ${
                    theme && task.status === "pending"
                      ? "text-task--dark"
                      : "text-task"
                  }
                  `}
                >
                  {task.title}
                </p>
              </div>
              <TiDeleteOutline
                onClick={() => handleDelete(task.id)}
                className="close-icon"
              />
            </div>
          ))}
        {complete &&
          completeTasks.map((task, index) => (
            <div key={index} className="task">
              <div className="container">
                <div
                  onClick={() => changeStatus(task)}
                  className={
                    task.status === "pending"
                      ? "check-container"
                      : "check-container--complete"
                  }
                ></div>
                <p
                  className={
                    task.status === "pending"
                      ? "text-task"
                      : "text-task--complete"
                  }
                >
                  {task.title}
                </p>
              </div>
              <TiDeleteOutline
                onClick={() => handleDelete(task.id)}
                className="close-icon"
              />
            </div>
          ))}
      </article>
      <section className={theme ? "section-footer--dark" : "section-footer"}>
        <div>
          <p className="text-footer">{pendingTasks.length} items left</p>
        </div>
        <div className="desktop-section-container">
          <p
            className={all ? "active-text" : "text-footer"}
            onClick={handleAll}
          >
            All
          </p>
          <p
            className={active ? "active-text" : "text-footer"}
            onClick={handleActive}
          >
            Active
          </p>
          <p
            className={complete ? "active-text" : "text-footer"}
            onClick={handleComplete}
          >
            Completed
          </p>
        </div>
        <div>
          <p className="text-footer" onClick={clearComplete}>
            Clear completed
          </p>
        </div>
      </section>
      <div
        className={theme ? "filters-container-dark" : "filters-container"}
        style={{ display: "flex" }}
      >
        <p className={all ? "active-text" : "text-footer"} onClick={handleAll}>
          All
        </p>
        <p
          className={active ? "active-text" : "text-footer"}
          onClick={handleActive}
        >
          Active
        </p>
        <p
          className={complete ? "active-text" : "text-footer"}
          onClick={handleComplete}
        >
          Completed
        </p>
      </div>
    </>
  );
};

export default ListContainer;
