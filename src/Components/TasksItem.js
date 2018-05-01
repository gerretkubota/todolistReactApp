import React, {Component} from 'react';
import Tasks from './Tasks';

import './todolist.css';

import FlipMove from 'react-flip-move';

class TasksItem extends Component{
  constructor(props){
    super(props);
    this.taskItem = this.taskItem.bind(this);
  }
  
  taskItem = (item) => {
    return(
      <Tasks
        taskKey={item.timeKey}
        item={item}
        editedTask={this.props.edit}
        deleteThisTask={this.props.delete}
        finishedTask={this.props.finishTask}
        editTasksNow={this.props.editableTasks}
        displayEditInput={this.props.displayEditInput}
        setEdited={this.props.setEdit}
      />
    )
  }

  render(){
    var taskList = this.props.listAdded.map(this.taskItem);

    return(
      <div>
        <ul className='list'>
          <FlipMove duration={200} easing='ease-out'>
            {taskList}
          </FlipMove>
        </ul>
      </div>
    );
  }
}

export default TasksItem;