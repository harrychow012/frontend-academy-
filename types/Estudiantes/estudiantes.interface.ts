import { Etnia } from "../etnias.interface";
import { Sexo } from "../sexo.interface";

export interface Estudiante {
  id: number;
  nombre: string;
  paterno: string;
  materno?: string;
  direccion: string;

  sexo?: Sexo;
  etnia?: Etnia;
}
