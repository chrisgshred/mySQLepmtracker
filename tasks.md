<!-- -setup
    -create repo
    -add gitignore for node modules
    -initialize npm
    -install dependencies (inquirer, mysql, console.table) -->

-prompt user to choose action (start menu)
    -add new department
    -view departments
    -add new role
    -view roles
    -add new employee
    -view employee
    -update employee role

-add new department
    -createaddDepartment function
    -prompt user for a department name
    -create query string to create department
    -run connection.query
    -if there is an error, print unable to process, elses preint success message
    -call startMenu