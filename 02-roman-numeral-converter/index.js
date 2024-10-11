function convertToRoman(num) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  let result = '';

  romanNumerals.forEach((item) => {
    while (num >= item.value) {
      result += item.numeral;
      num -= item.value;
    }
  });

  return result;
}

function validateInput(input) {
  if (input === '') return 'Please enter a valid number';

  if (input < 0) return 'Please enter a number greater than or equal to 1';

  if (input > 3999) return 'Please enter a number less than or equal to 3999';

  return false;
}

document.getElementById('roman-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const number = document.getElementById('number').value;

  const validationMessage = validateInput(number);
  if (validationMessage) {
    document.getElementById('output').textContent = validationMessage;
    return;
  }

  document.getElementById('output').textContent = convertToRoman(number);
});
