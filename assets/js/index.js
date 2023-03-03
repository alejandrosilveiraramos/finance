// Retrieve data from local storage when the page loads
window.addEventListener('load', () => {
  const formData = JSON.parse(localStorage.getItem('formData')) || [];
  for (const data of formData) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${data.fdescription}</td>
      <td>$ ${data.fvalue}</td>
      <td>${data.fdate}</td>
      <td>
        <button class="delete-btn">
          <span class="material-symbols-outlined"> cancel </span>
        </button>
      </td>`;
    financeTable.appendChild(newRow);
  }

  // Bind delete button click event to all rows in the finance table
  const deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (event) => {
      const row = event.target.closest('tr');
      const rowIndex = Array.from(financeTable.rows).indexOf(row);
      financeTable.deleteRow(rowIndex);
      formData.splice(rowIndex - 1, 1);
      localStorage.setItem('formData', JSON.stringify(formData));
    });
  });
});


// Getting the reference of the Table and Form

const operatorForm = document.querySelector('#operator-form');
const financeTable = document.querySelector('#finance-table');

operatorForm.addEventListener('submit', (event) => {

  //Prevent the forms from actually submiting
  event.preventDefault();
  // Get input values
  const fdescription = document.querySelector('#fdescription').value;
  const fvalue = document.querySelector('#fvalue').value;
  const fdate = document.querySelector('#fdate').value;

  //Create a new row for the table with the input values 
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${fdescription}</td>
    <td>$ ${fvalue}</td>
    <td>${fdate}</td>
    <td>
    <button class="delete-btn">
      <span class="material-symbols-outlined"> cancel </span>
    </button>
    </td>`;

  //Add a new row to the table
  financeTable.appendChild(newRow);

  //Store a new data in local storage
  const data = { fdescription, fvalue, fdate };

  const formData = JSON.parse(localStorage.getItem('formData')) || [];
  formData.push(data)

  localStorage.setItem('formData', JSON.stringify(formData));

  operatorForm.reset();

  //Delete button 
  const deleteBtn = newRow.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', (event) => {
    const rowId = event.target.closest('tr').id;
    const rowIndex = formData.findIndex(data => JSON.stringify(data) === JSON.stringify(formData[rowId]));
    financeTable.deleteRow(rowIndex);
    formData.splice(rowIndex, 1);
    localStorage.setItem('formData', JSON.stringify(formData));
  });

});

