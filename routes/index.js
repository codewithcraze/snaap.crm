const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const adminRoute = require('./admin.route');
const docRoute = require('./doc.route');

const routesIndex = [
    {
        path: '/auth/v1',
        route: authRoute
    },
    {
        path: '/admin',
        route: adminRoute
    },
    {
        path: '/doc',
        route: docRoute
    }
]


routesIndex.forEach((item) => router.use(item.path, item.route))


module.exports = router;