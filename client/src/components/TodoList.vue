<template>
  <section style="padding: 2px">
    <div
      v-if="!todo.status"
      style="display: flex; width: 65vw; border: 2px solid #ff3860; border-radius: 20px; background-color:#d4ff69;"
    >
      <div style="flex: 10; margin: 10px 0px 10px 25px;">
        <h1 style="font-size: 24px; font-weight:bold; text-align: left">{{todo.title}}</h1>
        <h6 style="font-size: 16px; text-align: left">{{dateFormat}}</h6>
      </div>
      <div
        style="flex: 1; width: 100%; display: flex; align-items: center; justify-content: center;"
      >
        <b-button
          @click="showModal"
          icon-left="pencil"
          type="is-danger"
          style="height: 50px; width: 50px; border-radius: 50%;"
        ></b-button>
      </div>
    </div>

    <div
      v-else
      style="display: flex; width: 65vw; border: 2px solid #ff3860; border-radius: 20px; background-color:#6d8034;"
    >
      <div style="flex: 10; margin: 10px 0px 10px 25px;">
        <h1
          style="font-size: 24px; font-weight:bold; text-align: left; text-decoration:line-through;font-style: italic"
        >{{todo.title}}</h1>
        <h6
          style="font-size: 16px; text-align: left; text-decoration:line-through;font-style: italic"
        >{{dateFormat}}</h6>
      </div>
      <div
        style="flex: 1; width: 100%; display: flex; align-items: center; justify-content: center;"
      >
        <b-button
          @click="showModal"
          icon-left="pencil"
          type="is-danger"
          outlined
          style="height: 50px; width: 50px; border-radius: 50%;"
        ></b-button>
      </div>
    </div>

    <b-modal :active.sync="isModalActive" scroll="keep">
      <div style="background-color: #ffeae6; height: 70vh; padding: 10%; border-radius: 30px">
        <b-field label="Things Todo" maxlength="50">
          <b-input v-model="editTitle"></b-input>
        </b-field>
        <b-field label="Due Date">
          <b-datetimepicker
            v-model="editDate"
            rounded
            placeholder="Click to select..."
            icon="calendar-today"
            horizontal-time-picker
            size="is-small"
          ></b-datetimepicker>
        </b-field>
        <b-field label="Status"></b-field>
        <b-switch v-model="editStatus" size="is-large" style="margin-left:23px;"></b-switch>
        <div style="display: flex; justify-content: space-between; padding-top: 20%">
          <b-button
            @click="removeTodo"
            icon-left="delete"
            type="is-warning"
            style="height: 70px; width: 70px; border-radius: 50%;"
          ></b-button>
          <b-button
            @click="editTodo"
            icon-left="check-bold"
            type="is-danger"
            style="height: 70px; width: 70px; border-radius: 50%;"
          ></b-button>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import url from "../database";
import moment from "moment";

export default {
  data() {
    return {
      isModalActive: false,
      editTitle: "",
      editDate: null,
      editStatus: false
    };
  },
  props: ["todo"],
  computed: {
    dateFormat() {
      let newDate = new Date(this.todo.due_date);
      return moment(this.todo.due_date).format("lll");
    }
  },
  methods: {
    editTodo() {
      this.axios({
        url: `${url}todo/${this.todo.id}`,
        method: "PUT",
        data: {
          title: this.editTitle,
          due_date: this.editDate,
          status: this.editStatus
        },
        headers: { access_token: localStorage.access_token }
      })
        .then(res => {
          if (this.editStatus && !this.todo.status) {
            this.notifyMe(this.editTitle);
          }
          this.$store.dispatch("getTodoList");
          this.isModalActive = false;
          this.toastGood("some things in your list has changed");
        })
        .catch(err => {
          console.log(err.response);
          this.isModalActive = false;
          this.toastBad();
        });
    },
    removeTodo() {
      this.axios({
        url: `${url}todo/${this.todo.id}`,
        method: "DELETE",
        headers: { access_token: localStorage.access_token }
      })
        .then(res => {
          this.$store.commit("REMOVE_List", this.todo.id);
          this.isModalActive = false;
          this.toastGood("item removed");
        })
        .catch(err => {
          console.log(err.response);
          this.isModalActive = false;
          this.toastBad();
        });
    },
    showModal() {
      this.editTitle = this.todo.title;
      this.editDate = new Date(this.todo.due_date);
      this.editStatus = this.todo.status;
      this.isModalActive = true;
    },
    toastGood(msg) {
      this.$buefy.toast.open({
        duration: 3000,
        message: msg,
        type: "is-danger"
      });
    },
    toastBad() {
      this.$buefy.toast.open({
        duration: 3000,
        message: `whoops, something went wrong..`,
        type: "is-warning"
      });
    },
    notifyMe(task) {
      if (!window.Notification) {
        console.log("Browser does not support notifications.");
      } else {
        // check if permission is already granted
        if (Notification.permission === "granted") {
          // show notification here
          var notify = new Notification(task + " Completed");
        } else {
          // request permission from user
          Notification.requestPermission()
            .then(function(p) {
              if (p === "granted") {
                // show notification here
                var notify = new Notification(task + " Completed");
              } else {
                console.log("User blocked notifications.");
              }
            })
            .catch(function(err) {
              console.error(err);
            });
        }
      }
    }
  }
};
</script>

