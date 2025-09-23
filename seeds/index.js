const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


//mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

//mongoose error handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YUOR USER ID
            author: '68c3064cb646d056f5fbce33',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, exercitationem repellendus illum quo, mollitia consequatur pariatur nostrum perspiciatis quas saepe repellat. Ad eius aliquam voluptatum reprehenderit voluptatem, aut odit! Ipsam?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmqyo7y6k/image/upload/v1757977343/YelpCamp/ob12cfrliqtlppxeznda.jpg',
                    filename: 'YelpCamp/ob12cfrliqtlppxeznda'
                },
                {
                    url: 'https://res.cloudinary.com/dmqyo7y6k/image/upload/v1757977343/YelpCamp/obxgxmyj2oacrjwcnqfq.jpg',
                    filename: 'YelpCamp/obxgxmyj2oacrjwcnqfq'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})