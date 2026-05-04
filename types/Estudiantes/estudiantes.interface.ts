import { Sexo } from "./sexo.interface";
import { Etnia } from "./etnias.interface";

export interface Estudiante {
  id: number;
  nombre: string;
  paterno: string;
  materno?: string;
  direccion: string;

  sexo?: Sexo;
  etnia?: Etnia;
}
