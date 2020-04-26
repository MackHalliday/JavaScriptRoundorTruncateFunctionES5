// reference for roundToDecimal
// https://www.jacklmoore.com/notes/rounding-in-javascript/
function roundToDecimal(value, decimalsAllowed) {
  return Number(
    Math.round(value + "e" + decimalsAllowed) + "e-" + decimalsAllowed
  );
}
// truncation function that does not use toFixed, which can vary by browser
// and also does not use regex for readablity
// built off similar principles as round function above
function truncateToDecimal(num, decimalPlaceAllowed) {
  let numToTenthPlace = Number(num + "e" + decimalPlaceAllowed);
  if (num > 0) {
    return Number(Math.floor(numToTenthPlace) + "e-" + decimalPlaceAllowed);
  } else {
    return Number(Math.ceil(numToTenthPlace) + "e-" + decimalPlaceAllowed);
  }
}

function checkInput(num, min, max, decimalPlaceAllowed, isRounded) {
  return (
    typeof num === "number" &&
    typeof min === "number" &&
    typeof max === "number" &&
    typeof decimalPlaceAllowed === "number" &&
    typeof isRounded === "boolean"
  );
}

function setNumberToFixedDigit(num, min, max, decimalPlaceAllowed, isRounded) {
  // if you wanted user input validation
  let validInput = checkInput(num, min, max, decimalPlaceAllowed, isRounded);

  if (validInput) {
    if (num > max) {
      return max;
    } else if (num < min) {
      return min;
    }
    if (isRounded) {
      return roundToDecimal(num, decimalPlaceAllowed);
    }
    return truncateToDecimal(num, decimalPlaceAllowed);
  }
  return "invalid value input";
}

//  TESTING
// run test by refreshing the browswer on the right, all test should return true

// can round to nearest allowed decimal place
let test_1 = setNumberToFixedDigit(2.9657, 0, 100, 3, true);
let expected_value_1 = 2.966;
document.write(test_1 === expected_value_1);

// it can truncate number to digitsAllowedAfterDecimal if shouldRound set to false
// update to orginal test_2
let test_2 = setNumberToFixedDigit(2.9657, 0, 100, 3, false);
let expected_value_2 = 2.965;
document.write(test_2 === expected_value_2);

// will not round if digitsAllowedAfterDecimal is great than number of decimal places in num
let test_3 = setNumberToFixedDigit(2.9657, 0, 100, 6, true);
let expected_value_3 = 2.9657;
document.write(test_3 === expected_value_3);

// will return maxAllowed if maxAllowed is less than num
let test_4 = setNumberToFixedDigit(2.9657, 0, 1, 5, true);
let expected_value_4 = 1;
document.write(test_4 === expected_value_4);

// will return minAllowed if minAllowed is great than num
let test_5 = setNumberToFixedDigit(2.9657, 3, 100, 5, true);
let expected_value_5 = 3;
document.write(test_5 === expected_value_5);

// can round num if less than 1
let test_6 = setNumberToFixedDigit(0.9657, 0, 100, 3, true);
let expected_value_6 = 0.966;
document.write(test_6 === expected_value_6);

// can round num if negative
let test_7 = setNumberToFixedDigit(-2.9657, -3, 100, 3, true);
let expected_value_7 = -2.966;
document.write(test_7 === expected_value_7);

// num must be a float or integer
let test_8 = setNumberToFixedDigit("2.9657", -3, 100, 3, true);
let expected_value_8 = "invalid value input";
document.write(test_8 === expected_value_8);

// can truncate negative numbers
let test_9 = setNumberToFixedDigit(-2.9657, -3, 100, 2, false);
let expected_value_9 = -2.96;
document.write(test_9 === expected_value_9);

// can truncate a number less than 1
let test_10 = setNumberToFixedDigit(0.234001, 0, 100, 3, false);
let expected_value_10 = 0.234;
document.write(test_10 === expected_value_10);

// can truncate a number between -1 and zero
let test_11 = setNumberToFixedDigit(-0.9999999, -1, 100, 1, false);
let expected_value_11 = -0.9;
document.write(test_11 === expected_value_11);
