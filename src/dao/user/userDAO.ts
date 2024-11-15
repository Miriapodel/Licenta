import prisma from "../../../lib/prisma/prisma";

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: {email}
    });
};

export const findCredsForUser = async (userId: number) => {
    return await prisma.credentials.findFirst({
        where: {
            id: userId,
            provider:{
                not: "google"
            }
        }
    });
}

export const findGoogleCredsForUser = async (userId: number) => {
    return await prisma.credentials.findFirst({
        where:{
            id: userId,
            provider: "google"
        }
    })
}

interface userData{
    email: string,
    firstName: string,
    lastName: string,
}

export const createUser = async (userData: userData) => {
    return await prisma.user.create({
        data:{
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
        }
    });
}