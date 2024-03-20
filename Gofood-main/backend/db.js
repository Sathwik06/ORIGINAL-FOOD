const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sathwik:Bitrabella%40143@cluster0.bphzmp0.mongodb.net/gofoodmern?retryWrites=true&w=majority';

module.exports = async function (callback) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("MongoDB connected successfully");

        // Fetch data from MongoDB collections
        const fetchedData = await mongoose.connection.db.collection("food_Items").find({}).toArray();
        const fetchedCategoryData = await mongoose.connection.db.collection("foodCategories").find({}).toArray();

        // Uncomment the lines below to display fetched data in the terminal
        // console.log("Fetched Food Items:", fetchedData);
        // console.log("Fetched Food Categories:", fetchedCategoryData);

        // Assign fetched data to global variables
        callback(null, fetchedData, fetchedCategoryData);
    } catch (error) {
        console.error("Error fetching data:", error);
        callback(error, null, null);
    }
};
