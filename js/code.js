// Author: David Martínez Merencio

document.getElementById("bSubmit").onclick = function() {
  console.log("Checking fields...");
  if (validateMail(document.getElementById("mailSignup").value)) {
    console.log("Correct mail");
  } else {
    console.log("Incorrect mail");
  }
  if (validateDni(document.getElementById("dni").value)) {
    console.log("Correct DNI");
  } else {
    console.log("Incorrect DNI");
  }
  if (validateIban(document.getElementById("iban").value)) {
    console.log("Correct IBAN");
  } else {
    console.log("Incorrect IBAN");
  }
}

function validateMail(mail) {
  return mail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function validateDni(dni) {
  let letter = dni.substr(dni.length-1,1);
  let number = dni.substr(0,dni.length-1) % 23;
  let lettersList='TRWAGMYFPDXBNJZSQVHLCKET';

  return dni.match(/^\d{8}[a-zA-Z]$/) &&
    lettersList.substring(number,
    number+1) == letter.toUpperCase();
}

function validateIban(iban) {
  let newIban = iban.toUpperCase(),
      modulo = function(divident, divisor) {
        let cDivident = '';
        let cRest = '';
  
        for (let i in divident) {
          let cChar = divident[i];
          let cOperator = cRest + '' + cDivident + '' + cChar;
  
          if (cOperator < parseInt(divisor)) {
            cDivident += '' + cChar;
          } else {
            cRest = cOperator % divisor;
            if (cRest == 0) {
              cRest = '';
            }
            cDivident = '';
          }
  
        }
        cRest += '' + cDivident;
        if (cRest == '') {
          cRest = 0;
        }
        return cRest;
      };
  
    if (newIban.search(/^[A-Z]{2}/gi) < 0) {
      return false;
    }
  
    newIban = newIban.substring(4) + newIban.substring(0, 4);
  
    newIban = newIban.replace(/[A-Z]/g, function(match) {
      return match.charCodeAt(0) - 55;
    });
  
    return parseInt(modulo(newIban, 97), 10) === 1;
  }
//   console.log(validateIBAN("ES3001829947919998897258"));

