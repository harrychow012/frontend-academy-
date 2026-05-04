export interface Docente {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  direccion: string;
  cedula: string;
  telefono: string;

  sexo_id: number;
  etnia_id: number;
  cargo_id: number;

  sexo?: {
    id: number;
    nombre: string;
  };

  etnia?: {
    id: number;
    nombre: string;
  };

  cargo?: {
    id: number;
    nombre: string;
  };
}
