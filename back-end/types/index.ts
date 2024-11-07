export type createHouseDto = {
  type: string,
  addressId: number,
};

export type createAddressDto = {
  city: string,
  houseNumber: number,
  street: string,
  state: string,
  zip: string,
};

export type createCustomerDto = {
  firstName: string,
  lastName: string,
  email: string,
  birthDate: Date,
  password: string
};

export type createOrderDto = {
  customerId: number,
  orderDate: Date,
  startDate: Date,
  price: number,
  houseId: number,
};

export type createRoomDto = {
  workDescription: string,
  name: string,
  houseId: number,
};

// export type LoginCustomerDto = {
//     email: string,
//   password: string,
// },