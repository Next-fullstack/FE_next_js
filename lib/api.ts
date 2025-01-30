const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper function to get the token from cookies
const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Helper function to set token in cookies
export const setAuthToken = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict`;
};

// Helper function to remove token from cookies
export const removeAuthToken = () => {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
};

// Handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  console.log("🚀 ~ response.text():", text);  // Log the raw response text

  if (!text) {
    console.error("Empty response body received.");
    return null;  // Return null if the response body is empty
  }

  try {
    return JSON.parse(text);  // Parse and return the response JSON
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;  // Return null if the response cannot be parsed
  }
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
    if (data?.token) {
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
    if (data?.token) {
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

    const data = await handleResponse(response);
    return Array.isArray(data) ? data : [];
  },

  createTodo: async (todo: { todo: string; priority: string;done:boolean }) => {
    console.log("🚀 ~ createTodo: ~ todo:", todo);
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        todo: todo.todo,
        done: todo.done,
        priority: todo.priority
      }),
    });

    console.log("🚀 ~ createTodo response status:", response.status);  // Log the response status

    const data = await handleResponse(response);
    console.log("🚀 ~ createTodo response: ~ data:", data);

    if (!data || !data.id) {
      console.error("Error: Failed to create todo. Response data is invalid.");
      return null;
    }

    return {
      id: data.id,
      name: data.todo,
      priority: data.priority,
      done: data.done || false,  // Default to false if done is not included
    };
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
  },
};
