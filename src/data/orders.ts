
import { Order } from "@/types";

// Placeholder data for orders
export const ordersData: Order[] = [
  {
    id: "ord-001",
    customer: {
      id: "cust-001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      createdAt: "2023-05-10T14:30:00.000Z"
    },
    items: [
      {
        product: {
          id: "1",
          name: "Gold Chain Necklace",
          category: "Necklace",
          subcategory: "Chain",
          price: 129.99,
          description: "Elegant gold chain necklace with pendant disc, perfect for everyday wear.",
          images: ["/image/img1.png", "/image/img2.png"],
          inStock: true,
          createdAt: "2023-05-15T10:30:00.000Z"
        },
        quantity: 1,
        price: 129.99
      }
    ],
    totalAmount: 129.99,
    status: "delivered",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    createdAt: "2023-11-15T09:30:00.000Z"
  }
];

// Add getOrderById function
export const getOrderById = (id: string): Order | undefined => {
  return ordersData.find(order => order.id === id);
};

// Add the getRecentOrders function
export const getRecentOrders = (limit: number): Order[] => {
  // Sort by date (newest first) and return limited number
  return [...ordersData]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

// Add the getOrdersByCustomer function
export const getOrdersByCustomer = (customerId: string): Order[] => {
  return ordersData.filter(order => order.customer.id === customerId);
};

// Function to create a new order
export const createOrder = (order: Order): Order => {
  ordersData.push(order);
  return order;
};
