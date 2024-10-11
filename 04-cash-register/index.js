let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
];

const cash = document.getElementById('cash');
const change = document.getElementById('change-due');
const purchase = document.getElementById('purchase-btn');

let currencyUnit = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100],
];

purchase.addEventListener('click', () => {
  const cashProvided = parseFloat(cash.value);
  const changeDue = cashProvided - price;

  if (cashProvided < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  if (cashProvided === price) {
    change.textContent = `No change due - customer paid with exact cash`;
    return;
  }

  const changeResult = getChange(changeDue, cid);

  if (
    changeResult.status === 'INSUFFICIENT_FUNDS' ||
    changeResult.status === 'CLOSED'
  ) {
    change.textContent = `Status: ${changeResult.status} ${formatChange(
      changeResult.change
    )}`;
  } else {
    let changeText = `Status: OPEN ${formatChange(changeResult.change)}`;
    change.textContent = changeText.trim();
  }
});

const getChange = (changeDue, cid) => {
  let totalCid = parseFloat(
    cid.reduce((acc, [_, curr]) => acc + curr, 0)
  ).toFixed(2);

  if (totalCid < changeDue) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  if (changeDue == totalCid) {
    return {
      status: 'CLOSED',
      change: cid.filter(([_, amount]) => amount > 0).reverse(),
    };
  }

  let changeArray = [];
  let remainingChange = changeDue;
  for (let i = currencyUnit.length - 1; i >= 0; i--) {
    let unit = currencyUnit[i][0];
    let unitValue = currencyUnit[i][1];
    let unitInDrawer = cid[i][1];

    if (unitValue <= remainingChange && unitInDrawer > 0) {
      let amountFromUnit = 0;

      while (remainingChange >= unitValue && unitInDrawer > 0) {
        amountFromUnit += unitValue;
        unitInDrawer -= unitValue;
        remainingChange = (remainingChange - unitValue).toFixed(2);
      }

      if (amountFromUnit > 0) {
        changeArray.push([unit, amountFromUnit]);
      }
    }
  }

  if (remainingChange > 0) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }

  return { status: 'OPEN', change: changeArray };
};

const formatChange = (changeArray) =>
  changeArray
    .filter(([unit, amount]) => amount > 0)
    .map(([unit, amount]) => `${unit}: $${parseFloat(amount.toFixed(2))}`)
    .join(' ');
