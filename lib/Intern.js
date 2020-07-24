// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern";
    }
};

module.exports = Intern;
// const engineer = new Engineer ('Alec', 1, 'alec@fakeemail.com', 'ibealec');
// engineer.printInfo();
// console.log(engineer);