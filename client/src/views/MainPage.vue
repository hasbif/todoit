<template>
  <div style="width: 65vw; padding-top: 10vh">
    <h1 style="font-size: 40px; font-weight: bold; border-bottom: 2px solid #ff3860;">Todo It</h1>
    <div style="display:flex; justify-content: space-between; padding:15px; align-items: center">
      <h1 style="font-size: 20px">Welcome, {{email}}</h1>

      <div style="display:flex; justify-content: flex-end; align-items: center">
        <b-button
          @click="logout"
          icon-left="logout-variant"
          type="is-warning"
          style="height: 50px; width: 50px; border-radius: 50%; font-size: 25px; margin-right: 10px"
        ></b-button>
        <Modal style="margin-right: 10px"></Modal>
      </div>
    </div>

    <div
      style="display:flex; flex-direction: column; justify-content: center; align-items: center;"
    >
      <TodoList v-for="todo in todoList" :key="todo.id" :todo="todo"></TodoList>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import Modal from "../components/AddModal.vue";
import TodoList from "../components/TodoList.vue";
export default {
  name: "Home",
  components: {
    Modal,
    TodoList
  },
  computed: {
    todoList() {
      let filterList = [...this.$store.state.todoList];
      let complete = filterList.filter(word => word.status == true);
      let incomplete = filterList.filter(word => word.status == false);
      incomplete.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      complete.sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
      let sortList = [...incomplete, ...complete];
      return sortList;
    }
  },
  data: function() {
    return {
      email: localStorage.email
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("email");
      this.$router.push("/");
      this.$buefy.toast.open({
        duration: 3000,
        message: "successfully logged out",
        type: "is-danger"
      });
    }
  },
  watch: {
    todoList(newvalue, old) {}
  }
};
</script>