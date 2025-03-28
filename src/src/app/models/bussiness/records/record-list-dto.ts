export interface RecordListDto {
  id: string;
  locationName: string;
  machineName: string;
  customerName: string;
  machineSerialNumber: string;
  type: string;
  date: string;
  description: string;
}

export interface RecordDetailDto {
  id: string;
  type: string;
  date: string;
  description: string;
}

export interface MachineRecordInListDto {
  id: string;
  type: string;
  date: string;
  description: string;
}

export interface CreateRecordDetailDto {
  machineId: string;
  type: string;
  date: string;
  description: string;
}
export interface RecordFilter {
  searchText:string;
  customer:any[];
  location:any[];
  machine:any[];
}
