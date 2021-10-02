const express = require("express");
const { Order } = require("../models/orders");
const auth = require("../auth/auth");
const { OrderItem } = require("../models/order-item");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });
  const orderList = await Order.find()
    .populate("user", "name")
    .populate("orderItems");
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.get("/:id", async (req, res) => {
  const authResult = await auth(req, res, false);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(order);
});

router.post("/", async (req, res) => {
  const authResult = await auth(req, res, false);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemIdsResolve = await orderItemIds;
  const totalPrices = await Promise.all(
    orderItemIdsResolve.map(async (productId) => {
      const item = await OrderItem.findById(productId).populate(
        "product",
        "price"
      );
      const totalPrice = item.product.price * item.quantity;
      return totalPrice;
    })
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  let order = new Order({
    orderItems: orderItemIdsResolve,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();
  if (!order) {
    return res.status(400).send("Order create failes");
  }
  res.status(200).send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(404).send("Order Not found");
  }
  res.status(200).send(order);
});

router.delete("/:id", async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });
  const order = await Order.findById(req.params.id).populate("orderItems");
  if (!order) {
    res.status(500).json({
      success: false,
    });
  } else {
    let orderList = [];
    orderList = await order.orderItems.map((orderItemsb) => {
      if (!orderItemsb) {
        res.status(500).json({
          success: false,
        });
      } else {
        return orderItemsb._id;
      }
    });
    Order.findByIdAndRemove(req.params.id)
      .then((orderDelete) => {
        if (orderDelete) {
          orderList.map((eachOrder) => {
            OrderItem.findByIdAndRemove(eachOrder)
              .then((ord) => {
                console.log(eachOrder);
                if (ord) {
                  res.status(200).json({
                    success: true,
                    message: "OrderItems and Order Deleted",
                  });
                } else {
                  res.status(404).json({
                    success: false,
                    message: "OrderItems not found",
                    orderitem: ord,
                  });
                }
              })
              .catch((err) => res.send(err));
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Order not found",
          });
        }
      })
      .catch((err) => res.send(err));
  }
});
module.exports = router;
