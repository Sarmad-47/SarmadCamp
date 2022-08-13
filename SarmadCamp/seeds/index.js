const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/sarmad-camp', {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62f64abfe4f45bbcaec48b62',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tempore, maxime magni alias incidunt voluptate recusandae modi iure quaerat minima nam natus vitae suscipit vel, amet officiis commodi illum laboriosam!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude,
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/sarmad-47/image/upload/v1660308201/SarmadCamp/ttxvppbdclgocjjpoouv.jpg',
                    filename: 'SarmadCamp/ttxvppbdclgocjjpoouv',

                },
                {
                    url: 'https://res.cloudinary.com/sarmad-47/image/upload/v1660308193/SarmadCamp/ctbzyn1l5yue6smjns69.jpg',
                    filename: 'SarmadCamp/ctbzyn1l5yue6smjns69',

                },
                {
                    url: 'https://res.cloudinary.com/sarmad-47/image/upload/v1660308198/SarmadCamp/hfwuqlk3llkwqadmhgug.jpg',
                    filename: 'SarmadCamp/hfwuqlk3llkwqadmhgug',

                },

            ],
        })
        await camp.save();
    }


}

seedDB().then(() => {
    mongoose.connection.close();
});