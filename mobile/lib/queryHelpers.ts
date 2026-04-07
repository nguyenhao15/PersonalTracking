import {
  QueryFunctionContext,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query';

type RequestWithSignal<TData, TParams = void> = (args: {
  params: TParams;
  signal?: AbortSignal;
}) => Promise<TData>;

export const withAbortSignal =
  <TData, TParams = void>(
    request: RequestWithSignal<TData, TParams>,
    params: TParams,
  ) =>
  ({ signal }: QueryFunctionContext) =>
    request({ params, signal });

export const useAppQuery = <
  TData,
  TParams = void,
  TQueryKey extends QueryKey = QueryKey,
>(
  config: {
    queryKey: TQueryKey;
    request: RequestWithSignal<TData, TParams>;
    params: TParams;
  } & Omit<
    UseQueryOptions<TData, Error, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { queryKey, request, params, ...options } = config;

  return useQuery({
    queryKey,
    queryFn: ({ signal }) => request({ params, signal }),
    ...options,
  });
};
