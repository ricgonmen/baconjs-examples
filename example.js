const isEmpty = (s) => s.length === 0;

const always = (value) => () => value;

const keyCodeIs = (keyCode) => (event) => event.keyCode === keyCode;

function keyDownEvents(keyCode) {
  return Bacon.fromEvent(document, "keydown").filter(keyCodeIs(keyCode));
}

function keyUpEvents(keyCode) {
  return Bacon.fromEvent(document, "keyup").filter(keyCodeIs(keyCode));
}

function keyStateProperty(keyCode) {
  return keyDownEvents(keyCode)
    .map(always("DOWN"))
    .merge(keyUpEvents(keyCode).map(always("UP")))
    .toProperty("UP");
}

// Simple click example
Bacon.fromEvent(document.querySelector("#clikme"), "click").subscribe(function (
  event
) {
  alert("mmmm... bacon!");
});

// Combinators example
keyStateProperty(32)
  .log()
  .onValue(
    (value) => (document.querySelector("#spacebar-value").textContent = value)
  );

// Enable/disable example
Bacon.fromEvent(document.querySelector("#enabling input"), "keyup")
  .map((event) => event.target.value)
  .toProperty("")
  .map(isEmpty)
  .onValue(
    (empty) => (document.querySelector("#enabling button").disabled = empty)
  );

// Echo example
Bacon.fromEvent(document.querySelector("#echo input"), "keyup")
  .map((event) => event.target.value)
  .onValue(
    (text) => (document.querySelector("#echo .output").textContent = text)
  );

// Combination lock example
function elementValueAsProperty(el) {
  return Bacon.fromEvent(el, "change")
    .map(() => el.value)
    .toProperty(el.value);
}

const selectElements = Array.from(document.querySelectorAll("#combo select"));
const selectElementValuesAsProperties = selectElements.map(
  elementValueAsProperty
);
const currentCombination = Bacon.combineAsArray(
  selectElementValuesAsProperties
);
const currentComboString = currentCombination.map((values) => values.join(""));
currentComboString.log("currentCombo");

const isCorrectCombination = currentComboString.map(
  (combination) => combination === "180"
);
isCorrectCombination
  .not()
  .onValue(
    (incorrect) =>
      (document.querySelector("#combo button").disabled = incorrect)
  );
Bacon.fromEvent(document.querySelector("#combo button"), "click")
  .filter(isCorrectCombination)
  .onValue(
    () =>
      (document.querySelector("#combo .vault-contents").style.display = "block")
  );

// Strikeout (skip/take) example
function strikeout() {
  document.querySelector("#batter-up .ump-call").textContent =
    "Strike three, you're out!";
}

Bacon.fromEvent(document.querySelector("#batter-up button"), "click")
  .skip(2)
  .take(1)
  .onValue(strikeout);
