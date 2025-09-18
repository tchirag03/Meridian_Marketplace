import User from '../models/user.model.js';

export const getMyProfile = async (req, res) => {
    try {
      
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send('Server Error');
    }
};


export const updateMyProfile = async (req, res) => {
    try {
        const { name, location, phoneNumber } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (location) updateFields.location = location;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            message: 'Profile updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Server Error');
    }
};