import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.shoppingCart.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1',
            role: 'user',
        },
    });

    const toyTrain = await prisma.product.create({
        data: {
            name: 'Toy Train',
            price: 35.1,
            description:
                'A toy train from the ABD company suitable for children aged 5-12 years old.',
            stock: 10,
        },
    });

    const smartwatch = await prisma.product.create({
        data: {
            name: 'Smartwatch',
            price: 199.99,
            description: 'A sleek smartwatch with heart-rate monitoring and GPS tracking',
            stock: 15,
        },
    });

    const backpack = await prisma.product.create({
        data: {
            name: 'Backpack',
            price: 49.99,
            description: 'A durable backpack with multiple compartments and waterproof material',
            stock: 25,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'milan',
            email: 'milan@mail.com',
            password: 'milanspassword',
            role: 'user',
        },
    });

    await prisma.review.create({
        data: {
            score: 1,
            comment: 'The toy broke after one use. Very disappointing.',
            date: new Date('2024-01-10'),
            product: {
                connect: { id: toyTrain.id },
            },
            user: {
                connect: { id: user1.id },
            },
        },
    });

    await prisma.review.create({
        data: {
            score: 5,
            comment: 'My kids love this toy train! Great quality and fun to play with.',
            date: new Date('2024-01-15'),
            product: {
                connect: { id: toyTrain.id },
            },
            user: {
                connect: { id: user2.id },
            },
        },
    });

    await prisma.shoppingCart.create({
        data: {
            userId: user2.id,
            products: {
                connect: [{ id: toyTrain.id }, { id: smartwatch.id }],
            },
        },
    });

    console.log('Database seeded successfully!');
};

(async () => {
    try {
        await main();
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
})();
