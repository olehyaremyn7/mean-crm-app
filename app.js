const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const AuthorizationRouter = require('./routes/authorization.routes');
const AnalyticsRouter = require('./routes/analytics.routes');
const OrderRouter = require('./routes/order.routes');
const CategoryRouter = require('./routes/category.routes');
const PositionRouter = require('./routes/position.routes');

const app = express();

app.use(passport.initialize());
require('./middleware/passport.middleware')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/authorization', AuthorizationRouter);
app.use('/api/analytics', AnalyticsRouter);
app.use('/api/order', OrderRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/position', PositionRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app;


