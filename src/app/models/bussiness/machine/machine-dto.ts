export interface MachineListDto {
  id:string;
  model:string;
  locationName:string;
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
