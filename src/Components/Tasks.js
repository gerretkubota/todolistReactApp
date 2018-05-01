import React, {Component} from 'react';
import './todolist.css';

class Tasks extends Component{
  constructor(props){
    super(props);

    this.state = {
      task: props.editTasksNow.task
    }

    this.handleEditingDone = this.handleEditingDone.bind(this);
    this.handleEditingChange = this.handleEditingChange.bind(this);
    this.handleEditStuff = this.handleEditStuff.bind(this);
    this.deleteStuff = this.deleteStuff.bind(this);
  }

  // when the user hits the return or esc key, the values will be updated
  handleEditingDone = (event) => {
    if(event.keyCode === 13 || event.keyCode === 27){
      this.props.editedTask(this.props.taskKey, this.state.task)
      this.props.finishedTask();
      event.preventDefault();
    }
  }

  handleEditingChange = (event) => {
    this.setState({
      task: event.target.value
    })
  }

  handleInitValue = (event) => {
    this.setState({
      task: this.props.editableTask.task
    })
  }

  // function that passes the key and updated task to the prop's object property
  // set the updated task to the state
  handleEditStuff = (key, task) => (event) => {
    this.props.setEdited(key, task);

    this.setState({
      task: task
    })

    this._editInput.focus();
  }

  // function that calls the delete function from todolist
  deleteStuff = (key) => {
    console.log('hello');
    this.props.deleteThisTask(key);
  }
  
  render(){
    // Iterates through the list from props and stores into another array
    // generates each task as an li element
    // var newListOfTasks = this.props.listAdded.map(this.generateList);
    var viewStyle = {};
    var editStyle = {};

    console.log(this.props.displayEditInput);

    if(this.props.displayEditInput){
      viewStyle.display = 'none';
    }else{
      editStyle.display = 'none';
    }
    
    return (
      <li>
        <div className='editBtns'>
          <button onClick={this.handleEditStuff(this.props.taskKey, this.props.item.task)}>
                  Edit</button>
          <br/> <br/>
          <button onClick={() => {this.deleteStuff(this.props.taskKey)}}>
                  Delete</button>
        </div>
        {/* Start of 1st div */}
        <div className='firstInner'>
          <div>
            <div style={viewStyle}>
            <label>Title: &nbsp;</label>
              {this.props.item.title}
            </div>
          </div>
          <div>
            <label>Due Date: </label>
              {this.props.item.selectedDay}
          </div>
        </div>{/* End of 1st div */}
        {/* Start of 2nd div */}
        <div>
        <label>Description: </label>
            {this.props.item.task}
            <input type='text'
                   onKeyDown={this.handleEditingDone.bind(this)}
                   onChange={this.handleEditingChange.bind(this)}
                   onLoad={this.handleInitValue}
                   value={this.state.task}
                   ref={(input) => {this._editInput = input}}
                   style={editStyle}
            />
        </div> {/* End of 2nd div */}
      </li>
    )
  }
}

export default Tasks;