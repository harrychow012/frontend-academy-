"use server";
import { Cargo, Etnia, Sexo } from "@/types";
import {
  CreateDocenteDto,
  UpdateDocenteDto,
} from "@/types/Docentes/createDocente.interface";
import { Docente } from "@/types/Docentes/docentes.interface";
import { revalidatePath } from "next/cache";

const URL = process.env.GATEWAY_URL;

export async function getAllSexos(): Promise<Sexo[]> {
  const res = await fetch(`${URL}/relaciones/sexo`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (data.data ?? []) as Sexo[];
}

export async function getAllEtnias(): Promise<Etnia[]> {
  const res = await fetch(`${URL}/relaciones/etnia`, {
    cache: "no-store",
  });

  const data = await res.json();
  return (data.data ?? []) as Etnia[];
}

export async function getAllCargos(): Promise<Cargo[]> {
  const res = await fetch(`${URL}/relaciones/cargo`, {
    cache: "no-store",
  });

  const data = await res.json();
  return (data.data ?? []) as Cargo[];
}

export async function getAllDocentes(): Promise<Docente[]> {
  const res = await fetch(`${URL}/docentes`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener docentes");

  const data = await res.json();

  return data.data ?? [];
}

export async function getOneDocente(id: number): Promise<Docente> {
  const res = await fetch(`${URL}/docentes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener docente");

  const data = await res.json();
  return data.data as Docente;
}

export async function createDocente(body: CreateDocenteDto) {
  const res = await fetch(`${URL}/docentes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error al crear docente");
  }

  revalidatePath("/docentes");
}

export async function updateDocente(id: number, body: UpdateDocenteDto) {
  const res = await fetch(`${URL}/docentes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar docente");
  }

  revalidatePath("/docentes");
}
export async function deleteDocente(formData: FormData) {
  const id = Number(formData.get("id"));

  const response = await fetch(`${URL}/docentes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el docente");
  }

  revalidatePath("/docentes");
}
