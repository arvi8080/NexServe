import { AppError } from "../../common/errors/AppError";
import { LocationRepository } from "./location.repository";
import prisma from "../../config/prisma";


export class LocationService {


private repository =
new LocationRepository();



async updateLocation(
userId: string,
data: {
  latitude: number;
  longitude: number;
  isOnline: boolean;
}
){
  // Lookup vendor by userId first
  const vendor = await prisma.vendor.findUnique({
    where: { userId }
  });

  if (!vendor) {
    throw new AppError("Vendor profile not found", 404);
  }

  return this.repository.updateLocation(
    vendor.id,
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
