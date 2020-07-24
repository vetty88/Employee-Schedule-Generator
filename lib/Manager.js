const Employee = require("./Employee");

// function to define and export the Manager class extending from Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber, teamName) {
        super(name, id, email)
        this.officeNumber = officeNumber;
        this.teamName = teamName;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }

}
getTeamName() 
    return this.teamName;


getRole() 
    return 'Manager';


module.exports = Manager;