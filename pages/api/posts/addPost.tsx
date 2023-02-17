import prisma from '../../../prisma/client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Você precisa entrar para postar alguma coisa' });
    }

    const title: string = req.body.title;

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
    //Check title
    if (title.length > 300) {
      return res.status(403).json({ message: 'O limite de caracteres é 300' });
    }

    if (title.length == 0) {
      res.status(403).json({ message: 'Este campo não pode ficar vazio' });
    }

    //Create Post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: 'Erro' });
    }
  }
}
