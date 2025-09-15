export interface SorteoDto {
  uuid: string;
  nombre: string;
  slug: string;
  descripcion: string;
  f_inicio_venta: string;
  f_fin_venta: string;
  f_sorteo: string;
  f_ext_sorteo: string;
  precio_rifa: number;
  numero_min: number;
  numero_max: number;
  flag_rifas: boolean;
  estado: string;
  id_emp_registro: number;
  emp_registro: string;
  f_registro: string;
  id_emp_modifico: number;
  emp_modifico: string;
  f_modifico: string;
  cant_rifas: number;
}





export interface SorteoPayloadDto {
  nombre: string;
  descripcion: string;
  f_inicio_venta: string;   // formato ISO 8601
  f_fin_venta: string;
  f_sorteo: string;
  f_ext_sorteo: string | null;
  precio_rifa: number;
  numero_min: number;
  numero_max: number;
  flag_rifas: boolean;
}

