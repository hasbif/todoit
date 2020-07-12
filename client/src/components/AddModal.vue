<template>
  <section>
    <b-button
      @click="showModal"
      icon-left="plus"
      style="width: 60px; height: 60px; border-radius: 50%; font-size: 30px;"
      type="is-danger"
    ></b-button>

    <b-modal :active.sync="isModalActive" scroll="keep">
      <div style="background-color: #ffeae6; height: 70vh; padding: 10%; border-radius: 30px">
        <b-field label="Things Todo" maxlength="50">
          <b-input v-model="todo"></b-input>
        </b-field>
        <b-field label="Due Date">
          <b-datetimepicker
            v-model="date"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            horizontal-time-picker
            size="is-small"
          ></b-datetimepicker>
        </b-field>
        <b-button
          @click="addTodo"
          icon-left="plus"
          style="width: 70px; height: 70px; border-radius: 50%; font-size: 30px; margin-top: 35%; margin-left:90%"
          type="is-danger"
        ></b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import url from "../database";
export default {
  data() {
    return {
      isModalActive: false,
      todo: "",
      date: null
    };
  },
  methods: {
    addTodo() {
      this.axios({
        url: `${url}todo`,
        method: "POST",
        data: { title: this.todo, due_date: this.date },
        headers: { access_token: localStorage.access_token }
      })
        .then(res => {
          this.$store.commit("ADD_List", res.data.data);
          this.isModalActive = false;
          this.$buefy.toast.open({
            duration: 3000,
            message: "added more things to do in your list",
            type: "is-danger"
          });
        })
        .catch(err => {
          console.log(err.response);
          this.isModalActive = false;
          this.$buefy.toast.open({
            duration: 3000,
            message: "whoops, something went wrong...",
            type: "is-warning"
          });
        });
    },
    showModal() {
      this.todo = "";
      this.date = null;
      this.isModalActive = true;
    }
  }
};
</script>

