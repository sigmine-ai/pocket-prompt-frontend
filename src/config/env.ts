/**
 * 환경 변수 관련 상수들을 중앙에서 관리하는 파일입니다.
 */

export const isProduction = process.env.APP_ENV === "production";
export const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";
