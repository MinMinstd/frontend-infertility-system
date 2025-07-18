export interface Feedback {
    feedbackId: string;
    fullName: string;
    rating: number;
    comments: string;
    date: string;
    status: string;
    isApproved: boolean;
}

export interface Account {
    id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
    lastActiveAt: string;
    totalActiveDays: number;

  }

  export interface Appointment {
    customerName: string;
    doctorName: string;
    type: string;
    date: string;
    time: string;
    status: string;
    
  } 
  export interface Doctor {
    doctorId: string;
    fullName: string;
    degreeName: string;
    phone: string;
    email: string;
  }

  export interface DaySchedule {
    workDate: string;
    startTime: string;
    endTime: string;
    status: string;
  }

 



export interface OrderDetail {
    orderDetailId: number;
    doctorName: string;
    serviceName: string;
    stageName: string | null;
    dateTreatment: string | null;
    timeTreatment: string | null;
}

export interface Order {
    orderId: number;
    status: string;
    wife: string;
    husband: string;
    orderDetailList: OrderDetail[];
}

export interface TreatmentRoadmapWithPayment {
  treatmentRoadmapId: number;
  stage: string;
  cost: number;
  listPayment: PaymentDetail[];
}

export interface CustomerWithPayment {
  userId: number;
  customerId: number;
  fullName: string;
  totalPayment: number;
  listPayment: PaymentDetail[];
}

export interface PaymentDetail {
  paymentId: number;
  customerName: string;
  serviceName: string;
  date: string;
  priceByTreatment: number;
  status: string;
}

export interface ServiceForManagement {
  serviceDBId: number;
  name: string;
  description: string;
}

export interface ServiceCreateRequest {
  name: string;
  description: string;
}

export interface ServiceUpdateRequest {
  name: string;
  description: string;
}

export interface TreatmentRoadmapCreateRequest {
  serviceId: number;
  stage: string;
  description: string;
  durationDay: number;
  price: number;
  serviceName: string;
}

export interface TreatmentRoadmapStep {
  treatmentRoadmapStepId: number;
  treatmentRoadmapId: number;
  stage: string;
  description: string;
  durationDay: number;
  price: number;
  serviceName: string;
}

export interface TreatmentRoadmapUpdateRequest {
  stage: string;
  description: string;
  durationDay: number;
  price: number;
}

export interface TotalRevenueResponse {
  totalRevenue: number;
}

export interface TotalTransactionsResponse {
  totalTransactions: number;
}

export interface TotalCustomersResponse {
  totalCustomers: number;
}