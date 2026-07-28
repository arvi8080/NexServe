import { VerificationBadge } from '@/types';

export interface TrustScoreMetrics {
  hasIdentityVerified: boolean;
  hasSkillCertificate: boolean;
  completedJobsCount: number;
  averageRating: number;
  cancellationRatePercent: number;
}

export const calculateVendorTrustScore = (metrics: TrustScoreMetrics): number => {
  let score = 0;

  // 1. Identity Verification (+25 pts)
  if (metrics.hasIdentityVerified) {
    score += 25;
  }

  // 2. Skill & Professional Certification (+20 pts)
  if (metrics.hasSkillCertificate) {
    score += 20;
  }

  // 3. Completed Jobs (>50 jobs = +20 pts, >20 jobs = +10 pts)
  if (metrics.completedJobsCount >= 50) {
    score += 20;
  } else if (metrics.completedJobsCount >= 20) {
    score += 10;
  } else if (metrics.completedJobsCount > 0) {
    score += 5;
  }

  // 4. Rating Performance (4.9-5.0★ = +25 pts, 4.5-4.8★ = +15 pts)
  if (metrics.averageRating >= 4.9) {
    score += 25;
  } else if (metrics.averageRating >= 4.5) {
    score += 15;
  } else if (metrics.averageRating >= 4.0) {
    score += 10;
  }

  // 5. Low Cancellation Rate (<2% = +10 pts, <5% = +5 pts)
  if (metrics.cancellationRatePercent <= 2.0) {
    score += 10;
  } else if (metrics.cancellationRatePercent <= 5.0) {
    score += 5;
  }

  return Math.min(100, Math.max(0, score));
};

export const evaluateTrustBadges = (metrics: TrustScoreMetrics, score: number): VerificationBadge[] => {
  const badges: VerificationBadge[] = [];

  if (metrics.hasIdentityVerified) {
    badges.push('VERIFIED_IDENTITY');
  }

  if (metrics.hasSkillCertificate) {
    badges.push('VERIFIED_PROFESSIONAL');
  }

  if (metrics.averageRating >= 4.8 && metrics.completedJobsCount >= 20) {
    badges.push('TOP_RATED');
  }

  if (score >= 95) {
    badges.push('ELITE_PARTNER');
  } else if (score >= 85) {
    badges.push('RECOMMENDED');
  }

  return badges;
};
