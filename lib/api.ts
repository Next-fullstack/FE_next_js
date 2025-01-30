const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper function to get the token from cookies
const getAuthToken = () => {
  // Parse cookies
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Helper function to set token in cookies
export const setAuthToken = (token: string) => {
  // Set cookie with secure flags and expiry (7 days)
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict`;
};

// Helper function to remove token from cookies
export const removeAuthToken = () => {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};

// Handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const api = {
  // Auth API calls
  register: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await handleResponse(response);
    if (data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  // Todo API calls
  getTodos: async () => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });
    return handleResponse(response);
  },

  createTodo: async (todo: { name: string; priority: string }) => {
    console.log("🚀 ~ createTodo: ~ todo:", todo)
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        todo: todo.name, // Sesuaikan dengan expected payload dari backend
        priority: todo.priority
      }),
    });
    return handleResponse(response);
  },

  updateTodo: async (id: string, todo: { name: string }) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
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
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });
    return handleResponse(response);
  },

  toggleTodoStatus: async (id: string) => {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos/${id}/status`, {
      method: "PUT",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
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
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ priority }),
    });
    return handleResponse(response);
  },

  logout: () => {
    removeAuthToken();
  }
};