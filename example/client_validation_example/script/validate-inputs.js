const form = document.getElementById('form');
const username = document.getElementById('name');
const properties = document.getElementById('eigenschaften');
const password = document.getElementById('passwort');
const colors = document.getElementsByName('extra');
const genders = document.getElementsByName('gender');



// Show input error message
function showError(input, message) {
  console.log(message);
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  console.log(`${getFieldName(input)} is valid`);
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} muss mindestens ${min} Zeichen lang sein`
    );
  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} darf höchstens ${max}  Zeichen lang sein`
    );
  } else {
    showSuccess(input);
  }
}

function checkBoxes(inputArr, min, max) {
  var counter = 0;
  inputArr.forEach(function(color){
    if(color.checked){
      counter += 1;
    }
  });
  if(counter > max) {
    showError(
      inputArr[0],
      `Maximal ${max} Feld/Felder darf/dürfen angeklickt sein`
  );
  }
  else if (counter < min) {
    showError(
      inputArr[0],
      `Mindestens ${min} Feld/Felder muss/müssen angeklickt sein`
  );
  }
  else{
    showSuccess(inputArr[0]);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
  if(!checkRequired([username, properties, password])){
 
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(properties, 30, 100);
    checkBoxes(colors, 2, 4);
    checkBoxes(genders, 1, 1);
  }
}


// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});