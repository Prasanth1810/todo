import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  constructor(props) {
    super(props);
    // setting up state
    this.state = {
      userInput: "",
      list: [],
    };
  }

  //Setting the value of user input
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }
  //Adding item if user input is not empty
  addItem() {
    if (this.state.userInput !== " ") {
      const userInput = {
        //add random id to delete
        id: Math.random(),
        //add user value to the list
        value: this.state.userInput,
      };
      //update list
      const list = [...this.state.list];
      list.push(userInput);
      //reset state
      this.setState({
        list,
        userInput: " ",
      });
    }
  }
  //Deleting item from list use id to delete
  deleteItem(key){
    const list = [...this.state.list];
    //iterate values to delete
    const updateList = list.filter((item) => item.id !== key);
    //update list
    this.setState({
      list:updateList,
    });
  }
  editItem = (index) =>{
    const todos = [...this.state.list];
    const editedTodo = prompt('Edit the TodoList:');
    if(editedTodo !== null && editedTodo.trim() !== ''){
      let updatedTodos = [...todos]
      updatedTodos[index].value=editedTodo
      this.setState({
        list: updatedTodos,
      });
    }
  }
  render(){
    return(
      <Container>
        <Row style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          fontSize:"3rem",
          fontWeight:"bold"
        }}>TodoList
        </Row>
        <hr/>
        <Row>
          <Col md={{ span:5, offset:4}}>
            <InputGroup className="mb-3">
              <FormControl 
                placeholder="add item ...."
                size="lg"
                value={this.state.userInput}
                onChange={(item)=>{
                  this.updateInput(item.target.value)
                }}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={()=>{this.addItem()}}
                >
                  Add
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{span:5, offset:4}}>
            <ListGroup>
                {this.state.list.map((item, index)=>{
                  return(
                    <div key={index}>
                      <ListGroup.Item
                        variant="dark"
                        action style={{
                          display:"flex",
                          justifyContent:"space-between"
                        }}
                      >
                        {item.value}
                        <span>
                          <Button style={{
                            marginRight:"15px"
                          }} variant="light" onClick={()=>{this.deleteItem(item.id)}}>
                          Delete
                          </Button>
                          <Button variant="light"
                          onClick={()=>this.editItem(index)}>
                          Edit
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default App;
