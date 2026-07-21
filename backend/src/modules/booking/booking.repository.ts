import prisma from "../../config/prisma";

export class BookingRepository {

  async findServiceById(id: string) {
  return prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      vendor: {
        include: {
          location: true,
        },
      },
    },
  });
}

  async createBooking(data: {
    customerId: string;
    vendorId: string;
    serviceId: string;
    bookingDate: Date;
    address: string;
    notes?: string;
    totalAmount: number;
  }) {
    return prisma.booking.create({
      data,
    });
  }


  async getCustomerBookings(customerId: string) {
  return prisma.booking.findMany({
    where: {
      customerId,
    },
    include: {
      service: true,
      vendor: {
        select: {
          id: true,
          businessName: true,
          city: true,
          state: true,
          phone: true,
        },
      },
    },
    orderBy: {
      bookingDate: "desc",
    },
  });
}



async getVendorBookings(vendorId: string) {
  return prisma.booking.findMany({
    where: {
      vendorId,
    },
    include: {
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      service: {
        select: {
          id: true,
          title: true,
          category: true,
          price: true,
          duration: true,
        },
      },
    },
    orderBy: {
      bookingDate: "desc",
    },
  });
}


async findVendorByUserId(userId: string) {
  return prisma.vendor.findUnique({
    where: {
      userId,
    },
  });
}

async getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      vendor: {
        select: {
          userId: true,
        },
      },
    },
  });
}

async updateBookingStatus(
  id: string,
  status: any
) {
  return prisma.booking.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

async updateProfessionalStatus(
  vendorId: string,
  status: "ONLINE" | "BUSY" | "OFFLINE"
) {
  return prisma.professionalLocation.update({
    where: {
      vendorId,
    },
    data: {
      status,
    },
  });
}

async hasBookingConflict(
  vendorId: string,
  bookingDate: Date
) {

  return prisma.booking.findFirst({

    where:{

      vendorId,

      bookingDate,

      status:{
        in:[
          "PENDING",
          "ACCEPTED",
          "ONGOING"
        ]
      }

    }

  });

}


async getVendorActiveBookings(
  vendorId: string
) {

  return prisma.booking.findMany({

    where: {

      vendorId,

      status: {
        in: [
          "PENDING",
          "ACCEPTED",
          "ONGOING"
        ]
      }

    },

    include: {
      service: true
    }

  });

}



async rescheduleBooking(
  bookingId: string,
  bookingDate: Date
) {

  return prisma.booking.update({

    where: {
      id: bookingId
    },

    data: {
      bookingDate
    }

  });

}


}