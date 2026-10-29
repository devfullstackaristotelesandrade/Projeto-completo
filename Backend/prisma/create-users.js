require("dotenv").config();

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {

    const senha = await bcrypt.hash("123456", 10);

    const professor = await prisma.user.upsert({
        where: {
            
        },
        update: {
            perfil: "PROFESSOR"
        },
        create: {
            nome: "Professor Teste",
            email: "professor@aprendermais.com",
            senha,
            perfil: "PROFESSOR"
        }
    });

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@aprendermais.com"
        },
        update: {
            perfil: "ADMIN"
        },
        create: {
            nome: "Administrador Teste",
            email: "admin@aprendermais.com",
            senha,
            perfil: "ADMIN"
        }
    });

    console.log("Professor:", professor.email);
    console.log("Admin:", admin.email);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });email: "professor@aprendermais.com"