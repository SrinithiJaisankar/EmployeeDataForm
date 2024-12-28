const form = document.getElementById("form");
const employeeIdInput = document.getElementById("employeeId");
const nameInput = document.getElementById("Nameinput");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("Emailinput");
const addressInput = document.getElementById("address");
const genderInput = document.querySelector("select[name='gender']");
const addButton = document.getElementById("addBtn");
const saveButton = document.getElementById("saveBtn");
const cancelButton = document.getElementById("cancelBtn");
const editButton = document.getElementById("editBtn");
const deleteButton = document.getElementById("deleteBtn");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const addressError = document.getElementById("addressError");
const genderError = document.getElementById("genderError");
const optionEmpId = document.getElementById("optionEmpId");

let nextEmployeeId = 1;
const employeeData = [];

function initializeForm() {
  const input = [nameInput, phoneInput, emailInput, addressInput, genderInput];

  for (let i = 0; i < input.length; i++) {
    input[i].disabled = true;
  }

  saveButton.disabled = true;
  cancelButton.disabled = true;
  employeeIdInput.disabled = false;
  editButton.disabled = true;
  deleteButton.disabled = true;
  addButton.disabled = false;
}

function enableEditDeleteBtn() {
  if (employeeData.length > 0) {
    editButton.disabled = false;
    deleteButton.disabled = false;
  } else {
    editButton.disabled = true;
    deleteButton.disabled = true;
  }
}

function addEmployee() {
  const newEmpId = nextEmployeeId;
  form.reset();

  const option = document.createElement("option");
  option.value = newEmpId;
  option.textContent = newEmpId;
  employeeIdInput.appendChild(option);

  employeeIdInput.value = newEmpId;
  employeeIdInput.disabled = true;

  if (employeeIdInput.value) {
    optionEmpId.style.display = "none";
  }

  const input = [nameInput, phoneInput, emailInput, addressInput, genderInput];

  for (let i = 0; i < input.length; i++) {
    input[i].disabled = false;
  }

  saveButton.disabled = false;
  cancelButton.disabled = false;
  addButton.disabled = true;
  editButton.disabled = true;
  deleteButton.disabled = true;
}

function deleteEmployee() {
  const deleteEmpId = employeeIdInput.value;

  if (deleteEmpId == "0") {
    optionEmpId.style.display = "block";
    return;
  }

  if (confirm("Are you sure you want to delete?")) {
    const index = employeeData.findIndex((emp) => emp.id === deleteEmpId);

    if (index !== -1) {
      employeeData.splice(index, 1);

      for (let i = 0; i < employeeIdInput.options.length; i++) {
        if (employeeIdInput.options[i].value === deleteEmpId) {
          employeeIdInput.remove(i);
          break;
        }
      }

      alert("Employee details deleted successfully");
      form.reset();
      initializeForm();
      enableEditDeleteBtn();
    }
  }
}

function editEmployee() {
  const selectEmpId = employeeIdInput.value;

  if (selectEmpId == "0" || !selectEmpId) {
    optionEmpId.style.display = "block";
    return;
  }
  
  const selectedEmployee = employeeData.find((emp) => emp.id === selectEmpId);

  if (selectedEmployee) {
    nameInput.disabled = false;
    phoneInput.disabled = false;
    emailInput.disabled = false;
    addressInput.disabled = false;
    genderInput.disabled = false;
    saveButton.disabled = false;
    cancelButton.disabled = false;

    employeeIdInput.disabled = true;
    addButton.disabled = true;
    deleteButton.disabled = true;
    editButton.disabled = true;

    nameInput.value = selectedEmployee.name;
    phoneInput.value = selectedEmployee.phone;
    emailInput.value = selectedEmployee.email;
    addressInput.value = selectedEmployee.address;
    genderInput.value = selectedEmployee.gender;
  }
}

function validateInputs() {
  let isValid = true;

  if (!nameInput.value.trim()) {
    nameError.style.display = "block";
    nameError.textContent = "Name is required!";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  if (phoneInput.value.trim() === "") {
    phoneError.style.display = "block";
    phoneError.textContent = "Phone number is required!";
    isValid = false;
  } else if (!/^\d{10}$/.test(phoneInput.value)) {
    phoneError.style.display = "block";
    phoneError.textContent = "Phone number must be 10 digits!";
    isValid = false;
  } else {
    phoneError.style.display = "none";
  }

  if (emailInput.value.trim() === "") {
    emailError.style.display = "block";
    emailError.textContent = "Email is required!";
    isValid = false;
  } else if (
    !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)
  ) {
    emailError.style.display = "block";
    emailError.textContent = "Invalid email format!";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (!addressInput.value.trim()) {
    addressError.style.display = "block";
    addressError.textContent = "Address is required!";
    isValid = false;
  } else {
    addressError.style.display = "none";
  }

  if (!genderInput.value) {
    genderError.style.display = "block";
    isValid = false;
  } else {
    genderError.style.display = "none";
  }

  return isValid;
}

function saveEmployee(e) {
  if (validateInputs()) {
    const employeeDetails = {
      id: employeeIdInput.value,
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      address: addressInput.value.trim(),
      gender: genderInput.value,
    };

    let existingEmployee = employeeData.find(
      (emp) => emp.id === employeeIdInput.value
    );
    if (existingEmployee) {
      for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].id == employeeIdInput.value) {
          employeeData[i].name = nameInput.value.trim();
          employeeData[i].phone = phoneInput.value.trim();
          employeeData[i].email = emailInput.value.trim();
          employeeData[i].address = addressInput.value.trim();
          employeeData[i].gender = genderInput.value;

          break;
        }
      }

      alert("Details updated successfully");
    } else {
      employeeData.push(employeeDetails);
      alert("Details saved successfully");

      nextEmployeeId++;
    }

    form.reset();
    initializeForm();

    enableEditDeleteBtn();
  }
}

function cancelChanges(e) {
  if (confirm("Are you sure you want to cancel?")) {
    const tempIdOption = document.querySelector(
      `option[value='${nextEmployeeId}']`
    );
    if (tempIdOption) {
      document.querySelector(`option[value='${nextEmployeeId}']`).remove();
    }
    alert("Changes canceled!");
    form.reset();
    initializeForm();

    enableEditDeleteBtn();
    resetError();
  }
}

function resetError() {
  const errorMsg = document.querySelectorAll(".error");
  for (let i = 0; i < errorMsg.length; i++) {
    errorMsg[i].style.display = "none";
  }
}
function selectEmployee() {
  const selectedEmployee = employeeData.find(
    (emp) => emp.id === employeeIdInput.value
  );
  if (selectedEmployee) {
    nameInput.value = selectedEmployee.name;
    phoneInput.value = selectedEmployee.phone;
    emailInput.value = selectedEmployee.email;
    addressInput.value = selectedEmployee.address;
    genderInput.value = selectedEmployee.gender;
  } else {
    form.reset();
  }
  enableEditDeleteBtn();
}

function handlePhoneInput(event) {
  const value = event.target.value;
  const numericValue = value.replace(/\D/g, "");
  event.target.value = numericValue;
  hideErrorMessages();
}

function hideErrorMessages() {
  if (nameInput.value.trim()) {
    nameError.style.display = "none";
  }

  if (phoneInput.value.trim() && /^\d{10}$/.test(phoneInput.value)) {
    phoneError.style.display = "none";
  }

  if (
    emailInput.value.trim() &&
    /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)
  ) {
    emailError.style.display = "none";
  }

  if (addressInput.value.trim()) {
    addressError.style.display = "none";
  }

  if (genderInput.value) {
    genderError.style.display = "none";
  }

  if (employeeIdInput.value) {
    optionEmpId.style.display = "none";
  }
}

initializeForm();
