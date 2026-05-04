export interface CreateDocenteDto {
  nombres: string;
  apellidos: string;
  email: string;
  direccion: string;
  cedula: string;
  telefono: string;
  sexo_id: number;
  etnia_id: number;
  cargo_id: number;
}
export type UpdateDocenteDto = Partial<CreateDocenteDto>;
