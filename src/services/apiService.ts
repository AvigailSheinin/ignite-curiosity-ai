// API Service Layer - מחליף את Supabase
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Children API
  async getChildren() {
    return this.fetchAPI('/children');
  }

  async getChild(id: string) {
    return this.fetchAPI(`/children/${id}`);
  }

  async createChild(childData: any) {
    return this.fetchAPI('/children', {
      method: 'POST',
      body: JSON.stringify(childData),
    });
  }

  async updateChild(id: string, childData: any) {
    return this.fetchAPI(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(childData),
    });
  }

  async deleteChild(id: string) {
    return this.fetchAPI(`/children/${id}`, {
      method: 'DELETE',
    });
  }

  // Lessons API
  async getLessons() {
    return this.fetchAPI('/lessons');
  }

  async getLesson(id: string) {
    return this.fetchAPI(`/lessons/${id}`);
  }

  async createLesson(lessonData: any) {
    return this.fetchAPI('/lessons', {
      method: 'POST',
      body: JSON.stringify(lessonData),
    });
  }

  async updateLesson(id: string, lessonData: any) {
    return this.fetchAPI(`/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lessonData),
    });
  }

  async addParticipantToLesson(lessonId: string, childId: string) {
    return this.fetchAPI(`/lessons/${lessonId}/participants`, {
      method: 'POST',
      body: JSON.stringify({ childId }),
    });
  }

  async deleteLesson(id: string) {
    return this.fetchAPI(`/lessons/${id}`, {
      method: 'DELETE',
    });
  }

  // Messages API
  async getMessages() {
    return this.fetchAPI('/messages');
  }

  async createMessage(messageData: any) {
    return this.fetchAPI('/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async addReactionToMessage(messageId: string, reaction: string) {
    return this.fetchAPI(`/messages/${messageId}/reactions`, {
      method: 'POST',
      body: JSON.stringify({ reaction }),
    });
  }

  // Chat Sessions API
  async getChatSessions() {
    return this.fetchAPI('/chat-sessions');
  }

  async getChatSession(id: string) {
    return this.fetchAPI(`/chat-sessions/${id}`);
  }

  async createChatSession(sessionData: any) {
    return this.fetchAPI('/chat-sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async updateChatSession(id: string, sessionData: any) {
    return this.fetchAPI(`/chat-sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessionData),
    });
  }

  async addMessageToSession(sessionId: string, messageId: string) {
    return this.fetchAPI(`/chat-sessions/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ messageId }),
    });
  }

  async endChatSession(id: string) {
    return this.fetchAPI(`/chat-sessions/${id}/end`, {
      method: 'PATCH',
    });
  }
}

export const apiService = new ApiService();