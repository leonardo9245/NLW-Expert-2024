import { FastifyInstance } from "fastify";
import z from "zod"
import { prisma } from "../../lib/prisma";

export async function DeletPoll(app: FastifyInstance) {
  app.delete('/polls/:pollId', async (request, reply) => {
    const deleteParams = z.object({
      pollId: z.string().uuid(),
    })

    const {pollId} = deleteParams.parse(request.params)

    try{

      await prisma.vote.deleteMany({
        where: {
          pollOption: {
            pollId
          }
        }
    });

      await prisma.pollOption.deleteMany({
        where: {
          pollId
        }
      });  

     await prisma.poll.delete({
        where: {
          id: pollId,
        }
      })


      reply.code(200).send({ message: 'Poll Successfully Deleted' });
    }catch(error){
      console.error('Erro ao deletar arquivo:', error);
      reply.code(500).send({ error: 'Erro interno do servidor' });
    }
    

    console.log(pollId);
  })
}