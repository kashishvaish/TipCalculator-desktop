//Form class that consist of all the form fields
class Form {
    //Constructor for form class
    constructor(bill, tip, numberOfPeople) {
        this.bill = bill;
        this.tip = tip;
        this.numberOfPeople = numberOfPeople;
    }
    //Method to check whether form is valid or not
    isValid() {
        if(this.bill.isValid() && this.tip.isValid() && this.numberOfPeople.isValid()) {
            return true;
        } else {
            return false;
        }
    }
    //Method to return output values
    showOutput() {
        let billPerPerson = this.bill.value/this.numberOfPeople.value;
        let tipPerPerson = (this.tip.value/100)*billPerPerson;
        let totalPerPerson = billPerPerson + tipPerPerson;
  
        tipPerPerson = "$"+tipPerPerson.toFixed(2);
        totalPerPerson = "$"+totalPerPerson.toFixed(2);

        return {'tipPerPerson': tipPerPerson, 'totalPerPerson': totalPerPerson};
    }
    //Method to reset output values
    resetOutput() {
        return {'tipPerPerson': "", 'totalPerPerson': ""};
    }
}

//Validation class that describes validation methods
class Validation {
    //Constructor for Validation class
    constructor(value) {
        this.value = value;
    }
    //Method to check that field is not empty
    isNotEmpty() {
        if(this.value == "") {
            return false;
        } else {
            return true;
        }
    }
    //Method to check that field value is not negative
    isNotNegative() {
        if(this.value < 0) {
            return false;
        } else {
            return true;
        }
    }
    //Method to check that field value is less than 100
    isLessThanHundred() {
        if(this.value > 100) {
            return false;
        } else {
            return true;
        }
    }
    //Method to check that field value is not 0
    isNotZero() {
        if(this.value == 0) {
            return false;
        } else {
            return true;
        }
    }

    //Method to check that length of field value is less than 20
    lengthLessThanTwenty() {
        if(this.value.length < 20) {
            return true;
        } else {
            return false;
        }
    }
}

//BillField that inherits Validation
class BillField extends Validation {
    constructor(value, errorElement) {
        super(value);
        this.errorElement = errorElement;
    }
    //Method to check that the field is valid 
    isValid() {
        if(this.isNotEmpty() && this.isNotNegative() && this.lengthLessThanTwenty()) {
            return true;
        } else {
            return false;
        }
    } 
    //Method to show errors
    showErrors() {
        if (this.isNotEmpty() == false) {
            showError(this.errorElement, "Invalid input.");
        } else if (this.isNotNegative() == false) {
            showError(this.errorElement, "Enter a positive value.");
        } else if (this.lengthLessThanTwenty() == false) {
            showError(this.errorElement, "Too long! Enter a valid value.");
        } else {
            showError(this.errorElement, "");
        }
    }
}

//TipField that inherits Validation
class TipField extends Validation {
    constructor(value, errorElement) {
        super(value);
        this.errorElement = errorElement;
    }
    //Method to check that the field is valid 
    isValid() {
        if(this.isNotEmpty() && this.isNotNegative() && this.isLessThanHundred()) {
            return true;
        } else {
            return false;
        }
    }
    //Method to show errors
    showErrors() {
        if (this.isNotEmpty() == false) {
            showError(this.errorElement, "Invalid input.");
        } else if (this.isNotNegative() == false) {
            showError(this.errorElement, "Enter a positive value.");
        } else if (this.isLessThanHundred() == false) {
            showError(this.errorElement, "Value should be less than 100.");
        } else {
            showError(this.errorElement, "");
        }
    }
}

//NumberOfPeopleField that inherits Validation
class NumberOfPeopleField extends Validation {
    constructor(value, errorElement) {
        super(value);
        this.errorElement = errorElement;
    }   
    //Method to check that the field is valid 
    isValid() {
        if (this.isNotEmpty() && this.isNotNegative() && this.isNotZero() && this.lengthLessThanTwenty()) {
            return true;
        } else {
            return false;
        }
    }
    //Method to show errors
    showErrors() {
        if (this.isNotEmpty() == false) {
            showError(this.errorElement, "Invalid input.");
        } else if (this.isNotNegative() == false) {
            showError(this.errorElement, "Enter a positive value.");
        } else if (this.isNotZero() == false) {
            showError(this.errorElement, "Value cannot be 0.");
        } else if (this.lengthLessThanTwenty() == false) {
            showError(this.errorElement, "Too long! Enter a valid value.");
        } else {
            showError(this.errorElement, "");
        }
    }
}

//Function to get values from form - create objects - display results
const showResult = () => {
    //Get values of form inputs
    billInputField = document.querySelector(".billField");
    tipInputField = document.querySelector(".tipField");
    numberOfPeopleInputField = document.querySelector(".numberOfPeopleField");

    bill = billInputField.value;
    tip = tipInputField.value;
    numberOfPeople = numberOfPeopleInputField.value;
    
    let billField = new BillField(bill,".billError");
    let tipField = new TipField(tip, ".tipError");
    let numberOfPeopleField= new NumberOfPeopleField(numberOfPeople, ".numberOfPeopleError");
    let form = new Form(billField, tipField, numberOfPeopleField);

    //Call the showErrors function on input
    billInputField.addEventListener('input', billField.showErrors());
    tipInputField.addEventListener('input', tipField.showErrors());
    numberOfPeopleInputField.addEventListener('input', numberOfPeopleField.showErrors());

    //Display result on screen
    let result = form.isValid() ? form.showOutput() : form.resetOutput();

    document.querySelector('.outputTip').innerHTML = result['tipPerPerson'];
    document.querySelector('.outputTotal').innerHTML = result['totalPerPerson'];

}

//Function that shows errors
let showError = (errorElement, message) => {
    document.querySelector(errorElement).innerHTML=message;
}

//decrement tip%
document.querySelector('.tip-decrement').addEventListener('click', () => {
    element = document.querySelector('.tipField');
    if(element.value != 0){
        element.value--;
    }
})

//increment tip%
document.querySelector('.tip-increment').addEventListener('click', () => {
    element = document.querySelector('.tipField');
    if(element.value != 100){
        element.value++;
    }
})

//decrement numberOfPeople
document.querySelector('.numberOfPeople-decrement').addEventListener('click', () => {
    element = document.querySelector('.numberOfPeopleField');
    if(element.value != 1){
        element.value--;
    }
})

//increment numberOfPeople
document.querySelector('.numberOfPeople-increment').addEventListener('click', () => {
    element = document.querySelector('.numberOfPeopleField');
    element.value++;
})


//Calls showResult function after every 100ms
setInterval(showResult, 100);