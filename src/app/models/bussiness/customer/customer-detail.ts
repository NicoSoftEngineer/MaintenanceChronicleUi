import { LocationListDto } from "../location/location-list-dto";

export interface CustomerDetail {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  conpanyRegistrationId: string;
  locations: LocationListDto[];
}
