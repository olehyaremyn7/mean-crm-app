const moment = require('moment');
const error = require('../utils/error-handler.utils');
const Order = require('../models/Order');

function getMap(orders = []) {
    const daysOrders = {};
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');

        if (date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }

        daysOrders[date].push(order);
    });

    return daysOrders
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderCost = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        }, 0)
        return total += orderCost
    }, 0)
}

module.exports.overviewController = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user.id }).sort({ date: 1 })
        const daysMap = getMap(orders);
        const yesterdayOrders = daysMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

        // yesterday's orders
        const yesterdayOrdersAmount = yesterdayOrders.length

        // orders quantity
        const totalOrders = orders.length

        // days amount
        const daysAmount = Object.keys(daysMap).length

        // amount of orders per day
        const ordersPerDay = (totalOrders / daysAmount).toFixed(0);

        // percentage for the amount of orders
        // Formula: (( yesterday's orders / number of daily orders ) - 1 ) * 100
        const ordersPercent = ((( yesterdayOrdersAmount / ordersPerDay) - 1) * 100).toFixed(2);

        // total revenue
        const totalRevenue = calculatePrice(orders);

        // Per day revenue
        const revenuePerDay = totalRevenue / daysAmount

        // yesterday revenue
        const yesterdayRevenue = calculatePrice(yesterdayOrders);

        // Percentage revenue
        const revenuePercentage = ((( yesterdayRevenue / revenuePerDay ) - 1) * 100).toFixed(2);

        // revenue comparison
        const revenueCompare = ( yesterdayRevenue - revenuePerDay ).toFixed(2);

        // orders amount comparison
        const orderCompare = ( yesterdayOrdersAmount - ordersPerDay ).toFixed(2);

        res.status(200).json({
            revenue: {
                percent: Math.abs(+revenuePercentage),
                compare: Math.abs(+revenueCompare),
                yesterday: +yesterdayRevenue,
                isHigher: +revenuePercentage > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+orderCompare),
                yesterday: +yesterdayOrdersAmount,
                isHigher: +ordersPercent > 0
            }
        })

    } catch (e) {
        error(res, e);
    }
};

module.exports.analyticsController = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user.id }).sort({ date: 1 })
        const daysMap = getMap(orders);

        const average = +(calculatePrice(orders) / Object.keys(daysMap).length).toFixed(2);

        const chart = Object.keys(daysMap).map(label => {
            // label == Date
            const revenue = calculatePrice(daysMap[label])
            const orders = daysMap[label].length
            return {
                label,
                orders,
                revenue
            }
        })

        res.status(200).json({
            average,
            chart
        })

    } catch (e) {
        error(res, e);
    }
};
