function telephoneCheck(str) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  return regex.test(str);
}

document
  .getElementById('telephone-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value.trim();

    if (userInput === '') {
      alert('Please provide a phone number');
    }

    const result = document.getElementById('results-div');
    if (telephoneCheck(userInput)) {
      result.textContent = `Valid US number: ${userInput}`;
      result.style.backgroundColor = 'green';
    } else {
      result.textContent = `Invalid US number: ${userInput}`;
      result.style.backgroundColor = 'red';
    }
  });

function clearInput() {
  document.getElementById('user-input').value = '';
  document.getElementById('results-div').textContent = '';
}

document.getElementById('clear-btn').addEventListener('click', clearInput);
