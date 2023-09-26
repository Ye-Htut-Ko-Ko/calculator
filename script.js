let current_input = document.getElementById("active_input");
let sign = document.getElementById("sign");
let history = document.getElementById("history");
let buttons = document.querySelectorAll("button");
var reg_num = /^\d+$/;

function doOperation(num1, num2) {
  switch (sign.value) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "×":
      return num1 * num2;
      break;
    case "÷":
      return num1 / num2;
      break;
    case "%":
      return (num1 / 100) * num2;
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let input_char = button.innerText;
    // console.log(input_char);
    if (input_char === ".") {
      current_input.value += input_char;
    } else if (input_char === "Del") {
      current_input.value = current_input.value.slice(0, -1);
    } else if (input_char === "C") {
      current_input.value = "";
      sign.value = "";
      history.value = "";
    } else if (reg_num.test(input_char)) {
      current_input.value += input_char;
    } else if (input_char === "=") {
      //  make operation
      if (sign.value && history.value && current_input.value) {
        let num1 = parseFloat(history.value);
        let num2 = parseFloat(current_input.value);
        current_input.value = doOperation(num1, num2);
        history.value = "";
        sign.value = "";
      }
    } else {
      if (sign.value === "") {
        history.value = current_input.value;
        current_input.value = "";
        sign.value = input_char;
      } else if (sign.value && current_input.value === "") {
        sign.value = input_char;
      } else if (sign.value && current_input.value !== "") {
        // make the operation
        // put the result on history
        // put new sign
        // wait for more input
        let num1 = parseFloat(history.value);
        let num2 = parseFloat(current_input.value);
        history.value = doOperation(num1, num2);
        sign.value = input_char;
        current_input.value = "";
      }
    }
  });
});
