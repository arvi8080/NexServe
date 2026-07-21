import { AdminDashboardRepository } from "./admin.dashboard.repository";

export class AdminDashboardService {
  private repository = new AdminDashboardRepository();

  async getDashboardStats() {
    return this.repository.getDashboardStats();
  }
}
