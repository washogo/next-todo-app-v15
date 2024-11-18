'use server';

import { headers } from 'next/headers';

/**
 * ベースURL取得
 */
export const getBaseUrl = async () => {
  const headersData = await headers();
  const protocol = headersData.get('x-forwarded-proto') || 'http';
  const host = headersData.get('host');
  return `${protocol}://${host}`;
};
