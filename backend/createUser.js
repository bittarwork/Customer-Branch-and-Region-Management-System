const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/RQTalEsh', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const createSuperUser = async () => {
    try {
        const superUser = new User({
            name: 'Super Admin',
            email: 'superadmin@example.com',
            password: 'SuperStrongPassword123',
            role: 'superadmin',
        });

        await superUser.save();
        console.log('Superuser created successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating superuser:', error);
        mongoose.connection.close();
    }
};

createSuperUser();
