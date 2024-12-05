const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');


const routesIndex = [
    {
        path: '/auth/v1',
        route: authRoute
    },
    {
        path: '/admin',
        route: adminRoute
    }
]


routesIndex.forEach((item) => router.use(item.path, item.route))


module.exports = router;