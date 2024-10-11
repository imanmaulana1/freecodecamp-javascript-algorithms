document.getElementById('check-btn').addEventListener('click', () => {
  let text = document.getElementById('text-input').value;
  let result = document.getElementById('result');

  const sanitizeInput = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const reverseInput = sanitizeInput.split('').reverse().join('');

  if (!sanitizeInput) {
    alert('Please enter some text');
    return;
  }

  const isPalindrome = sanitizeInput === reverseInput;

  const resultText = isPalindrome
    ? `${text} is a <span class="green">palindrome</span>`
    : `${text} is <span class="red">not a palindrome</span>`;

  result.innerHTML = resultText;
});
