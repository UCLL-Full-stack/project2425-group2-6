export interface CreateCustomerDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginCustomerDto {
    email: string;
  password: string;
}