const faker = require('faker');

const db = require('../config/connection');
const { Drug, User } = require('../models');

db.once('open', async () => {
  await Drug.remove({});
  await User.remove({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const password = faker.internet.password();

    userData.push({ username, password });
  }

  const createdUsers = await User.collection.insert(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
  }

  // create drugs
  let createdDrugs = [];
  for (let i = 0; i < 100; i += 1) {
    const name = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const drug_name = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdDrug = await Drug.create({ name, drug_name, dosage, frequency, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { drugs: createdDrug._id } }
    );

    createdDrugs.push(createdDrug);
  }

 

  console.log('all done!');
  process.exit(0);
});
