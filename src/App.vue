<template>
  <div class='app'>
    <div ref='messages' class='messages'>
      <Message
          v-for='message in messages'
          :key='message.id'
          :class='["message", { right: message.isMine }]'
          :dark='message.isMine'
          :text='message.text'
          :author='message.author'
          :actions='message.actions'
          :list_items="messages.list_items"
      />
    </div>

    <ChatBox
        class='chat-box'
        @submit='onSubmit'
    />

    <RegisterDialog
        v-if='!user'
        @submit='onRegister'
    />
  </div>
</template>

<script>
import Message from "@/components/Message";
import ChatBox from "@/components/ChatBox";
// import { listenChat, sendMessage } from "@/core/Firebase.ts";
import RegisterDialog from "@/components/RegisterDialog";
import { v1 as uid } from 'uuid';
import Vue from "vue";
import CONSTANTS from "../constants";

export default {
  name: 'App',

  // Here we register the components which
  // we are going to use in the template
  components: {
    RegisterDialog,
    ChatBox,
    Message
  },

  data: () => ({
    user: undefined,
    messages: [],
    botActions:[{key: 'a', label:'Book a Flight '},
                  {key: 'b', label:'Modify a current Booking '},
                  {key: 'c', label:'Flight Status '},
                  {key: 'd', label:'Baggage claims '},
                  {key: 'e', label:'Online Check-in '},
                  {key: 'f', label:'My problem is not listed here '},
                  {key: 'g', label:'Book cargo '},
              ],
    currentState:null,
    botStatus : CONSTANTS.BOT_STATUS,

    bookFlightForm:{
      departure:null,
      arrival:null,
      date:null,
    }

  }),

  // This is going to be called
  //  when the component gets rendered
  created() {
  },

  methods: {
    onRegister(event, loginForm) {
      event.preventDefault();
      console.log("loginForm: ", loginForm)
      // Authentication is out of scope for this project
      // so we just generate a uuid
      this.user = { 
        fullName:loginForm.fullName, 
        email:loginForm.email, 
        phoneNumber:loginForm.phoneNumber, 
        id: uid() };
      this.initChat();
    },

    initChat(){
      this.messages.push({
        id: this.getMessageId(),
        isMine: false,
        text:'Hello, Greetings of the Day! What can we help you with today? ' ,
        author: "Bot",
        actions :this.botActions
      })

      this.currentState = this.botStatus.HOME_PAGE
    },

    getMessageId(){
      return this.messages.length+1
    },

    scrollToBotton(){
      Vue.nextTick(() => {
          const element = this.$refs['messages'];
          element.scrollTo({ behavior: 'smooth', top: element.scrollHeight });
        });
    },
    // This method will be called when a new message is sent
    onSubmit(event, text) {
      event.preventDefault();
      console.log("text: ", text);
      // sendMessage({
      //   text,
      //   uid: this.user?.id,
      //   author: this.user?.name
      // });

      this.messages.push({
        id: this.getMessageId(),
        isMine: true,
        text:text,
        author: this.user?.fullName
      })
      this.scrollToBotton()


      if(this.currentState == this.botStatus.HOME_PAGE){

        let action =  this.botActions.find(ele=> ele.key == text)

        console.log("action: ", action)

        if(!action){
          this.messages.push({
          id: this.getMessageId(),
          isMine: false,
          text:'Please select valid option' ,
          author: "Bot",
          actions :this.botActions
        })
        this.scrollToBotton()      
        }

        else{

          if(action.key == 'a'){

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Book a Flight - Please fill in the details requested below' ,
            author: "Bot",
          })

          this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Departure ?' ,
            author: "Bot",
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_DIPARTURE;
          }


        }

      }

      else if(this.currentState == this.botStatus.ASKING_BOOKING_DIPARTURE){
        this.bookFlightForm.departure = text;
        this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Arrival  ?' ,
            author: "Bot",
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_ARRIVAL;
      }


      else if(this.currentState == this.botStatus.ASKING_BOOKING_ARRIVAL){
        this.bookFlightForm.arrival = text;

          this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Date  ? (DD/MM/YYYY)' ,
            author: "Bot",
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_DATE;
          }


      else if(this.currentState == this.botStatus.ASKING_BOOKING_DATE){

        this.bookFlightForm.date = text;

        this.messages.push({
          id: this.getMessageId(),
          isMine: false,
          text:`${this.bookFlightForm.departure} to ${this.bookFlightForm.arrival} available flights on ${this.bookFlightForm.date}` ,
          author: "Bot",
          list_items:[
            {key:'A3456', label:'Airline: AIR Airlines - Flight Number: A3456 '},
            {key:'J3456', label:'Airline: JET Airlines - Flight Number: J3456 '},
          ]
        })

        this.scrollToBotton()
        this.currentState = this.botStatus.SHOWING_AVAILABLE_FLIGHTS;
        }

    }



  }
}
</script>

<style>
@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
}

@font-face {
  font-family: 'Georama';
  src: url('./assets/Georama.ttf');
  font-weight: bold;
}

* {
  box-sizing: border-box;
}

html {
  font-family: 'Georama', sans-serif;
}

body {
  margin: 0;
}

button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

.message + .message {
  margin-top: 1rem;
}

.message.right {
  margin-left: auto;
}
</style>
