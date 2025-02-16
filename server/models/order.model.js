import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who placed the order
  books: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to the book
      quantity: { type: Number, default: 1 }, // Number of copies ordered
    },
  ],
  totalAmount: { type: Number, required: true }, // Total cost of the order
  shippingAddress: { type: String, required: true }, // Delivery address
  paymentMethod: { type: String, required: true }, // e.g., Credit Card, PayPal
  paymentStatus: { type: String, default: 'Pending' }, // e.g., Pending, Completed, Failed
  orderStatus: { type: String, default: 'Processing' }, // e.g., Processing, Shipped, Delivered
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model('Order', orderSchema);
