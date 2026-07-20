import { Request, Response } from "express";
import { LocationService } from "./location.service";


const service =
new LocationService();


export class LocationController{


async update(
req:Request,
res:Response
){

const vendorId =
req.user!.id;


const result =
await service.updateLocation(
vendorId,
req.body
);


res.json({
success:true,
data:result
});


}



async nearby(
req:Request,
res:Response
){

const {
 latitude,
 longitude
}=req.query;


const result =
await service.getOnlineProfessionals(
 Number(latitude),
 Number(longitude)
);


res.json({
success:true,
data:result
});

}


}


export const locationController =
new LocationController();