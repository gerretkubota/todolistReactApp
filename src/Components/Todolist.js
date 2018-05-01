import React, {Component} from 'react';

import TasksItem from './TasksItem';
import Home from './Home';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './todolist.css';


class Todolist extends Component{
  constructor(props){
    super(props);
    // Through the initial render, the constructor gets called first
    // set the state here with an empty array that holds the tasks.
    // Also, have a property of selectedDay that can hold a value of the selected day
    // using DayPickerInput component
    this.state = {
      listOfTasks: [],
      selectedDay: undefined,
      editedTasks: {},
      showEditInput: false,
      signOut: false
    }
    // make sure to bind to get control of what this points to
    this.makeTask = this.makeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.chosenDay = this.chosenDay.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setEditTask = this.setEditTask.bind(this);
    this.finishEditTask = this.finishEditTask.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  // makeTask function that retrieves all the input data from the defined refs
  // If those input data from the refs are not an empty string, there is an entered input from
  // the user. Make a new object that consists the tasks, title, key, and selectedDay, the appropriate values/data
  // are obtained from selected refs
  makeTask = (event) => {
    if(this._inputTask.value !== '' && this._inputTitle.value !== ''){
      var newTask = {
        task: this._inputTask.value,
        title: this._inputTitle.value,
        timeKey: Date.now(),
        selectedDay: this.state.selectedDay.toLocaleDateString()
      }
      // concatenate the new task to the array, which makes a new array
      // and set it to the array
      this.setState((prevState) => {
        return{
          listOfTasks: prevState.listOfTasks.concat(newTask)
        }
      })

      console.log('local storage');

      localStorage.setItem('list', JSON.stringify(this.state.listOfTasks));
      localStorage.setItem('newTask', '');

      this._inputTask.value = '';
      this._inputTitle.value = '';
    }
    
    event.preventDefault();
  }
  
  // Delete function for deleting a task
  // Pass in the key from the Tasks component for the specific task to delete
  // Iterate through the array and filter all the tasks that do not have the matching key
  // that was passed in and this creates a 'new' array
  deleteTask = (timeKey) => {
    console.log('hello from inside');
    var newList = this.state.listOfTasks.filter((task) => {
      return (task.timeKey !== timeKey)
    });
    // set the new array to the state's property of array
    this.setState({
      listOfTasks: newList
    });
  }

  // look for the index value of the edited task and search for the task
  // within the stored array.
  // make a copy of the task that will be edited, as well as the whole array that it is stored in.
  // assign the edited task to the copied task and then copy that edited task back to the copeied array
  // and setState with the copied array that has the updated value
  editTask = (timeKey, task) => {
    console.log('edit compleete? ' + task);
    console.log('key: ' + timeKey);
    // find index of the task by using key
    var index = this.state.listOfTasks.findIndex((item) => {
      return (item.timeKey === timeKey)
    });

    console.log('index ' + index);

    var updatedTask = Object.assign({}, this.state.listOfTasks[index]);
  
    var newList = Object.assign([], this.state.listOfTasks);

    updatedTask.task = task;

    newList[index] = updatedTask;

    this.setState({
      listOfTasks: newList
    });
  }

  // assigns the key and updated task to the editedTasks object
  // change the status of the showEditInput to true so that the input field
  // will show to edit the description
  setEditTask = (key, task) => {
    console.log('inside parent component value: ' + task);
    this.setState({
      editedTasks: {key, task},
      showEditInput: true
    })
  }

  finishEditTask = (task) => {
    this.setState({
      showEditInput: false
    })
  }

  // Given the selected date from the DayPickerInput component,
  // set the selected date to the state's selectedDay property
  chosenDay = (day) => {
    this.setState({
      selectedDay: day
    })
  }

  // updates the states with the saved values in local storage
  refreshStateWithLocalStorage = () => {
    for(let key in this.state){
      if(localStorage.hasOwnProperty(key)){
        let value = localStorage.getItem(key);

        try{
          value = JSON.parse(value);
          this.setState({
            [key]: value
          })
        }catch(e){
          this.setState({
            [key]: value
          })
        }
      }
    }
  }

  // save the data to local storage
  saveStateToLocalStorage = () => {
    for(let key in this.state){
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount(){
    this.refreshStateWithLocalStorage();
  }

  componentWillUnmount(){
    this.saveStateToLocalStorage();

    window.onbeforeunload = (event) => {
      localStorage.clear();
    }
  }

  handleSignout = (event) => {
    this.setState({
      signOut: true
    })
  }

  toggle = (event) => {
    this.setState({
      signOut: false
    })
  }
  
  render(){
    const {selectedDay} = this.state;
      return(
        <div>
          <h2> Welcome to your Daily To-Dos, {this.props.username}</h2>
          <button onClick={this.handleSignout}>Sign out</button>
          <div className='todolistStyle'>
            {/* Start of 1st div*/}
            <div>
              {/* call the makeTask function when submitted by button */}  
              <form onSubmit={this.makeTask}>
                <label>Title: </label>
                <br/>
                {/* set refs for the input elements to obtain */}
                {/* provides a bridge between jsx and html elements in dom */}
                <input  type='text'
                        placeholder='Add a title. . .'
                        ref={(input) => {this._inputTitle = input}}
                />
                <br/> <br/>
  
                <label>Due date:</label>
                <br/>
                  {/* DayPickerInput component to show calendar and be able to select a date */}
                  <DayPickerInput onDayChange={this.chosenDay}/>
                <br/> <br/>
  
                <label>Description: </label>
                <br/>
                <input type='text' placeholder='Add a task to do. . .'
                       ref={(input) => {this._inputTask = input}}
                />
  
                <br/> <br/>
                <button type='submit'>Add Task</button>
              </form>
            </div>{/* End of 1st div */}
            {/* Start of 2nd div*/}
            <div className='tasksStyle'>
              <TasksItem
                          listAdded={this.state.listOfTasks}
                          delete={this.deleteTask}
                          edit={this.editTask}
                          finishTask={this.finishEditTask}
                          displayEditInput={this.state.showEditInput}
                          editableTasks={this.state.editedTasks}
                          setEdit={this.setEditTask}
              />
            </div> {/* End of 2nd div */}
          </div> {/* End of todolistStyle */}
        </div>
      )
    }
}

export default Todolist;