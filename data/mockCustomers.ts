export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    fullName: "Aisha Ibrahim",
    email: "aisha@example.com",
    phone: "+2348012345678",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "c2",
    fullName: "Sola Ade",
    email: "sola@example.com",
    phone: "+2348023456789",
    avatarUrl: "https://images.unsplash.com/photo-1545996124-1f8d5c8f8a8a?auto=format&fit=crop&w=400&q=80",
  },
];

export default mockCustomers;
