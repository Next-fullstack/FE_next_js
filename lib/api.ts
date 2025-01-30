const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper function to get the token from localStorage (or context if you prefer)
const getAuthToken = () => {
  return localStorage.getItem('token'); // or use AuthContext if you're using React context for storing the token
};

// Handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text(); // Get raw response text
  return text ? JSON.parse(text) : null; // Parse JSON only if not empty
};

export const api = {
  // Auth API calls
  register: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  },

  // Todo API calls
  getTodos: async () => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
    });
    return handleResponse(response);
  },

  createTodo: async (todo: { name: string; priority?: string }) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  updateTodo: async (id: string, todo: { name: string }) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  deleteTodo: async (id: string) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
    });
    return handleResponse(response);
  },

  toggleTodoStatus: async (id: string) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}/status`, {
      method: "PUT",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
    });
    return handleResponse(response);
  },

  updatePriority: async (id: string, priority: string) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}/priority`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "", // Include token if available
      },
      body: JSON.stringify({ priority }),
    });
    return handleResponse(response);
  },
};
