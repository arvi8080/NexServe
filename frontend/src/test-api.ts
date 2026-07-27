import { authApi } from './api/auth';
import { serviceApi } from './api/service';
import { bookingApi } from './api/booking';
import { notificationApi } from './api/notification';
import { adminApi } from './api/admin';

export async function verifyAllBackendApis() {
  console.log('--- NEXSERVE BACKEND API VERIFICATION LOG ---');

  // 1. Auth API
  const user = await authApi.getMe();
  console.log('✓ Auth API (getMe):', user.email, `Role: ${user.role}`);

  // 2. Services API
  const services = await serviceApi.getAllServices();
  console.log(`✓ Service API (getAllServices): ${services.length} services loaded.`);

  if (services.length > 0) {
    const detail = await serviceApi.getServiceById(services[0].id);
    console.log('✓ Service Details API (getServiceById):', detail.title, `(${detail.price} INR)`);
  }

  // 3. Booking API
  const bookings = await bookingApi.getMyBookings();
  console.log(`✓ Booking API (getMyBookings): ${bookings.length} customer bookings.`);

  const newBooking = await bookingApi.createBooking({
    serviceId: services[0]?.id || 's1',
    bookingDate: new Date().toISOString(),
    address: '77 Koramangala 10th Main, Bengaluru',
    notes: 'API Verification Test',
  });
  console.log('✓ Create Booking API (createBooking): Booking ID', newBooking.id, `Status: ${newBooking.status}`);

  // 4. Notification API
  const notifications = await notificationApi.getNotifications();
  console.log(`✓ Notification API (getNotifications): ${notifications.length} notifications.`);

  // 5. Admin API
  const stats = await adminApi.getDashboardStats();
  console.log('✓ Admin API (getDashboardStats): Total Users', stats.totalUsers, '| Total Revenue', stats.totalRevenue);

  const pending = await adminApi.getPendingVendors();
  console.log(`✓ Admin Pending Vendors API (getPendingVendors): ${pending.length} pending audits.`);

  return true;
}
