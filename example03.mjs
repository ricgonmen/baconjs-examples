import Bacon from "baconjs";
import fetch from "node-fetch";

// https://api.github.com/user/1

function getUsers1(pages, concurrency) {
  return Bacon.fromArray(
    Array(pages)
      .fill()
      .map((x, i) => i + 1)
  )
    .flatMapWithConcurrencyLimit(concurrency, (page) =>
      Bacon.fromPromise(
        fetch("https://api.github.com/user/" + page)
          .then((res) => res.json())
          .catch((error) => console.log(error))
      )
    )
    .fold([], (result, res) => result.concat(res))
    .flatMap(function (users) {
      users.sort((a, b) => a.followers > b.followers);
      return Bacon.fromArray(users);
    })
    .map(x => x.login);
    // .fold([], (array,value) => array + value);
}

getUsers1(5, 5).log();
