export interface CustomerReview {
  reviewerName: string;
  comment: string;
  rating: number;
  date: string;
}

export interface GpsLocation {
  lat: number;
  lng: number;
}

export interface Artisan {
  id: string;
  name: string;
  fullName: string;
  username: string;
  profession: string;
  yearsOfExperience: number;
  bio: string;
  servicesOffered: string[];
  portfolio: string[];
  portfolioImages: string[];
  workingDaysHours: string;
  emergencyAvailability: boolean;
  serviceRadius: string;
  languagesSpoken: string[];
  averageResponseTime: string;
  phoneNumber: string;
  whatsappContact: string;
  email: string;
  state: string;
  lga: string;
  city: string;
  fullAddress: string;
  gpsLocation: GpsLocation;
  verificationBadge: Array<"NIN Verified" | "Guarantor Vouched">;
  rating: number;
  completedJobs: number;
  customerReviews: CustomerReview[];
  startingPrice?: number;
  hourlyRate?: number;
  isNinVerified: boolean;
  isVouched: boolean;
  availabilityStatus: "Available Now" | "Busy";
  avatarUrl: string;
}

export const mockArtisans: Artisan[] = [
  {
    id: "a1",
    name: "Emeka Okafor",
    fullName: "Emeka Okafor",
    username: "emeka-electric",
    profession: "Electrician",
    yearsOfExperience: 9,
    bio: "Experienced electrician specialising in residential rewiring, solar installations, and lighting design. Reliable, safety-first approach.",
    servicesOffered: ["Wiring", "Circuit Breaker Repair", "Lighting Installation", "Solar Setup"],
    portfolio: [
      "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Sat • 8:00 AM - 8:00 PM",
    emergencyAvailability: true,
    serviceRadius: "15 km",
    languagesSpoken: ["English", "Igbo", "Yoruba"],
    averageResponseTime: "Under 30 mins",
    phoneNumber: "+2348123456789",
    whatsappContact: "+2348123456789",
    email: "emeka@givemework.com.ng",
    state: "Lagos",
    lga: "Ikeja",
    city: "Lagos",
    fullAddress: "12 Adeola Hopewell Street, Ikeja, Lagos",
    gpsLocation: { lat: 6.6018, lng: 3.3515 },
    verificationBadge: ["NIN Verified", "Guarantor Vouched"],
    rating: 4.9,
    completedJobs: 342,
    customerReviews: [
      { reviewerName: "Tunde A.", comment: "Fast and professional", rating: 5, date: "2025-06-11" },
      { reviewerName: "Joy O.", comment: "Very tidy workmanship", rating: 5, date: "2025-04-09" },
    ],
    hourlyRate: 4500,
    isNinVerified: true,
    isVouched: true,
    availabilityStatus: "Available Now",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "a2",
    name: "Musa Bello",
    fullName: "Musa Bello",
    username: "musa-plumber",
    profession: "Plumber",
    yearsOfExperience: 7,
    bio: "Specialist in leak repairs, sanitary installations and bathroom renovations. Fast response and tidy workmanship.",
    servicesOffered: ["Leak Repair", "Pipe Installation", "Water Heater Fix", "Bathroom Renovation"],
    portfolio: [
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474c7?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1509718443690-d8e2fb3474c7?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Sun • 7:00 AM - 10:00 PM",
    emergencyAvailability: true,
    serviceRadius: "20 km",
    languagesSpoken: ["English", "Yoruba", "Hausa"],
    averageResponseTime: "Under 45 mins",
    phoneNumber: "+2348134567890",
    whatsappContact: "+2348134567890",
    email: "musa@givemework.com.ng",
    state: "Lagos",
    lga: "Lekki",
    city: "Lagos",
    fullAddress: "8 Admiralty Way, Lekki Phase 1, Lagos",
    gpsLocation: { lat: 6.4654, lng: 3.5365 },
    verificationBadge: ["NIN Verified"],
    rating: 4.8,
    completedJobs: 214,
    customerReviews: [
      { reviewerName: "Mina S.", comment: "Arrived on time and fixed everything", rating: 5, date: "2025-05-17" },
      { reviewerName: "Bola T.", comment: "Great communication", rating: 4, date: "2025-02-14" },
    ],
    startingPrice: 12000,
    isNinVerified: true,
    isVouched: false,
    availabilityStatus: "Busy",
    avatarUrl: "https://images.unsplash.com/photo-1544126598-8a7aeb5c5d74?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "a3",
    name: "Chinedu Nwankwo",
    fullName: "Chinedu Nwankwo",
    username: "chinedu-ac",
    profession: "AC Technician",
    yearsOfExperience: 11,
    bio: "Trained HVAC technician with years of experience maintaining and repairing split and central AC units.",
    servicesOffered: ["AC Servicing", "Gas Refill", "Compressor Repair", "Installation"],
    portfolio: [
      "https://images.unsplash.com/photo-1581574207605-2c9b5a6d9b1b?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1581574207605-2c9b5a6d9b1b?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Fri • 9:00 AM - 7:00 PM",
    emergencyAvailability: false,
    serviceRadius: "12 km",
    languagesSpoken: ["English", "Igbo"],
    averageResponseTime: "Under 1 hour",
    phoneNumber: "+2348145678901",
    whatsappContact: "+2348145678901",
    email: "chinedu@givemework.com.ng",
    state: "Lagos",
    lga: "Surulere",
    city: "Lagos",
    fullAddress: "21 Bode Thomas Street, Surulere, Lagos",
    gpsLocation: { lat: 6.5036, lng: 3.3579 },
    verificationBadge: ["Guarantor Vouched"],
    rating: 4.7,
    completedJobs: 178,
    customerReviews: [
      { reviewerName: "Ada C.", comment: "Excellent troubleshooting", rating: 5, date: "2025-06-03" },
      { reviewerName: "Moses N.", comment: "Calm and knowledgeable", rating: 4, date: "2025-03-18" },
    ],
    hourlyRate: 6000,
    isNinVerified: false,
    isVouched: true,
    availabilityStatus: "Available Now",
    avatarUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "a4",
    name: "Fatima Musa",
    fullName: "Fatima Musa",
    username: "fatima-painter",
    profession: "Painter",
    yearsOfExperience: 8,
    bio: "Interior and exterior painter delivering neat finishes and durable coatings. Offers colour consultation.",
    servicesOffered: ["Interior Painting", "Exterior Painting", "Wall Finishing", "Color Consultation"],
    portfolio: [
      "https://images.unsplash.com/photo-1505691723518-36a0f0d6b3d5?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1505691723518-36a0f0d6b3d5?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Sat • 8:30 AM - 6:30 PM",
    emergencyAvailability: false,
    serviceRadius: "10 km",
    languagesSpoken: ["English", "Hausa", "Yoruba"],
    averageResponseTime: "Under 20 mins",
    phoneNumber: "+2348156789012",
    whatsappContact: "+2348156789012",
    email: "fatima@givemework.com.ng",
    state: "Lagos",
    lga: "Yaba",
    city: "Lagos",
    fullAddress: "48 Herbert Macaulay Road, Yaba, Lagos",
    gpsLocation: { lat: 6.5097, lng: 3.3792 },
    verificationBadge: ["NIN Verified", "Guarantor Vouched"],
    rating: 4.95,
    completedJobs: 410,
    customerReviews: [
      { reviewerName: "Rasheed K.", comment: "Clean finish and very reliable", rating: 5, date: "2025-06-18" },
      { reviewerName: "Nneka B.", comment: "Helpful with color choices", rating: 5, date: "2025-04-01" },
    ],
    startingPrice: 8000,
    isNinVerified: true,
    isVouched: true,
    availabilityStatus: "Available Now",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "a5",
    name: "Kunle Adetayo",
    fullName: "Kunle Adetayo",
    username: "kunle-carpenter",
    profession: "Carpenter",
    yearsOfExperience: 12,
    bio: "Custom furniture and joinery specialist. Precision joinery and timely delivery.",
    servicesOffered: ["Furniture Building", "Cabinet Installation", "Doors & Frames", "Repair Works"],
    portfolio: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Sat • 8:00 AM - 6:00 PM",
    emergencyAvailability: false,
    serviceRadius: "18 km",
    languagesSpoken: ["English", "Yoruba"],
    averageResponseTime: "Under 2 hours",
    phoneNumber: "+2348167890123",
    whatsappContact: "+2348167890123",
    email: "kunle@givemework.com.ng",
    state: "Lagos",
    lga: "Ikeja",
    city: "Lagos",
    fullAddress: "44 Obafemi Awolowo Way, Ikeja, Lagos",
    gpsLocation: { lat: 6.5965, lng: 3.3369 },
    verificationBadge: ["Guarantor Vouched"],
    rating: 4.6,
    completedJobs: 129,
    customerReviews: [
      { reviewerName: "Segun P.", comment: "Excellent craftsmanship", rating: 5, date: "2025-05-09" },
      { reviewerName: "Lola M.", comment: "Delivered right on schedule", rating: 4, date: "2025-01-22" },
    ],
    startingPrice: 15000,
    isNinVerified: false,
    isVouched: true,
    availabilityStatus: "Busy",
    avatarUrl: "https://images.unsplash.com/photo-1545996124-1f8d5c8f8a8a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "a6",
    name: "Ngozi Okeke",
    fullName: "Ngozi Okeke",
    username: "ngozi-fashion",
    profession: "Fashion Designer",
    yearsOfExperience: 6,
    bio: "Creative fashion designer specializing in custom clothing and accessories. Passionate about bringing unique designs to life.",
    servicesOffered: ["Custom Design", "Alterations", "Pattern Making", "Consultation"],
    portfolio: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
    ],
    portfolioImages: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60",
    ],
    workingDaysHours: "Mon-Sun • 7:00 AM - 9:00 PM",
    emergencyAvailability: true,
    serviceRadius: "14 km",
    languagesSpoken: ["English", "Igbo", "Yoruba"],
    averageResponseTime: "Under 25 mins",
    phoneNumber: "+2348178901234",
    whatsappContact: "+2348178901234",
    email: "ngozi@givemework.com.ng",
    state: "Lagos",
    lga: "Lekki",
    city: "Lagos",
    fullAddress: "18 Olubunmi Owa Street, Lekki, Lagos",
    gpsLocation: { lat: 6.4471, lng: 3.4927 },
    verificationBadge: ["NIN Verified"],
    rating: 4.85,
    completedJobs: 267,
    customerReviews: [
      { reviewerName: "Dimeji A.", comment: "Very dependable for small jobs", rating: 5, date: "2025-06-22" },
      { reviewerName: "Sade F.", comment: "Neat and courteous", rating: 4, date: "2025-03-30" },
    ],
    hourlyRate: 3500,
    isNinVerified: true,
    isVouched: false,
    availabilityStatus: "Available Now",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];

export default mockArtisans;
