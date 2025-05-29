const list = document.querySelector("#items");

const correctAnswers = {
  dad: { cup: "2b || !2b", drink: "кофе ☕" },
  mom: { cup: "React", drink: "молоко 🥛" },
  yar: { cup: "Java", drink: "чай 🍵" },
  kir: { cup: "Python", drink: "сок 🧃" },
};

function reset() {
  clearList();
  printList();
  const listItems = document.querySelectorAll("#items li");
  makeDraggable(listItems);
  resetTable();
}

function clearList() {
  list.innerHTML = "";
  console.log("clearList");
}

function printList() {
  function printGroup(group) {
    const values = [];

    for (let el in correctAnswers) {
      values.push(correctAnswers[el][group]);
    }

    mixArray(values);

    for (let value of values) {
      const li = document.createElement("li");
      li.setAttribute("class", "item");
      li.innerText = value;
      list.appendChild(li);
    }
  }

  printGroup("cup");
  printGroup("drink");
}

function mixArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
let draggedItem = null;

function makeDraggableItem(item) {
  item.setAttribute("draggable", "true");

  item.addEventListener("dragstart", (evt) => {
    evt.target.classList.add("selected");
    draggedItem = evt.target;
  });

  item.addEventListener("dragend", (evt) => {
    evt.target.classList.remove("selected");
    draggedItem = null;
  });
}

function makeDraggable(elements) {
  console.log(elements);
  for (const item of elements) {
    makeDraggableItem(item);
  }
}

const dropzones = document.querySelectorAll(".dropzone");

function setDropZone(zone) {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("drop-target");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drop-target");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drop-target");

    if (draggedItem) {
      const p = document.createElement("p");
      p.innerText = draggedItem.innerText;

      makeDraggableItem(p);

      zone.appendChild(p);
      draggedItem.remove();
      draggedItem = null;
    }
  });
}

for (const zone of dropzones) {
  setDropZone(zone);
}

function resetTable() {
  const cupRow = document.querySelectorAll("tr:nth-child(2) td");
  const drinkRow = document.querySelectorAll("tr:nth-child(3) td");

  [...cupRow, ...drinkRow].forEach((cell) => {
    cell.innerText = "";
    cell.style.backgroundColor = "";
  });
  console.log("resetTable");
}

reset();

function checkAnswers() {
  console.log(document.querySelector("tr:nth-child(2) td:nth-child(1)"));
  const keys = Object.keys(correctAnswers);

  keys.forEach((el, i) => {
    const cupCell = document.querySelector(
      `tr:nth-child(2) td:nth-of-type(${i + 1})`
    );
    const drinkCell = document.querySelector(
      `tr:nth-child(3) td:nth-of-type(${i + 1})`
    );

    const correctCup = correctAnswers[el].cup;
    const correctDrink = correctAnswers[el].drink;

    if (cupCell.innerText === correctCup) {
      cupCell.style.backgroundColor = "lightgreen";
    } else {
      cupCell.style.backgroundColor = "lightcoral";
    }

    if (drinkCell.innerText === correctDrink) {
      drinkCell.style.backgroundColor = "lightgreen";
    } else {
      drinkCell.style.backgroundColor = "lightcoral";
    }
  });
}

document.getElementById("check").addEventListener("click", checkAnswers);

document.getElementById("clear").addEventListener("click", reset);
