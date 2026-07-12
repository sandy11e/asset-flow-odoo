const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {

    console.log("Cleaning database...");

    await prisma.activityLog.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.auditCycle.deleteMany();
    await prisma.maintenanceRequest.deleteMany();
    await prisma.resourceBooking.deleteMany();
    await prisma.assetAllocation.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.user.deleteMany();
    await prisma.assetCategory.deleteMany();
    await prisma.department.deleteMany();

    console.log("Creating Departments...");

    const departments = [];

    const departmentNames = [
        "IT",
        "HR",
        "Finance",
        "Admin",
        "Operations"
    ];

    for (const name of departmentNames) {

        const dept = await prisma.department.create({
            data: {
                name,
                description: `${name} Department`
            }
        });

        departments.push(dept);

    }

    console.log("Creating Categories...");

    const categories = [];

    const categoryNames = [
        "Electronics",
        "Furniture",
        "Vehicles",
        "Networking",
        "Office",
        "Accessories"
    ];

    for (const name of categoryNames) {

        const category = await prisma.assetCategory.create({
            data: {
                name,
                description: `${name} Assets`
            }
        });

        categories.push(category);

    }

    console.log("Creating Users...");

    const password = await bcrypt.hash("12345678", 10);

    const users = [];

    const admin = await prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@gmail.com",
            password,
            role: "ADMIN",
            departmentId: departments[0].id
        }
    });

    users.push(admin);

    const manager = await prisma.user.create({
        data: {
            name: "Asset Manager",
            email: "manager@gmail.com",
            password,
            role: "ASSET_MANAGER",
            departmentId: departments[0].id
        }
    });

    users.push(manager);

    const hod = await prisma.user.create({
        data: {
            name: "Department Head",
            email: "hod@gmail.com",
            password,
            role: "DEPARTMENT_HEAD",
            departmentId: departments[1].id
        }
    });

    users.push(hod);

    for (let i = 1; i <= 12; i++) {

        const employee = await prisma.user.create({

            data: {

                name: faker.person.fullName(),

                email: `employee${i}@gmail.com`,

                password,

                role: "EMPLOYEE",

                departmentId:
                    departments[
                        faker.number.int({
                            min: 0,
                            max: departments.length - 1
                        })
                    ].id,

                phone: faker.phone.number()

            }

        });

        users.push(employee);

    }

    console.log("Departments :", departments.length);
    console.log("Categories  :", categories.length);
    console.log("Users       :", users.length);
        console.log("Creating Assets...");

    const assets = [];

    const assetNames = [
        "Dell Latitude 5440",
        "HP ProBook 450",
        "Lenovo ThinkPad E14",
        "MacBook Air M2",
        "Projector Epson X500",
        "Conference Speaker",
        "Cisco Switch",
        "Canon Printer",
        "Office Chair",
        "Standing Desk",
        "Samsung Monitor",
        "LG Monitor",
        "iPad Air",
        "Surface Pro",
        "Router TP-Link",
        "Biometric Scanner",
        "UPS APC",
        "Server Dell R740",
        "Scanner Canon",
        "Webcam Logitech"
    ];

    for (let i = 0; i < 20; i++) {

        const asset = await prisma.asset.create({

            data: {

                assetTag: `AF-${String(i + 1).padStart(4, "0")}`,

                name: assetNames[i],

                serialNumber: `SN-${10000 + i}`,

                categoryId:
                    categories[
                        faker.number.int({
                            min: 0,
                            max: categories.length - 1
                        })
                    ].id,

                acquisitionDate: faker.date.past(),

                acquisitionCost: faker.number.int({
                    min: 15000,
                    max: 120000
                }),

                condition: faker.helpers.arrayElement([
                    "EXCELLENT",
                    "GOOD",
                    "FAIR"
                ]),

                status: "AVAILABLE",

                location: faker.helpers.arrayElement([
                    "IT Room",
                    "Admin Block",
                    "Conference Hall",
                    "HR Cabin",
                    "Server Room"
                ]),

                isBookable: faker.datatype.boolean(),

                qrCode: `QR-AF-${String(i + 1).padStart(4, "0")}`

            }

        });

        assets.push(asset);

    }

    console.log("Assets :", assets.length);
        console.log("Creating Asset Allocations...");

    const allocations = [];

    for (let i = 0; i < 10; i++) {

        const allocation = await prisma.assetAllocation.create({

            data: {

                assetId: assets[i].id,

                userId: users[i + 3].id,

                allocatedById: admin.id,

                allocatedAt: faker.date.recent(),

                expectedReturnDate: faker.date.soon(),

                remarks: "Demo Allocation"

            },

            include: {

                asset: true,

                user: true

            }

        });

        allocations.push(allocation);

        await prisma.asset.update({

            where: {

                id: assets[i].id

            },

            data: {

                status: "ALLOCATED"

            }

        });

    }

    console.log("Allocations :", allocations.length);





    console.log("Creating Resource Bookings...");

    const bookings = [];

    for (let i = 10; i < 18; i++) {

        const start = faker.date.soon();

        const end = new Date(start);

        end.setHours(end.getHours() + 1);

        const booking = await prisma.resourceBooking.create({

            data: {

                assetId: assets[i].id,

                userId: users[i - 8].id,

                title: `Meeting ${i}`,

                startTime: start,

                endTime: end,

                status: "UPCOMING"

            }

        });

        bookings.push(booking);

    }

    console.log("Bookings :", bookings.length);





    console.log("Creating Maintenance Requests...");

    const maintenance = [];

    const priorities = [

        "LOW",

        "MEDIUM",

        "HIGH"

    ];

    for (let i = 15; i < 20; i++) {

        const request = await prisma.maintenanceRequest.create({

            data: {

                assetId: assets[i].id,

                reportedById: users[3].id,

                issue: faker.lorem.sentence(),

                priority: faker.helpers.arrayElement(priorities),

                status: "PENDING"

            }

        });

        maintenance.push(request);

        await prisma.asset.update({

            where: {

                id: assets[i].id

            },

            data: {

                status: "UNDER_MAINTENANCE"

            }

        });

    }

    console.log("Maintenance :", maintenance.length);
        console.log("Creating Notifications...");

    for (let i = 0; i < 15; i++) {

        await prisma.notification.create({

            data: {

                title: faker.helpers.arrayElement([
                    "Asset Assigned",
                    "Booking Confirmed",
                    "Maintenance Approved",
                    "Asset Returned",
                    "Transfer Completed"
                ]),

                message: faker.lorem.sentence(),

                userId: users[
                    faker.number.int({
                        min: 0,
                        max: users.length - 1
                    })
                ].id,

                isRead: faker.datatype.boolean()

            }

        });

    }

    console.log("Notifications : 15");





    console.log("Creating Activity Logs...");

    const actions = [

        "Created Asset",
        "Allocated Asset",
        "Returned Asset",
        "Created Booking",
        "Cancelled Booking",
        "Raised Maintenance",
        "Approved Maintenance",
        "Created Department",
        "Created Category",
        "Updated User"

    ];

    for (let i = 0; i < 30; i++) {

        await prisma.activityLog.create({

            data: {

                userName:
                    users[
                        faker.number.int({
                            min: 0,
                            max: users.length - 1
                        })
                    ].name,

                action:
                    faker.helpers.arrayElement(actions)

            }

        });

    }

    console.log("Activity Logs : 30");





    console.log("Creating Audit Cycles...");

    for (let i = 1; i <= 3; i++) {

        await prisma.auditCycle.create({

            data: {

                title: `Quarter ${i} Audit`,

                department:
                    departments[
                        faker.number.int({
                            min: 0,
                            max: departments.length - 1
                        })
                    ].name,

                startDate: faker.date.past(),

                endDate: faker.date.future(),

                status: faker.helpers.arrayElement([
                    "OPEN",
                    "CLOSED"
                ])

            }

        });

    }

    console.log("Audit Cycles : 3");



    console.log("");
    console.log("=================================");
    console.log("DATABASE SEEDED SUCCESSFULLY");
    console.log("=================================");
    console.log(`Departments      : ${departments.length}`);
    console.log(`Categories       : ${categories.length}`);
    console.log(`Users            : ${users.length}`);
    console.log(`Assets           : ${assets.length}`);
    console.log(`Allocations      : ${allocations.length}`);
    console.log(`Bookings         : ${bookings.length}`);
    console.log(`Maintenance      : ${maintenance.length}`);
    console.log(`Notifications    : 15`);
    console.log(`Activity Logs    : 30`);
    console.log(`Audit Cycles     : 3`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
