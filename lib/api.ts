export const api = {
  getTodos: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  createTodo: async (todo: { todo: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo, done: false })
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    return response.json();
  },

  updateTodo: async (id: string, todo: { todo: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    return response.json();
  },

  deleteTodo: async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }

    return response.json();
  },

  updatePriority: async (id: string, priority: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/priority`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priority })
    });

    if (!response.ok) {
      throw new Error('Failed to update priority');
    }

    return response.json();
  },
};
