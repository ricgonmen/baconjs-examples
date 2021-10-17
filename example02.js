Bacon = require("baconjs");

// Scan https://github.com/baconjs/bacon.js/tree/1.0.0#observable-scan
Bacon.fromArray([1, 2, 3, 4])
  .scan(0, (acc, val) => acc + val)
  .log();

// Reduce / Fold https://github.com/baconjs/bacon.js/tree/1.0.0#observable-fold
Bacon.fromArray([1, 2, 3, 4])
  .reduce(0, (acc, val) => acc + val)
  .log();
Bacon.fromArray([1, 2, 3, 4])
  .fold(0, (acc, val) => acc + val)
  .log();

// Map https://github.com/baconjs/bacon.js/tree/1.0.0#observable-map
Bacon.fromArray([1, 2, 3, 4])
  .map((x) => x * 2)
  .log();

// Skip / Take https://github.com/baconjs/bacon.js/tree/1.0.0#observable-skip
Bacon.fromArray([1, 2, 3, 4]).skip(1).take(2).log();

// Filter https://github.com/baconjs/bacon.js/tree/1.0.0#observable-filter
Bacon.fromArray([1, 2, 3, 4])
  .filter((x) => x < 3)
  .log();

// Flatmap https://github.com/baconjs/bacon.js/tree/1.0.0#observable-flatmap
Bacon.fromArray([
  ["John Doe", 28],
  ["Jane Doe", 27],
])
  .flatMap(Bacon.fromArray)
  .onValue((person) => console.log(person));
