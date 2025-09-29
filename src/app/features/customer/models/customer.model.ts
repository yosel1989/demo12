export interface CustomerDto {
  id: number;
  uuid: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  num_documento: string;
  pref_telefono: string;
  telefono: string;
  provincia: string;
  id_emp_registro: number | null;
  emp_registro: string | null;
  f_registro: string; // ISO 8601
  id_emp_modifico: number | null;
  emp_modifico: string | null;
  fechaModifico: string | null; // ISO 8601 o null
}






export interface CustomerPayloadDto {
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

export interface CustomerUpdatePayloadDto {
  uuid: string;
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



export interface CustomerCreateResponseDto {
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



export interface CustomerCollectionResponseDto {
  id: number;
  uuid: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  num_documento: string;
  pref_telefono: string;
  telefono: string;
  provincia: string;
  id_emp_registro: number | null;
  emp_registro: string | null;
  f_registro: string;
  id_emp_modifico: number | null;
  emp_modifico: string | null;
  fechaModifico: string | null;
}






export interface CustomerFindByIdResponseDto {
  id: number;
  uuid: string;
  nombre: string;
  slug: string;
  descripcion: string;
  f_inicio_venta: string;
  f_fin_venta: string;
  f_sorteo: string;
  f_ext_sorteo?: string;
  precio_rifa: number;
  numero_min: number;
  numero_max: number;
  flag_rifas: boolean;
  estado: string;
  id_emp_registro: number;
  emp_registro: string;
  f_registro: string;
  id_emp_modifico?: number;
  emp_modifico?: string;
  f_modifico?: string;
}




export interface CustomerCollectionQueryParamsDto{
  info: string;
	start: number;
	order: string;
	length: number;
	draw: number;
}



export interface SorteoChangeStatusPayloadDto{
  descripcion: string | null;
  uuid: string;
	estado: string;
}
