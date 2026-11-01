import { Prisma, Luminosidade } from "@prisma/client";
import prisma from "@database";

export const createPlant = async (data: Prisma.PlantaCreateInput) => {
  return await prisma.planta.create({
    data: data,
  });
};

export const findAllPlants = async (filters?: {
  luminosidade?: Luminosidade;
  petFriendly?: boolean;
}) => {
  const where: Prisma.PlantaWhereInput = {};

  if (filters?.luminosidade) {
    where.luminosidade = filters.luminosidade;
  }

  if (typeof filters?.petFriendly === "boolean") {
    where.petFriendly = filters.petFriendly;
  }

  return await prisma.planta.findMany({
    where: where,
  });
};

export const findPlantById = async (id: number) => {
  return await prisma.planta.findUnique({
    where: { id: id },
  });
};

export const updatePlant = async (id: number, data: Prisma.PlantaUpdateInput) => {
  return await prisma.planta.update({
    where: { id: id },
    data: data,
  });
};

export const deletePlant = async (id: number) => {
  return await prisma.planta.delete({
    where: { id: id },
  });
};

export const decrementStock = async (id: number, quantidade: number) => {
  return await prisma.planta.update({
    where: { id: id },
    data: {
      estoque: {
        decrement: quantidade,
      },
    },
  });
};

export const getStockSummary = async () => {
  const plantas = await prisma.planta.findMany({
    select: {
      preco: true,
      estoque: true,
    },
  });

  const totalDeVasos = plantas.reduce((acc, p) => acc + p.estoque, 0);
  const valorTotalEmCentavos = plantas.reduce(
    (acc, p) => acc + p.preco * p.estoque,
    0
  );

  return {
    valorTotalEmCentavos: valorTotalEmCentavos,
    totalDeVasos: totalDeVasos,
  };
};