import{ Order} from '../models/order.model.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { books, totalAmount, shippingAddress, paymentMethod } = req.body;

  try {
    const order = new Order({
      user: req.user.id,
      books,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('books.book');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

