
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  details?: string[];
  images: string[];
  featured?: boolean;
  inStock: boolean;
  materials?: string[];
  createdAt: Date | string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date | string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses?: Address[];
  orders?: Order[];
  createdAt: Date | string;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}
