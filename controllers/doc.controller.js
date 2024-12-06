const {
    Document
} = require('../models/documents');

const docController = {
    async registerUser(req, res, next) {
        try {
            const { username } = req.body;

            // Check User exit's or not already

            const userExists = await Document.findOne({
                username
            });

            if (!userExists) {
                const newUser = new Document({
                    username: username
                });
                await newUser.save();
                res.status(201).json({
                    status: true,
                    message: 'User registered successfully'
                });

            } else {
                throw new Error("User already exists")
            }

        } catch (error) {
            next(error);
        }
    },
    async getUser(req, res, next) {
        try {
            const user = await Document.find({});
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'User not found'
                });
            }
            res.json({
                status: true,
                user
            });

        } catch (error) {
            next(error);
        }
    },
    async addDocument(req, res, next) {
        try{
            const {username, name, url} = req.body;
            const user = await Document.findOneAndUpdate(
                { username },
                { $push: { documents: { name, url } } },
                { new: true }
            )

            if(!user){
                throw new Error("User not found")
            }

            res.status(200).json({
                status: true,
                message: 'Document added successfully',
                user
            });


        }catch(error){
            next(error);
        }
    },
    async removeDocument(req, res, next){
        try{
            const {username, documentId} = req.body;
            const user = await Document.findOneAndUpdate(
                { username },
                { $pull: { documents: { _id: documentId } } },
                { new: true }
            )
            if(!user){
                throw new Error("User not found")
            }
            res.status(200).json({
                status: true,
                message: 'Document removed successfully',
                user
            });
            
        }catch(error){
            next(error);
        }
    }
}

module.exports = docController