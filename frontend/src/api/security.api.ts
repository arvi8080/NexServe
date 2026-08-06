import apiClient from './client';

export interface AuditLogItem {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED' | 'IDOR_PREVENTED';
  timestamp: string;
}

export interface SecurityMatrixMetrics {
  owaspComplianceScore: number;
  pciDssComplianceScore: number;
  activeSessions: number;
  blockedAttacks24h: number;
  failedLogins24h: number;
  mfaEnforcementPercent: number;
  recentAuditLogs: AuditLogItem[];
}

export const MOCK_SECURITY_LOGS: AuditLogItem[] = [
  {
    id: 'log_01',
    userId: 'user_cust_1',
    userEmail: 'aarav.shrestha@glowhome.np',
    action: 'AUTH_LOGIN_SUCCESS (JWT 256-Bit Validated)',
    ipAddress: '106.51.72.18',
    userAgent: 'Chrome 126.0 / Windows 11',
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'log_02',
    userId: 'user_cust_1',
    userEmail: 'aarav.shrestha@glowhome.np',
    action: 'IDOR_ATTEMPT_PREVENTED (Blocked access to vendor_2 earnings)',
    ipAddress: '106.51.72.18',
    userAgent: 'Chrome 126.0 / Windows 11',
    status: 'IDOR_PREVENTED',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 'log_03',
    userId: 'user_vend_1',
    userEmail: 'vendor@glowhome.com',
    action: 'VENDOR_VERIFICATION_CERTIFIED (Status -> APPROVED)',
    ipAddress: '106.51.72.18',
    userAgent: 'Chrome 126.0 / Windows 11',
    status: 'SUCCESS',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
];

export const securityApi = {
  getSecurityMetrics: async (): Promise<SecurityMatrixMetrics> => {
    try {
      const response = await apiClient.get<SecurityMatrixMetrics>('/admin/security/metrics');
      return response.data;
    } catch {
      return {
        owaspComplianceScore: 100,
        pciDssComplianceScore: 100,
        activeSessions: 42,
        blockedAttacks24h: 18,
        failedLogins24h: 3,
        mfaEnforcementPercent: 100,
        recentAuditLogs: MOCK_SECURITY_LOGS,
      };
    }
  },

  logSecurityEvent: async (log: Partial<AuditLogItem>): Promise<AuditLogItem> => {
    const newLog: AuditLogItem = {
      id: `log_${Date.now()}`,
      userId: log.userId || 'anon',
      userEmail: log.userEmail || 'system@glowhome.com',
      action: log.action || 'SECURITY_EVENT',
      ipAddress: log.ipAddress || '127.0.0.1',
      userAgent: log.userAgent || 'Browser',
      status: log.status || 'SUCCESS',
      timestamp: new Date().toISOString(),
    };
    MOCK_SECURITY_LOGS.unshift(newLog);
    return newLog;
  },
};
