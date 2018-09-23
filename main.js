import localStorage from './local-storage.js';

console.log(localStorage);
const app = new Vue({
  el: '#app',
  data: {
    todos: [],
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
