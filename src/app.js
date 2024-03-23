const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbname = "sefdb";

mongoClient.connect(connectionUrl, async (error, res1) => {
  if (error) {
    return console.log("error has occured");
  }
  console.log("All Perf");

  const db = res1.db(dbname);

  //insertOne  2

  await db.collection("users").insertOne(
    {
      name: "manhal",
      age: 29,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data");
      }
    }
  );

  await db.collection("users").insertOne(
    {
      name: "islam",
      age: 27,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data");
      }
      // console.log(data.insertedId)
    }
  );

  // insertMany 10   5 of them have the same age 27 y

  await db.collection("users").insertMany(
    [
      {
        name: "test1",
        age: 27,
      },
      {
        name: "test2",
        age: 27,
      },
      {
        name: "test3",
        age: 27,
      },
      {
        name: "test4",
        age: 27,
      },
      {
        name: "test5",
        age: 27,
      },
      {
        name: "shika",
        age: 24,
      },
      {
        name: "mahmoud",
        age: 24,
      },
      {
        name: "esraa",
        age: 24,
      },
      {
        name: "aya",
        age: 31,
      },
      {
        name: "ali",
        age: 31,
      },
    ],
    (error, data) => {
      if (error) {
        console.log("Unable to insert data");
      }
    }
  );

  //  find   match  27 y

  await db
    .collection("users")
    .find({ age: 27 })
    .toArray((error, user) => {
      if (error) {
        console.log("Unable to insert data");
      }
      console.log(user);
    });

  //   limit first 3    27y

  await db
    .collection("users")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, user) => {
      if (error) {
        console.log("Unable to insert data");
      }
      console.log("limit3", user);
    });

  //    $set name for the first 4
  var ids = await db
    .collection("users")
    .find({})
    .limit(4)
    .map(function (doc) {
      return doc._id;
    });
  ids.forEach((id) => {
    db.collection("users").updateOne(
      { _id: id },
      { $set: { name: "edited name" } }
    );
  });

  //  $inc age for the first 4

  ids = db
    .collection("users")
    .find({})
    .limit(4)
    .map(function (doc) {
      return doc._id;
    });
  ids.forEach(async (id) => {
    await db.collection("users").updateOne({ _id: id }, { $inc: { age: 2 } });
  });

  // // //  updateone for 1  inc age 5
  ids = db
    .collection("users")
    .find({})
    .limit(1)
    .map(function (doc) {
      return doc._id;
    });
  ids.forEach(async (id) => {
    db.collection("users").updateOne({ _id: id }, { $inc: { age: 5 } });
  });

  // updateMany  inc age 10
  db.collection("users").updateMany({}, { $inc: { age: 10 } });

  //   deleteMany  age 41
  db.collection("users").deleteMany({ age: 41 });
});
