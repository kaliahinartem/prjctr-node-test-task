const database = {
  getUser: (id) =>
    new Promise((resolve, reject) => {
      {
        const users = [
          {
            id: 1,
            name: "Robert",
          },
          {
            id: 2,
            name: "John",
          },
        ];

        const user = users.find((user) => user.id === id);
        if (!user) {
          reject(`User with id=${id} not found`);
        } else {
          resolve(user);
        }
      }
    }),
  getUsersBook: (userId) =>
    new Promise((resolve, reject) => {
      const usersBooks = {
        1: [],
        2: [1, 2],
      };

      const userBook = usersBooks[userId];

      if (!userBook) {
        reject(`Set of books related to userId=${userId} not found`);
      } else {
        resolve(userBook);
      }
    }),

  buyBook: (id) =>
    new Promise((resolve, reject) => {
      const books = [
        {
          id: 1,
          name: "Art of war",
        },
        {
          id: 2,
          name: "Hunger games",
        },
        {
          id: 3,
          name: "1984",
        },
      ];

      const book = books.find((book) => book.id === id);

      if (!book) {
        reject(`Book with id=${id} not found`);
      } else {
        resolve(true);
      }
    }),
};

const buyBookForUser = async (bookId, userId, callback) => {
  try {
    const user = await database.getUser(userId);
    const userBooks = await database.getUsersBook(user.id);

    if (userBooks.includes(bookId)) {
      throw `User already has book with id=${bookId}`;
    }

    await database.buyBook(bookId);

    callback(null, "Success");
  } catch (error) {
    callback(error);
  }
};

(async () => {
  // use async/await to preserve order of logging

  await buyBookForUser(1, 1, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  await buyBookForUser(1, 2, (err, message) => {
    console.log(err); // 'User already has book with id=1'
    console.log(message); // undefined
  });

  await buyBookForUser(3, 2, (err, message) => {
    console.log(err); // null
    console.log(message); // 'Success'
  });

  await buyBookForUser(5, 2, (err, message) => {
    console.log(err); // 'Book with id=5 not found'
    console.log(message); // undefined
  });

  await buyBookForUser(1, 3, (err, message) => {
    console.log(err); // 'User with id=3 not found'
    console.log(message); // undefined
  });
})();
