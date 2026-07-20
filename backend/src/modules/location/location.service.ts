import { LocationRepository } from "./location.repository";


export class LocationService {


private repository =
new LocationRepository();



async updateLocation(
vendorId:string,
data:any
){

return this.repository.updateLocation(
vendorId,
data
);

}



async getOnlineProfessionals(
latitude:number,
longitude:number
){

return this.repository.findNearbyProfessionals(
 latitude,
 longitude
);

}


}