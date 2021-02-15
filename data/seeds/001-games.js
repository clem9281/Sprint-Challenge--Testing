
exports.seed = function (knex, Promise) {
  return knex('games').insert([
    {
      title: "Pacman",
      genre: "Arcade",
      releaseYear: 1980
    },
    {
      title: "Zelda",
      genre: "Action-Adventure",
      releaseYear: 1986
    },
    {
      title: "Final Fantasy",
      genre: "RPG",
      releaseYear: 1987
    }
  ])
};
