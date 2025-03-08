import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';

export default function useUserLogs(
  { page = 1, size = 12, direction = 'ASC' }: Partial<LogsQueryParams> = {},
  queryOptions?: Partial<UseQueryOptions>
) {
  return useQuery({
    queryKey: userLogsKeys.logList({ page, size, direction }),
    queryFn: () => api.userLog.getUserLogs({ page, size, direction }),
    ...queryOptions,
  });
}
