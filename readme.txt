—-To Do List APP—-

- Version 1.0 (04/30/18) -

- Designed and developed by Gerret Kubota ©2018 -


========================
Purpose of program.
========================
- Purpose
  - To be able to create a to do list by 
	- adding tasks: title, due date, description
	- deleting tasks
	- editing
  - Create an account/login

=========================
How to RUN program.
=========================
- Prerequisite
  - Make sure to have NPM and Node.js installed on the computer.

- Download/obtain the zip file from the GitHub link 

- Run the program by typing the ‘npm start’ command in a terminal/command line at the root of this project directory

=========================
How to USE program.
=========================
- Add task
	- fill out the title, pick a date from the calendar, and description
	- after filling it out, click ‘Add Task’

- Edit
	- click on ‘Edit’ to be able to edit the description of the task
	- press the ‘return’ key to finish the editing
- Delete
	- click on ‘Delete’ to delete the particular task

* * * IMPORTANT NOTE * * *
- From brainstorming, to implement the users portion
	- create a signup component that takes in the username and password values and store it in the states
	- pass those username and password values to a user component to create the actual user
	- have a state that consists an array that stores the created users
	- within the users component, have a todo list component in it so that individual users will have their own todo list 
	