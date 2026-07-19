import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { successResponse } from "../../common/responses/apiResponse";
import { asyncHandler } from "../../common/utils/asyncHandler";


const authService = new AuthService();


export const register = asyncHandler(
async (
req:Request,
res:Response
)=>{


const user =
await authService.register(req.body);


return res.status(201).json(
successResponse(
"User registered successfully",
user
)
);


});