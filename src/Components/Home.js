import { React, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [tasks, setTask] = useState([]);
  const [currTask, setCurrTask] = useState("");
  const [isEdit, setisEdit] = useState(false);

  const handleChange = (e) => {
    setCurrTask(e.target.value);
  };

  const addTask = () => {
    if (currTask !== "") {
      setTask([...tasks, { task: currTask, id: Math.random().toString() }]);
    }
    setCurrTask("");
  };

  const handleDelete = (id) => {
    let narr = tasks.filter((tsk) => {
      return id !== tsk.id;
    });
    setTask([...narr]);
  };

  const handleEdit = (id) => {
    setisEdit(true);
    let editTask = tasks
      .filter((tsk) => {
        return id === tsk.id;
      })
      .map((tsk) => tsk.task);
    setCurrTask(...editTask);
  };

  const handleSave = () => {
    setisEdit(false);
    setTask([...tasks,{task:currTask}])
  }

  return (
    <>
      <h1 className="text-center">To Do</h1>
      <Container>
        <Row className="mb-2" key={tasks.id}>
          <Col>
            <Form.Control
              placeholder="Add New Task"
              onChange={handleChange}
              value={currTask}
            />
          </Col>
          <Col>
            <Button className="mx-2" disabled={isEdit} onClick={addTask}>Add</Button>
            <Button disabled={!isEdit} onClick={()=>handleSave}>Save</Button>
          </Col>
        </Row>
        {tasks.length !== 0 &&
          tasks.map((obj) => {
            return (
              <Row className="m-2" key={obj.id}>
                <Col>
                  <Form.Label>{obj.task}</Form.Label>
                </Col>
                <Col>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleDelete(obj.id)}
                    className="mx-2"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(obj.id)}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            );
          })}
      </Container>
    </>
  );
};

export default Home;
