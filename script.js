class Employee {
    constructor(name, baseSalary, requiredHoursPerDay = 8, totalWorkingDays = 20) {
        this.name = name;
        this.baseSalary = baseSalary;
        this.requiredHoursPerDay = requiredHoursPerDay;
        this.totalWorkingDays = totalWorkingDays;
        this.leavesTaken = 0;
        this.loggedHours = 0;
    }

    logLeave(days) {
        this.leavesTaken += days;
    }

    logHours(hours) {
        this.loggedHours = hours;
    }

    calculateSalary() {
        const totalRequiredHours = (this.totalWorkingDays - this.leavesTaken) * this.requiredHoursPerDay;
        const effectiveHourlyRate = this.baseSalary / totalRequiredHours;
        return Math.min(this.loggedHours, totalRequiredHours) * effectiveHourlyRate;
    }
}

const employees = [];

document.getElementById('calculateAndAddBtn').addEventListener('click', () => {
    const currencySymbol = document.getElementById('currencySymbol').value;
    const name = document.getElementById('name').value;
    const baseSalary = parseFloat(document.getElementById('baseSalary').value);
    const requiredHours = parseInt(document.getElementById('requiredHours').value);
    const totalDays = parseInt(document.getElementById('totalDays').value);
    const leaves = parseInt(document.getElementById('leaves').value);
    const loggedHours = parseInt(document.getElementById('loggedHours').value);

    if (name && baseSalary >= 0 && requiredHours > 0 && totalDays > 0 && leaves >= 0 && loggedHours >= 0) {
        const employee = new Employee(name, baseSalary, requiredHours, totalDays);
        employee.logLeave(leaves);
        employee.logHours(loggedHours);
        employees.push(employee);

        // Clear inputs after adding
        document.getElementById('employeeForm').reset();
        updateEmployeeTable(currencySymbol);
    } else {
        alert('Please fill in all fields correctly.');
    }
});

function updateEmployeeTable(currencySymbol) {
    const tbody = document.querySelector('#employeeInfo tbody');
    tbody.innerHTML = ''; // Clear previous info

    employees.forEach((employee, index) => {
        const salary = employee.calculateSalary().toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${currencySymbol}${employee.baseSalary}</td>
            <td>${employee.totalWorkingDays}</td>
            <td>${employee.leavesTaken}</td>
            <td>${employee.loggedHours}</td>
            <td>${currencySymbol}${salary}</td>
            <td><button class="delete-icon" data-index="${index}">&times;</button></td> <!-- Use &times; for an "X" -->
        `;
        tbody.appendChild(row);
    });

    // Show or hide the print button based on records
    document.getElementById('printBtn').style.display = employees.length > 0 ? 'inline-block' : 'none';
    
    // Add event listeners to the delete buttons
    document.querySelectorAll('.delete-icon').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index; // Get index from the button
            employees.splice(index, 1); // Remove employee from array
            updateEmployeeTable(currencySymbol); // Update the table
        });
    });
}

document.getElementById('printBtn').addEventListener('click', () => {
    alert("Print functionality is currently under development.");
});
