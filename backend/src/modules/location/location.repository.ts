import { AvailabilityStatus } from "@prisma/client";
import prisma from "../../config/prisma";


export class LocationRepository {


async updateLocation(
 vendorId:string,
 data:{
  latitude:number;
  longitude:number;
  isOnline:boolean;
 }
){

return prisma.professionalLocation.upsert({

where:{
 vendorId
},

create:{
 vendorId,
 latitude: data.latitude,
 longitude: data.longitude,
 status: data.isOnline ? AvailabilityStatus.ONLINE : AvailabilityStatus.OFFLINE
},

update:{
 latitude: data.latitude,
 longitude: data.longitude,
 status: data.isOnline ? AvailabilityStatus.ONLINE : AvailabilityStatus.OFFLINE
}

});

}



async findNearbyProfessionals(
 latitude:number,
 longitude:number
){

const professionals =
await prisma.professionalLocation.findMany({

where:{
 status: AvailabilityStatus.ONLINE
},

include:{
 vendor:{
  select:{
   id:true,
   businessName:true,
   averageRating:true,
   services:true
  }
 }
}

});


return professionals.map((professional)=>{


const distance = this.calculateDistance(
 latitude,
 longitude,
 professional.latitude,
 professional.longitude
);


return {
 ...professional,
 distance
};


})
.sort(
(a,b)=>a.distance-b.distance
);


}

private calculateDistance(
lat1:number,
lon1:number,
lat2:number,
lon2:number
){

const R = 6371; // KM


const dLat =
(lat2-lat1) *
Math.PI / 180;


const dLon =
(lon2-lon1) *
Math.PI / 180;


const a =
Math.sin(dLat/2) *
Math.sin(dLat/2)
+
Math.cos(lat1*Math.PI/180)
*
Math.cos(lat2*Math.PI/180)
*
Math.sin(dLon/2)
*
Math.sin(dLon/2);


const c =
2 *
Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);


return Number(
(R*c).toFixed(2)
);

}


}