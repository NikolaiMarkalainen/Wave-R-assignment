import type { ApiResult, MessageResult } from '@/types/types';

export const handleApiResult = async (
  serviceCall: () => Promise<ApiResult>,
): Promise<MessageResult> => {
  const result = await serviceCall();
  if (result.ok) {
    return { success: true, message: result.message || 'Success' };
  }
  return { success: false, message: result.message || 'Something went wrong' };
};
