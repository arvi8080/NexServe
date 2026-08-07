import { AppError } from "../../common/errors/AppError";
import { ServiceRepository } from "./service.repository";

export class ServiceService {
  private repository = new ServiceRepository();

  async createService(
    userId: string,
    data: {
      title: string;
      description: string;
      category: any;
      price: number;
      duration: number;
      image?: string;
    }
  ) {
    const vendor = await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    if (vendor.status !== "APPROVED") {
      throw new AppError("Vendor is not approved", 403);
    }

    return this.repository.createService({
      vendorId: vendor.id,
      ...data,
    });
  }

  async getMyServices(userId: string) {
    const vendor = await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    return this.repository.getVendorServices(vendor.id);
  }

  async getAllServices() {
    return this.repository.getAllServices();
  }

  async getService(id: string) {
    let service = await this.repository.getServiceById(id);

    if (!service) {
      const seedServices: Record<string, any> = {
        service_1: {
          id: 'service_1',
          vendorId: 'vendor_1',
          title: 'Diamond Hydra-Glow Facial Cleanup',
          description: 'Deep-cleansing diamond exfoliation with hyaluronic glow boost.',
          category: 'FACIAL',
          price: 1499,
          duration: 60,
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
          isActive: true,
          vendor: {
            id: 'vendor_1',
            businessName: 'Glow & Grace Studio',
            address: 'Koramangala, Durbar Marg',
            city: 'Kathmandu',
            state: 'Bagmati Province',
            country: 'Nepal',
            averageRating: 4.9,
            totalReviews: 120,
          },
        },
        service_2: {
          id: 'service_2',
          vendorId: 'vendor_1',
          title: 'Herbal Keratin Hair Spa & Moisture Lock',
          description: 'Intensive hair repair spa treatment with steam and deep conditioning mask.',
          category: 'HAIR_SPA',
          price: 3499,
          duration: 75,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
          isActive: true,
          vendor: {
            id: 'vendor_1',
            businessName: 'Glow & Grace Studio',
            address: 'Durbar Marg',
            city: 'Kathmandu',
            state: 'Bagmati Province',
            country: 'Nepal',
            averageRating: 4.9,
            totalReviews: 120,
          },
        },
        service_3: {
          id: 'service_3',
          vendorId: 'vendor_2',
          title: 'Trending Layered Haircut & Blowdry',
          description: 'Personalized haircut consultation, wash, layer precision cut and professional blowdry.',
          category: 'HAIR_CUT',
          price: 1499,
          duration: 45,
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
          isActive: true,
          vendor: {
            id: 'vendor_2',
            businessName: 'Himalayan Touch Home Spa Studio',
            address: 'Jhamsikhel',
            city: 'Lalitpur',
            state: 'Bagmati Province',
            country: 'Nepal',
            averageRating: 4.8,
            totalReviews: 94,
          },
        },
        service_4: {
          id: 'service_4',
          vendorId: 'vendor_1',
          title: 'Royal HD Party Makeup Package',
          description: 'Waterproof long-stay HD glam makeup, eyelash extensions and hair styling.',
          category: 'PARTY_MAKEUP',
          price: 4999,
          duration: 90,
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
          isActive: true,
          vendor: {
            id: 'vendor_1',
            businessName: 'Glow & Grace Studio',
            address: 'Durbar Marg',
            city: 'Kathmandu',
            state: 'Bagmati Province',
            country: 'Nepal',
            averageRating: 4.9,
            totalReviews: 120,
          },
        },
      };

      if (seedServices[id]) {
        return seedServices[id];
      }

      throw new AppError("Service not found", 404);
    }

    return service;
  }

  async updateService(userId: string, serviceId: string, data: any) {
    const vendor = await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    if (vendor.status !== "APPROVED") {
      throw new AppError("Vendor is not approved", 403);
    }

    const service = await this.repository.getServiceById(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.vendorId !== vendor.id) {
      throw new AppError("You can update only your own services", 403);
    }

    return this.repository.updateService(serviceId, data);
  }

  async deleteService(userId: string, serviceId: string) {
    const vendor = await this.repository.findVendorByUserId(userId);

    if (!vendor) {
      throw new AppError("Vendor not found", 404);
    }

    if (vendor.status !== "APPROVED") {
      throw new AppError("Vendor is not approved", 403);
    }

    const service = await this.repository.getServiceById(serviceId);

    if (!service) {
      throw new AppError("Service not found", 404);
    }

    if (service.vendorId !== vendor.id) {
      throw new AppError("You can delete only your own services", 403);
    }

    await this.repository.deleteService(serviceId);
    return;
  }

  async searchServices(filters: {
    search?: string;
    category?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    return this.repository.searchServices(filters);
  }
}