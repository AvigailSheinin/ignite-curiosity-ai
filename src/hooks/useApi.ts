import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';
import { Lesson, Child, Message, ChatSession } from '@/types/lesson';

// Children hooks
export const useChildren = () => {
  return useQuery({
    queryKey: ['children'],
    queryFn: apiService.getChildren,
  });
};

export const useChild = (id: string) => {
  return useQuery({
    queryKey: ['child', id],
    queryFn: () => apiService.getChild(id),
    enabled: !!id,
  });
};

export const useCreateChild = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] });
    },
  });
};

// Lessons hooks
export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: apiService.getLessons,
  });
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => apiService.getLesson(id),
    enabled: !!id,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};

// Messages hooks
export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: apiService.getMessages,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    },
  });
};

// Chat Sessions hooks
export const useChatSessions = () => {
  return useQuery({
    queryKey: ['chat-sessions'],
    queryFn: apiService.getChatSessions,
  });
};

export const useChatSession = (id: string) => {
  return useQuery({
    queryKey: ['chat-session', id],
    queryFn: () => apiService.getChatSession(id),
    enabled: !!id,
  });
};

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createChatSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    },
  });
};

export const useUpdateChatSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiService.updateChatSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    },
  });
};