import { getIO } from "./socket";


export const sendBookingRequest = (
  vendorId: string,
  booking: any
) => {

  const io = getIO();

  io.to(`vendor_${vendorId}`)
    .emit(
      "new_booking",
      booking
    );

};



export const sendBookingStatusUpdate = (
  customerId: string,
  booking: any
) => {

  const io = getIO();

  io.to(`customer_${customerId}`)
    .emit(
      "booking_status_update",
      booking
    );

};