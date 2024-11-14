import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../lib/prisma/prisma';

const googleAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST")
        return res.setHeader("Allow", ["POST"]).status(405).end("Method ${req.method} not allowed!");

    const {email, firstName, lastName, provider, providerUserId} = req.body;

    try{
        let user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            user = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName
                }
            });

            await prisma.credentials.create({
                data: {
                    userId: user.id,
                    provider,
                    providerUserId,
                    passwordHash: null
                }
            });
        } else {
            const credentials = await prisma.credentials.findFirst({
                where: {
                    userId: user.id,
                    provider: {
                        not: provider
                    }
                }
            });

            if(credentials)
                return res.status(400).json({message: "Acest email este deja asociat unui cont creat cu o alta metoda de autentificare!"});
        }

        return res.status(200).json({message: "Utilizator autentificat cu succes!"});
    } catch (error){
        res.status(500).json({message: "Problema la autentificarea cu Google"});
    }
}

export default googleAuthHandler;