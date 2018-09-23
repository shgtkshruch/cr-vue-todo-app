import localStorage from './local-storage.js';

console.log(localStorage);
const app = new Vue({
  el: '#app',
  data: {
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0,  label: '作業中' },
      { value: 1,  label: '完了' }
    ],
    current: -1,
  },
  created() {
    this.todos = localStorage.fetch();
  },
  methods: {
    add(event, value) {
      const comment = this.$refs.comment;

      if (!comment.value.length) return;

      this.todos.push({
        id: localStorage.uid++,
        comment: comment.value,
        state: 0,
      });

      comment.value = '';
    },
    changeState(todo) {
      todo.state = todo.state ? 0 : 1;
    },
    remove(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        return this.current < 0 ? true : this.current === todo.state;
      });
    },
    labels() {
      return this.options.reduce((a, b) => {
        return Object.assign(a, { [b.value]: b.label });
      }, {});
    },
  },
  watch: {
    todos: {
      handler(todos) {
        localStorage.save(todos);
      },
      deep: true,
    },
  },
});
