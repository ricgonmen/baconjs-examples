Bacon = require("baconjs");

// Delivers a single value
Bacon.once("hello bacon!").log();

// Fires an event for each element
Bacon.fromArray(["Hello", "Bacon", "!"]).log();

// Logs out an item every X ms until the end of the secuence
Bacon.sequentially(300, ["B", "A", "C", "O", "N"]).log();
Bacon.sequentially(350, ["b", "a", "c", "o", "n"]).onValue(x => console.log(x));

// Repeats every x ms the single value indefinitely  
Bacon.interval(6000, 'Bacon!').log();

// Repeats every x ms on value on the list and starts again indefinitely  
Bacon.repeatedly(2500, ['BACON!','MORE BACON!']).log();

// Produces the value after a delay ¿not working?
Bacon.later(4000,'Bacon time!');



