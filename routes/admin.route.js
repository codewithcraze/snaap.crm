const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const adminController = require('../controllers/admin.controller');

router.post('/add-blog', adminController.addBlog);
router.get('/get-blogs', adminController.getBlogs);
router.get('/get-blogs/:id', adminController.getSpecifiedBlogs);
router.patch('/update-blog/:id', adminController.updateBlog);
router.delete('/delete-blog/:id', adminController.deleteBlog);

module.exports = router;
