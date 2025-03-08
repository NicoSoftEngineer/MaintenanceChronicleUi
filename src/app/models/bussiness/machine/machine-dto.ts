export interface MachineListDto {
  id:string;
  model:string;
  locationName:string;
  customerName:string;
}
export interface NewMachineDetailDto {
  id:string;
  model:string;
  manufacture:string;
  serialNumber:string;
  color:string;
  inUseSince:string;
  locationId:string;
}
export interface MachineDetailDto {
  id:string;
  model:string;
  manufacture:string;
  serialNumber:string;
  color:string;
  inUseSince:string;
}
export interface MachineInFilterDto {
  id:string;
  name:string;
}
export interface MachineFilter {
  searchText:string;
  customer:any[];
  location:any[];
}
