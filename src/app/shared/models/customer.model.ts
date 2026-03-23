export interface CustomerRegister {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CustomerLogin {
  email: string;
  password: string;
}

export interface CustomerAuthResponse {
  token: string;
  name: string;
  email: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}
