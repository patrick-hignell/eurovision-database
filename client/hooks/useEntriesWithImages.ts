import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import * as API from '../apis/entries.ts'

export function useEntriesWithImages() {
  // return useQuery({
  const query = useQuery({
    queryKey: ['entries'],
    queryFn: () => API.getAllEntriesWithImages(),
  })

  return {
    ...query,
    add: useAddEntry(),
    delete: useDeleteEntry(),
    edit: useEditEntry(),
  }
}

export function useEntryMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] })
    },
  })

  return mutation
}

export function useAddEntry() {
  return useEntryMutation(API.addEntry)
}

export function useDeleteEntry() {
  return useEntryMutation(API.deleteEntry)
}

export function useEditEntry() {
  return useEntryMutation(API.editEntry)
}
