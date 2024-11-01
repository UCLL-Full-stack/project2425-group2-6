// types.ts
export interface CustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface LoginCustomer {
  email: string;
  password: string;
}
