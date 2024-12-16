export type createHouseDto = {
  houseNumber: string,
  street: string,
  city: string,
  zip: string,
  country: string,
  type: string,
};

export type Role = 'admin' | 'customer' | 'worker';

export type createAddressDto = {
  city: string,
  houseNumber: string,
  street: string,
  state: string,
  zip: string,
};

export type AuthenticationResponse = {
  token : string;
  email: string;
  fullname: string;
  role: string;
}

export type createCustomerDto = {
  firstName: string,
  lastName: string,
  email: string,
  birthday: Date,
  password: string,
  createdAt: Date
};

export type prepOrderDto = {
  email: string,
  startDate: Date,
  budget: number,
  
  houseNumber: string,
  street: string,
  city: string,
  zip: string,
  country: string,
  type: string,

  roomName: string,
  workDescription: string,

};

export type createRoomDto = {
  workDescription: string,
  name: string,
  houseId: number,
};
