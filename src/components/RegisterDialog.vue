<template>
  <div class="register">
    <div class="dialog">
      <h5>Welcome to Chat app</h5>
      <span
        >Please enter your name, email id and phone number to initiate
        conversation:</span
      >

      <form @submit="$emit('submit', $event, loginForm)">
        <input v-model="loginForm.fullName" placeholder="Name" type="text" />

        <input v-model="loginForm.email" placeholder="Email" type="text" />

        <input
          v-model="loginForm.phoneNumber"
          placeholder="Phone Number"
          type="text"
        />

        <button
          class="btn"
          :disabled="
            loginForm.fullName === '' ||
            loginForm.email === '' ||
            loginForm.phoneNumber === ''
          "
        >
          Enter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterDialog",
  data: () => ({
    loginForm: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  }),

  methods: {
    // This method will be called when a new message is sent
    onSubmit() {
      $emit("submit", $event, loginForm);
    },
  },
};
</script>

<style scoped>
.register {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  width: auto;
}

.dialog {
  border-radius: 10px;
  background: white;
  padding: 2rem;
  width: fit-content;
  width: 35%;
  margin: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-top: 1rem;
}

button {
  padding: 0.7rem;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.5;
}

h5 {
  margin: 0 0 0.5rem 0;
}

.btn {
  background: rgb(60, 180, 229);
}
</style>
