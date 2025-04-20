
import { Customer, Address } from "@/types";

const address1: Address = {
  firstName: "Emily",
  lastName: "Johnson",
  street: "123 Maple Avenue",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  isDefault: true
};

const address2: Address = {
  firstName: "Michael",
  lastName: "Smith",
  street: "456 Oak Street",
  city: "Los Angeles",
  state: "CA",
  zipCode: "90001",
  country: "United States",
  isDefault: true
};

const address3: Address = {
  firstName: "Sophia",
  lastName: "Williams",
  street: "789 Pine Road",
  city: "Chicago",
  state: "IL",
  zipCode: "60007",
  country: "United States",
  isDefault: true
};

const address4: Address = {
  firstName: "Daniel",
  lastName: "Brown",
  street: "101 Cedar Lane",
  city: "Miami",
  state: "FL",
  zipCode: "33101",
  country: "United States",
  isDefault: true
};

export const customersData: Customer[] = [
  {
    id: "CUST-001",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 212-555-1234",
    addresses: [address1],
    createdAt: "2023-01-15T10:30:00.000Z"
  },
  {
    id: "CUST-002",
    firstName: "Michael",
    lastName: "Smith",
    email: "michael.smith@example.com",
    phone: "+1 323-555-5678",
    addresses: [address2],
    createdAt: "2023-02-22T14:45:00.000Z"
  },
  {
    id: "CUST-003",
    firstName: "Sophia",
    lastName: "Williams",
    email: "sophia.williams@example.com",
    phone: "+1 312-555-9012",
    addresses: [address3],
    createdAt: "2023-03-10T09:15:00.000Z"
  },
  {
    id: "CUST-004",
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel.brown@example.com",
    phone: "+1 305-555-3456",
    addresses: [address4],
    createdAt: "2023-04-05T16:20:00.000Z"
  }
];

export const getRecentCustomers = (limit = 5): Customer[] => {
  return [...customersData]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getCustomerById = (id: string): Customer | undefined => {
  return customersData.find(customer => customer.id === id);
};
