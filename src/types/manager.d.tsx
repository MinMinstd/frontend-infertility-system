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
    note: string;
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

  export interface Service {
    serviceDBId: number;
    name: string;
    description: string;
    price: number;
}

export interface TreatmentRoadmap {
    treatmentRoadmapId: number;
    stage: string;
    description: string;
    durationDay: number;
    price: number;
    serviceName: string;
}

export interface OrderDetail {
    orderDetailId: number;
    doctorName: string;
    serviceName: string;
}

export interface Order {
    orderId: number;
    status: string;
    wife: string;
    husband: string;
    orderDetailList: OrderDetail[];
}