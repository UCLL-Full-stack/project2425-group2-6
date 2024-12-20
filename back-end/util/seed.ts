import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    await prisma.customer.deleteMany({});
    await prisma.employee.deleteMany({});
    await prisma.house.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.room.deleteMany({});
    await prisma.employee.deleteMany({});

    // ----------------- Customer -----------------

    const JohnDoe = await prisma.customer.create({
        data: {
            firstName: 'user1',
            lastName: 'test',
            email: 'test@gmail.com',
            birthday: new Date('1990-01-01'),
            password: "$2b$12$P8y/GvJMDl2o.wsMRjfugePo97s1k59SlRpf/AAUaDDe/zwly4X/a", //user1
        }
    });

    const JaneSmith = await prisma.customer.create({
        data: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            birthday: new Date("1985-05-15"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test

        }
    });

    const AliceJohnson = await prisma.customer.create({
        data: {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            birthday: new Date("1992-09-10"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test

        }
    });

    const BobBrown = await prisma.customer.create({
        data: {
            firstName: "Bob",
            lastName: "Brown",
            email: "bobbrown@example.com",
            birthday: new Date("1980-12-25"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test

        }
    });

    // ----------------- Employees -----------------

    const employee1 = await prisma.employee.create({
        data: {
            firstName: "Michael",
            lastName: "Scott",
            email: "admin@gmail.com",
            birthday: new Date("1964-03-15"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test
            role: "admin",  
            experience: 20,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Manager"
        }
    });

    const employee2 = await prisma.employee.create({
        data: {
            firstName: "Dwight",
            lastName: "Schrute",
            email: "dwight.schrute@example.com",
            birthday: new Date("1970-01-20"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test
            role: "admin",
            experience: 15,
            domain: "Sales",
            licenseType: "A",
            workPosition: "Assistant to the Regional Manager"
        }
    });

    const employee3 = await prisma.employee.create({
        data: {
            firstName: "Jim",
            lastName: "Halpert",
            email: "jim.halpert@example.com",
            birthday: new Date("1978-10-01"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test
            experience: 10,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Sales Representative"
        }
    });

    const employee4 = await prisma.employee.create({
        data: {
            firstName: "Pam",
            lastName: "Beesly",
            email: "pam.beesly@example.com",
            birthday: new Date("1979-03-25"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test
            experience: 8,
            domain: "Reception",
            licenseType: "C",
            workPosition: "Receptionist"
        }
    });

    const employee5 = await prisma.employee.create({
        data: {
            firstName: "Stanley",
            lastName: "Hudson",
            email: "stanley.hudson@example.com",
            birthday: new Date("1958-02-19"),
            password: "$2b$12$mxbR1gCTLWNlTFvCyAnbxOJL2Hz.DfhDP.gYJDe13zLZGadgD2tmu", //test
            experience: 30,
            domain: "Sales",
            licenseType: "B",
            workPosition: "Sales Representative"
        }
    });

// ----------------- Addresses and Houses -----------------
const house1 = await prisma.house.create({
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
        rooms: true, 
    },
});

    const house2 = await prisma.house.create({
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
            rooms: true, 
        },
    });

    const house3 = await prisma.house.create({
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
            rooms: true, 
        },
    });

    const house4 = await prisma.house.create({
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
            rooms: true, 
        },
    });

    const house5 = await prisma.house.create({
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
            rooms: true, 
        },
    });

    const house6 = await prisma.house.create({
        data: {
            houseNumber: "303",
            street: "Maple St",
            city: "Rome",
            zip: "69999",
            country: "Italy",
            type: "detached",
            createdAt: new Date(),
        },
        include: {
            rooms: true, 
        },
    });

    const house7 = await prisma.house.create({
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
            rooms: true, 
        },
    });

    const house8 = await prisma.house.create({
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
            rooms: true, 
        },
    });
    
    // ----------------- Rooms -----------------
const livingRoom1 = await prisma.room.create({
    data: {
        name: "Living Room",
        workDescription: "Wall mounted TV and sound system",
        house: {
            connect: { id: house1.id },
        },
        order: {
            create: {
                houseId: house1.id,
                customerId: JohnDoe.id,
                startDate: new Date('2025-01-01'),
                status: 'pending',
                price: 30000,
                orderDate: new Date('2023-12-15'),
                employees: {
                    connect: [
                        { id: employee3.id },
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true, // Optionally include the house details for confirmation
    },
});

const kitchen1 = await prisma.room.create({
    data: {
        name: "Kitchen",
        workDescription: "Replace vintage appliances with modern ones",
        house: {
            connect: { id: house1.id },
        },
        order: {
            create: {
                houseId: house1.id,
                customerId: AliceJohnson.id,
                startDate: new Date('2025-02-01'),
                status: 'pending',
                price: 20000,
                orderDate: new Date('2023-12-16'),
                employees: {
                    connect: [
                        { id: employee3.id },
                        { id: employee4.id }
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true,
    },
});

const bedroom1 = await prisma.room.create({
    data: {
        name: "Bedroom 1",
        workDescription: "A balcony",
        house: {
            connect: { id: house2.id },
        },
        order: {
            create: {
                houseId: house2.id,
                customerId: JaneSmith.id,
                startDate: new Date('2025-03-01'),
                status: 'pending',
                price: 25000,
                orderDate: new Date('2023-12-17'),
                employees: {
                    connect: [
                        { id: employee5.id }
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true,
    },
});

const bedroom2 = await prisma.room.create({
    data: {
        name: "Bedroom 2",
        workDescription: "Bright bedroom with steam shower",
        house: {
            connect: { id: house2.id },
        },
        order: {
            create: {
                houseId: house2.id,
                customerId: JohnDoe.id,
                startDate: new Date('2025-04-01'),
                status: 'pending',
                price: 28000,
                orderDate: new Date('2023-12-18'),
                employees: {
                    connect : [
                        { id: employee3.id }
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true,
    },
});

const masterBedroom = await prisma.room.create({
    data: {
        name: "Master Bedroom",
        workDescription: "Chandelier and walk-in closet",
        house: {
            connect: { id: house3.id },
        },
        order: {
            create: {
                houseId: house3.id,
                customerId: AliceJohnson.id,
                startDate: new Date('2025-05-01'),
                status: 'pending',
                price: 40000,
                orderDate: new Date('2023-12-19'),
                employees: {
                    connect: [
                        { id: employee3.id },
                        { id: employee4.id },
                        { id: employee4.id }
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true,
    },
});

const bathroom = await prisma.room.create({
    data: {
        name: "Bathroom",
        workDescription: "Full bathroom with shower and tub",
        house: {
            connect: { id: house3.id },
        },
        order: {
            create: {
                houseId: house3.id,
                customerId: JaneSmith.id,
                startDate: new Date('2025-06-01'),
                status: 'pending',
                price: 15000,
                orderDate: new Date('2023-12-20'),
                employees : {
                    connect : [
                        { id: employee2.id },
                        { id: employee4.id },
                        { id: employee5.id }
                    ]
                }
            },
        },
    },
    include: {
        order: true,
        house: true,
    },
});

}


main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });