"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.customer.deleteMany({});
    yield prisma.employee.deleteMany({});
    yield prisma.house.deleteMany({});
    yield prisma.order.deleteMany({});
    // ----------------- Customer -----------------
    const JohnDoe = yield prisma.customer.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            birthday: new Date('1990-01-01'),
            password: 'password',
        }
    });
    const JaneSmith = yield prisma.customer.create({
        data: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            birthday: new Date("1985-05-15"),
            password: "securePassword2",
        }
    });
    const AliceJohnson = yield prisma.customer.create({
        data: {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            birthday: new Date("1992-09-10"),
            password: "securePassword3",
        }
    });
    const BobBrown = yield prisma.customer.create({
        data: {
            firstName: "Bob",
            lastName: "Brown",
            email: "bobbrown@example.com",
            birthday: new Date("1980-12-25"),
            password: "securePassword4",
        }
    });
    // ----------------- Employees -----------------
    const employee1 = yield prisma.employee.create({
        data: {
            firstName: "Michael",
            lastName: "Scott",
            email: "michael.scott@example.com",
            birthday: new Date("1964-03-15"),
            password: "dundermifflin",
            role: "admin",
            experience: 20,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Manager"
        }
    });
    const employee2 = yield prisma.employee.create({
        data: {
            firstName: "Dwight",
            lastName: "Schrute",
            email: "dwight.schrute@example.com",
            birthday: new Date("1970-01-20"),
            password: "beetfarmer",
            role: "admin",
            experience: 15,
            domain: "Sales",
            licenseType: "A",
            workPosition: "Assistant to the Regional Manager"
        }
    });
    const employee3 = yield prisma.employee.create({
        data: {
            firstName: "Jim",
            lastName: "Halpert",
            email: "jim.halpert@example.com",
            birthday: new Date("1978-10-01"),
            password: "prankster",
            experience: 10,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Sales Representative"
        }
    });
    const employee4 = yield prisma.employee.create({
        data: {
            firstName: "Pam",
            lastName: "Beesly",
            email: "pam.beesly@example.com",
            birthday: new Date("1979-03-25"),
            password: "artist",
            experience: 8,
            domain: "Reception",
            licenseType: "C",
            workPosition: "Receptionist"
        }
    });
    const employee5 = yield prisma.employee.create({
        data: {
            firstName: "Stanley",
            lastName: "Hudson",
            email: "stanley.hudson@example.com",
            birthday: new Date("1958-02-19"),
            password: "crossword",
            experience: 30,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Sales Representative"
        }
    });
    // ----------------- Addresses and Houses -----------------
    const house1 = yield prisma.house.create({
        data: {
            houseNumber: "123",
            street: "Main St",
            city: "Springfield",
            zip: "62701",
            country: "USA",
            type: "detached",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house2 = yield prisma.house.create({
        data: {
            houseNumber: "456",
            street: "Elm St",
            city: "Rochester",
            zip: "14607",
            country: "USA",
            type: "apartment",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house3 = yield prisma.house.create({
        data: {
            houseNumber: "789",
            street: "Oak St",
            city: "Austin",
            zip: "78701",
            country: "USA",
            type: "semi-detached",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house4 = yield prisma.house.create({
        data: {
            houseNumber: "101",
            street: "Pine St",
            city: "Portland",
            zip: "97201",
            country: "USA",
            type: "bungalow",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house5 = yield prisma.house.create({
        data: {
            houseNumber: "202",
            street: "Cedar St",
            city: "Seattle",
            zip: "98101",
            country: "USA",
            type: "townhouse",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house6 = yield prisma.house.create({
        data: {
            houseNumber: "303",
            street: "Maple St",
            city: "Tel Aviv",
            zip: "69999",
            country: "Israel",
            type: "detached",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house7 = yield prisma.house.create({
        data: {
            houseNumber: "404",
            street: "Birch St",
            city: "London",
            zip: "E1 6AN",
            country: "UK",
            type: "apartment",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    const house8 = yield prisma.house.create({
        data: {
            houseNumber: "505",
            street: "Pineapple St",
            city: "Sydney",
            zip: "2000",
            country: "Australia",
            type: "terraced",
            createdAt: new Date(),
        },
        include: {
            rooms: true, // Include the related rooms in the response
        },
    });
    // ----------------- Rooms -----------------
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Spacious and well-lit living area",
            house: {
                connect: { id: house1.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Kitchen",
            workDescription: "Modern kitchen with appliances",
            house: {
                connect: { id: house1.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom 1",
            workDescription: "Cozy bedroom with a balcony",
            house: {
                connect: { id: house2.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom 2",
            workDescription: "Guest bedroom",
            house: {
                connect: { id: house2.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Open-plan living area",
            house: {
                connect: { id: house2.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Master Bedroom",
            workDescription: "Spacious master bedroom",
            house: {
                connect: { id: house3.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bathroom",
            workDescription: "Full bathroom with shower and tub",
            house: {
                connect: { id: house3.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Sunlit living room",
            house: {
                connect: { id: house4.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom",
            workDescription: "Cozy single bedroom",
            house: {
                connect: { id: house4.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Stylish living space",
            house: {
                connect: { id: house5.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom 1",
            workDescription: "Master bedroom with en-suite",
            house: {
                connect: { id: house5.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom 2",
            workDescription: "Children's bedroom",
            house: {
                connect: { id: house5.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Open-plan living area",
            house: {
                connect: { id: house6.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Kitchen",
            workDescription: "Fully equipped kitchen",
            house: {
                connect: { id: house6.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom",
            workDescription: "Compact bedroom",
            house: {
                connect: { id: house7.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bathroom",
            workDescription: "Modern bathroom",
            house: {
                connect: { id: house7.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Living Room",
            workDescription: "Terraced living room",
            house: {
                connect: { id: house8.id },
            },
        },
    });
    yield prisma.room.create({
        data: {
            name: "Bedroom",
            workDescription: "Large bedroom with terrace access",
            house: {
                connect: { id: house8.id },
            },
        },
    });
    // ----------------- Create Orders -----------------
    // Order 1: John Doe for House 1, managed by Michael Scott
    yield prisma.order.create({
        data: {
            houseId: house1.id,
            customerId: JohnDoe.id,
            employeeId: employee1.id,
            startDate: new Date('2025-01-01'),
            status: 'pending',
            price: 500000,
            orderDate: new Date('2023-12-01'),
        }
    });
    // Order 2: Jane Smith for House 2, managed by Dwight Schrute
    yield prisma.order.create({
        data: {
            houseId: house2.id,
            customerId: JaneSmith.id,
            employeeId: employee2.id,
            startDate: new Date('2025-02-01'),
            status: 'pending',
            price: 200000,
            orderDate: new Date('2023-12-05')
        }
    });
    // Order 3: Alice Johnson for House 1, managed by Michael Scott
    yield prisma.order.create({
        data: {
            houseId: house1.id,
            customerId: AliceJohnson.id,
            employeeId: employee1.id,
            startDate: new Date('2025-03-01'),
            status: 'pending',
            price: 550000,
            orderDate: new Date('2023-12-10')
        }
    });
});
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
