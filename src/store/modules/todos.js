import Axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await Axios.get(
      "http://jsonplaceholder.typicode.com/todos"
    );

    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await Axios.post(
      "http://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );

    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await Axios.get(
      `http://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("setTodos", response.data);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
