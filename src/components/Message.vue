<template>
  <div :class="['message', { dark }]">
    <h5>{{ author }}</h5>
    {{ text }}

    <p
      class="pointer p-hover"
      v-on:click="$emit('onActionSelect', $event, action)"
      v-for="(action, index) in actions"
      :key="index"
    >
      ({{ index + 1 }}) {{ action.label }}

      <button class="btn pointer" v-if="action.showBookButton">Book</button>

      <button class="btn pointer" v-if="action.showCheckStatusButton">
        Status
      </button>

      <button class="btn pointer" v-if="action.showTalkToAgentButton">
        Click Here
      </button>
    </p>
    <p v-for="(action, index) in list_items" :key="index">
      {{ action.label }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: [
    "text", // Content of the message
    "author", // Author of the message
    "dark", // Background variant of the box
    "actions", // Background variant of the box
    "list_items",
  ],
};
</script>

<style scoped>
.message {
  /* background: #efefef; */
  background: rgba(19, 174, 231, 0.377);
  border-radius: 10px;
  padding: 1rem;
  width: fit-content;
}

.message.dark {
  background: #0980cf56;
}

h5 {
  margin: 0 0 0.5rem 0;
}

.pointer {
  cursor: pointer;
}
.p-hover {
  display: flex;
  align-items: center;
  gap: 10px;
}
.p-hover:hover {
  color: #0064ff;
  /* font-weight: 600; */
  /* text-decoration: underline; */
}
/* .p-hover:focus,
.p-hover:target,
.p-hover:focus-within {
  color: #0064ff;
  font-weight: 600;
} */

.btn {
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 16px;
  background: rgb(0, 122, 170);
}
.btn:hover {
  background-color: #13263b;
  text-decoration: none;
}
</style>
