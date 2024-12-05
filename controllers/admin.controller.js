const { adminService } = require('../services');
const { Blog } = require('../models/blog');
require('dotenv').config();

const authController = {
    async addBlog(req, res, next) {
        try {
            const {
                categoryName,
                content,
                description,
                extraTags,
                heading,
                metaDescription,
                metaKeywords,
                postBy,
                tfnFooter,
                tfnHeader,
                tfnPopup,
                title,
                titleUrl
            } = req.body;

            const newBlog = new Blog({
                categoryName,
                content,
                description,
                extraTags,
                heading,
                metaDescription,
                metaKeywords,
                postBy,
                tfnFooter,
                tfnHeader,
                tfnPopup,
                title,
                titleUrl
            });
            const savedBlog = await newBlog.save();
            res.status(201).json({
                message: 'Blog created successfully!',
                status: true,
                blog: savedBlog
            });
        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    },
    async getBlogs(req, res, next) {
        try {
            const blogs = await Blog.find();
            res.status(200).json({
                message: 'Blogs fetched successfully!',
                status: true,
                blogs
            });
        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    },
    async updateBlog(req, res, next) {
        try {
            const {
                categoryName,
                content,
                description,
                extraTags,
                heading,
                metaDescription,
                metaKeywords,
                postBy,
                tfnFooter,
                tfnHeader,
                tfnPopup,
                title,
                titleUrl
            } = req.body;
            const blog = await Blog.findByIdAndUpdate(req.params.id, {
                categoryName,
                content,
                description,
                extraTags,
                heading,
                metaDescription,
                metaKeywords,
                postBy,
                tfnFooter,
                tfnHeader,
                tfnPopup,
                title,
                titleUrl
            }, { new: true });
            res.status(200).json({
                message: 'Blog updated successfully!',
                status: true,
                blog
            });
        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    },
    async deleteBlog(req, res, next) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Blog deleted successfully!',
                status: true,
                blog
            });
        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    },
    async getSpecifiedBlogs(req, res, next) {
        try {
            const blog = await Blog.findOne({ _id: req.params.id });
            res.status(200).json({
                message: 'Blogs fetched successfully!',
                status: true,
                blog
            });

        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }

}

module.exports = authController;