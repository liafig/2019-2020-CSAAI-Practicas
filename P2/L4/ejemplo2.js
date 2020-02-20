console.log("Ejecutando js");

const test = document.getElementById("test")

test.onclick = () => {
    console.log("Click!!");
    if (test.style.backgroundColor == "") {
      test.style.backgroundColor = "yellow";
    }
    else {
      test.style.backgroundColor = "";
    }

  }
