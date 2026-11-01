import { Request, Response } from "express";
import * as PlantRepository from "@repositories/PlantRepository";
import { Luminosidade } from "@prisma/client";

const VALID_LUMINOSIDADES: Luminosidade[] = [
  "SOMBRA",
  "MEIA_SOMBRA",
  "SOL_PLENO",
];

export const createPlant = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      especie,
      preco,
      estoque,
      luminosidade,
      petFriendly,
      regaACadaDias,
    } = req.body;

    if (
      !nome ||
      !especie ||
      preco === undefined ||
      estoque === undefined ||
      !luminosidade ||
      petFriendly === undefined ||
      regaACadaDias === undefined
    ) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    if (typeof preco !== "number" || preco <= 0) {
      return res.status(400).json({
        message: "O preço deve ser maior que zero.",
      });
    }

    if (typeof estoque !== "number" || estoque < 0) {
      return res.status(400).json({
        message: "O estoque não pode ser negativo.",
      });
    }

    if (typeof regaACadaDias !== "number" || regaACadaDias < 1) {
      return res.status(400).json({
        message: "A frequência de rega deve ser de pelo menos 1 dia.",
      });
    }

    if (typeof petFriendly !== "boolean") {
      return res.status(400).json({
        message: "Informe se a planta é amigável para pets.",
      });
    }

    if (!VALID_LUMINOSIDADES.includes(luminosidade)) {
      return res.status(400).json({
        message: "Luminosidade inválida. Opções: SOMBRA, MEIA_SOMBRA ou SOL_PLENO.",
      });
    }

    const planta = await PlantRepository.createPlant({
      nome: nome,
      especie: especie,
      preco: preco,
      estoque: estoque,
      luminosidade: luminosidade,
      petFriendly: petFriendly,
      regaACadaDias: regaACadaDias,
    });

    return res.status(201).json(planta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar planta." });
  }
};

export const readAllPlants = async (req: Request, res: Response) => {
  try {
    const { luminosidade, petFriendly } = req.query;

    const filters: {
      luminosidade?: Luminosidade;
      petFriendly?: boolean;
    } = {};

    if (luminosidade) {
      if (!VALID_LUMINOSIDADES.includes(luminosidade as Luminosidade)) {
        return res.status(400).json({
          message: "Luminosidade inválida. Opções: SOMBRA, MEIA_SOMBRA ou SOL_PLENO.",
        });
      }
      filters.luminosidade = luminosidade as Luminosidade;
    }

    if (petFriendly !== undefined) {
      if (petFriendly === "true") {
        filters.petFriendly = true;
      } else if (petFriendly === "false") {
        filters.petFriendly = false;
      } else {
        return res.status(400).json({
          message: "O filtro de petFriendly deve ser true ou false.",
        });
      }
    }

    const plantas = await PlantRepository.findAllPlants(filters);
    return res.status(200).json(plantas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar plantas." });
  }
};

export const readPlantById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const planta = await PlantRepository.findPlantById(id);

    if (!planta) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    return res.status(200).json(planta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar planta." });
  }
};

export const updatePlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const existingPlant = await PlantRepository.findPlantById(id);
    if (!existingPlant) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    const {
      nome,
      especie,
      preco,
      estoque,
      luminosidade,
      petFriendly,
      regaACadaDias,
    } = req.body;

    if (preco !== undefined && (typeof preco !== "number" || preco <= 0)) {
      return res.status(400).json({
        message: "O preço deve ser maior que zero.",
      });
    }

    if (estoque !== undefined && (typeof estoque !== "number" || estoque < 0)) {
      return res.status(400).json({
        message: "O estoque não pode ser negativo.",
      });
    }

    if (
      regaACadaDias !== undefined &&
      (typeof regaACadaDias !== "number" || regaACadaDias < 1)
    ) {
      return res.status(400).json({
        message: "A frequência de rega deve ser de pelo menos 1 dia.",
      });
    }

    if (petFriendly !== undefined && typeof petFriendly !== "boolean") {
      return res.status(400).json({
        message: "Informe se a planta é amigável para pets.",
      });
    }

    if (
      luminosidade !== undefined &&
      !VALID_LUMINOSIDADES.includes(luminosidade)
    ) {
      return res.status(400).json({
        message: "Luminosidade inválida. Opções: SOMBRA, MEIA_SOMBRA ou SOL_PLENO.",
      });
    }

    const updatedPlanta = await PlantRepository.updatePlant(id, {
      nome: nome,
      especie: especie,
      preco: preco,
      estoque: estoque,
      luminosidade: luminosidade,
      petFriendly: petFriendly,
      regaACadaDias: regaACadaDias,
    });

    return res.status(200).json(updatedPlanta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar planta." });
  }
};

export const deletePlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const existingPlant = await PlantRepository.findPlantById(id);
    if (!existingPlant) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    await PlantRepository.deletePlant(id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar planta." });
  }
};

export const sellPlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const { quantidade } = req.body;

    if (
      quantidade === undefined ||
      typeof quantidade !== "number" ||
      !Number.isInteger(quantidade) ||
      quantidade <= 0
    ) {
      return res.status(400).json({
        message: "A quantidade de venda deve ser um número inteiro maior que zero.",
      });
    }

    const existingPlant = await PlantRepository.findPlantById(id);
    if (!existingPlant) {
      return res.status(404).json({ message: "Planta não encontrada." });
    }

    if (existingPlant.estoque < quantidade) {
      return res.status(400).json({
        message: `Estoque insuficiente. Quantidade disponível: ${existingPlant.estoque}.`,
      });
    }

    const updatedPlant = await PlantRepository.decrementStock(id, quantidade);
    return res.status(200).json(updatedPlant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao vender planta." });
  }
};

export const getTotalStockValue = async (req: Request, res: Response) => {
  try {
    const summary = await PlantRepository.getStockSummary();
    return res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao calcular estoque." });
  }
};