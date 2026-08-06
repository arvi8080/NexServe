import { Router } from "express";
import { vendorController } from "./vendor.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { validate } from "../../common/middleware/validate";
import { vendorRegisterSchema, updateVendorSchema } from "./vendor.validation";
import { asyncHandler } from "../../common/utils/asyncHandler";
import prisma from "../../config/prisma";

const router = Router();

// GET info handler for GET /api/v1/vendor/register in browser/Swagger
router.get("/register", (_req, res) => {
  res.json({
    success: true,
    message: "GlowHome Vendor Business Registration API Endpoint",
    methodRequired: "POST",
    endpoint: "/api/v1/vendor/register",
    publicOnboardEndpoint: "/api/v1/vendor/public-onboard",
    requiresAuth: "Bearer <JWT>",
    requiredFields: [
      "businessName",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "description"
    ],
    documentation: "/api-docs"
  });
});

// POST handler for public parlour onboarding (direct database insertion)
router.post(
  "/public-onboard",
  asyncHandler(async (req, res) => {
    const { ownerName, businessName, phone, address, city, state, country, services, description } = req.body;

    const email = `vendor_${Date.now()}@glowhome.np`;
    let user = await prisma.user.findFirst({
      where: { phone: phone ? String(phone) : undefined }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: ownerName || "Parlour Owner",
          lastName: "",
          email,
          phone: phone ? String(phone) : `+977${Date.now()}`,
          password: "dummy_hashed_password",
          role: "VENDOR_OWNER",
          isEmailVerified: true
        }
      });
    }

    // Create Vendor profile with status APPROVED for immediate public listing
    const vendor = await prisma.vendor.create({
      data: {
        userId: user.id,
        businessName: businessName || "Glow & Grace Studio",
        description: description || `Certified doorstep parlour by ${ownerName || "Owner"} in ${address || city}.`,
        phone: phone ? String(phone) : "+977 9808422407",
        address: address || "Durbar Marg",
        city: city || "Kathmandu",
        state: state || "Bagmati Province",
        country: country || "Nepal",
        status: "APPROVED",
        averageRating: 4.9,
        totalReviews: 120
      }
    });

    // Create services if provided
    const createdServices: any[] = [];
    if (Array.isArray(services) && services.length > 0) {
      for (const s of services) {
        let categoryEnum: any = "FACIAL";
        const catStr = String(s.category || "").toUpperCase().replace(/\s+/g, "_");
        if (["FACIAL", "HAIR_CUT", "HAIR_SPA", "HAIR_COLOR", "WAXING", "THREADING", "MANICURE", "PEDICURE", "PARTY_MAKEUP", "BRIDAL_MAKEUP"].includes(catStr)) {
          categoryEnum = catStr;
        }

        const created = await prisma.service.create({
          data: {
            vendorId: vendor.id,
            title: s.name || s.title || "Diamond Hydra-Glow Facial",
            description: s.description || `Deep-cleansing diamond exfoliation with hyaluronic glow boost offered by ${businessName}.`,
            category: categoryEnum,
            price: Number(s.price) || 1499,
            duration: parseInt(s.duration) || 60,
            image: s.image || "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
            isActive: true
          }
        });
        createdServices.push({ ...created, vendor });
      }
    }

    return res.status(201).json({
      success: true,
      message: "Parlour and services registered successfully in database",
      data: {
        vendor,
        services: createdServices
      }
    });
  })
);

// POST handler for authenticated vendor registration
router.post(
  "/register",
  authenticate,
  authorize("CUSTOMER", "SUPER_ADMIN"),
  validate(vendorRegisterSchema),
  asyncHandler(vendorController.register)
);

router.get(
  "/profile",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  asyncHandler(vendorController.getVendorProfile)
);

router.put(
  "/profile",
  authenticate,
  authorize("VENDOR", "SUPER_ADMIN"),
  validate(updateVendorSchema),
  asyncHandler(vendorController.updateProfile)
);

export default router;