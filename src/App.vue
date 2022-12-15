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
          @onActionSelect="onActionSelectEvent"
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

import ChatapiService from "@/services/chatapi.service";


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

    qParams:{},
    
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

    departureOptions:[
        {key: '1', label:'CPT CAPETOWN', location:'CAPETOWN'},
        {key: '2', label:'FRW FRANCISTOWN', location:'FRANCISTOWN'},
        {key: '3', label:'GBE GABARONE', location:'GABARONE'},
        {key: '4', label:'HRE HARARE', location:'HARARE'},
        {key: '5', label:'JNB JOHANNESBURG', location:'JOHANNESBURG'},
        {key: '6', label:'BBK KASANE', location:'KASANE'},
        {key: '7', label:'LUN LUKASA', location:'LUKASA'},
        {key: '8', label:'MUB  MAUN', location:'MAUN'},

    ],

    arrivalOptions:[
        {key: '1', label:'CPT CAPETOWN', location:'CAPETOWN'},
        {key: '2', label:'FRW FRANCISTOWN', location:'FRANCISTOWN'},
        {key: '3', label:'GBE GABARONE', location:'GABARONE'},
        {key: '4', label:'HRE HARARE', location:'HARARE'},
        {key: '5', label:'JNB JOHANNESBURG', location:'JOHANNESBURG'},
        {key: '6', label:'BBK KASANE', location:'KASANE'},
        {key: '7', label:'LUN LUKASA', location:'LUKASA'},
        {key: '8', label:'MUB  MAUN', location:'MAUN'},
    ],

    currentState:null,
    botStatus : CONSTANTS.BOT_STATUS,

    bookFlightForm:{
      departure:null,
      arrival:null,
      date:null,
      flight_id: null,
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

      let apiData = {
        'email':loginForm.email,
        'full_name':loginForm.fullName,
        'phone_number':loginForm.phoneNumber,
      }

      ChatapiService.register(apiData).then(
        (response)=>{
          console.log("response: ", response)  
                
          localStorage.setItem('userToken', response.data.token);

          this.user = { 
          fullName:loginForm.fullName, 
          email:loginForm.email, 
          phoneNumber:loginForm.phoneNumber, 
          id: uid() };
          this.initChat();
  
        }
      ).catch(
      (error)=>{
        console.log("error",error)

        Vue.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
          position: 'top'
          // all of other options may go here
      });
      }
      )
          
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
   async onSubmit(event, text) {
      event.preventDefault();
      console.log("text: ", text);
      console.log("this.currentState: ", this.currentState)
      console.log("this.currentState == this.botStatus.ASKING_BOOKING_DATE: ", this.currentState == this.botStatus.ASKING_BOOKING_DATE)

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

      if(this.currentState == this.botStatus.ASKING_BOOKING_DATE){        

        this.bookFlightForm.date = text;

        this.qParams=  {}
        this.qParams['departure'] = this.bookFlightForm.departure
        this.qParams['arrival'] = this.bookFlightForm.arrival
        this.qParams['from_date'] = this.bookFlightForm.date

          this.bookFlightForm
        console.log("this.qParams>>> ",this.qParams);

        setTimeout(() => { 
          console.log("Delayed for 1 second.");
        }, 5000)

          await ChatapiService.availableFlights(this.qParams).then((response) => {
            console.log("response>>> ",response);

            let f_actions = []

            response.data.flight_list.forEach(ele => {
              f_actions.push(
                { key:ele.id,
                  showBookButton: true,
                  bookingID: ele.id,
                  label: `Airline: ${ele.airline_name} - Flight Number: ${ele.flight_number} - Arrival Time: ${ele.arrival_time} - Departure Time: ${ele.departure_time} `
                 }
              )
              
            });

            if(f_actions.length){

              this.messages.push({
              id: this.getMessageId(),
              isMine: false,
              text:`${this.bookFlightForm.departure} to ${this.bookFlightForm.arrival} available flights on ${this.bookFlightForm.date}` ,
              author: "Bot",
              actions:f_actions
            })

            this.scrollToBotton()
            this.currentState = this.botStatus.SHOWING_AVAILABLE_FLIGHTS;

            }
            else{
              this.messages.push({
              id: this.getMessageId(),
              isMine: false,
              text:`No flights found for selected inputs.` ,
              author: "Bot",
            })

            this.scrollToBotton()
            this.currentState = this.botStatus.SHOWING_AVAILABLE_FLIGHTS;

            setTimeout(()=> {

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Do you need more help? ' ,
            author: "Bot",
            actions :this.botActions
            })

            this.currentState = this.botStatus.HOME_PAGE
            this.scrollToBotton()
            }, 3000);
            }



          }).catch((error => {
            console.log("error>>> ", error);

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Please enter valid Date. ' ,
            author: "Bot",
            })
            this.scrollToBotton()

          }))
        }

    },


    async onActionSelectEvent(event, selectedAction){
      console.log("selectedAction: ", selectedAction);

      if(this.currentState == this.botStatus.HOME_PAGE){

        let action =  this.botActions.find(ele=> ele.key == selectedAction.key)

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
            text:'Select Departure:' ,
            author: "Bot",
            actions :this.departureOptions
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_DIPARTURE;
         
        
        }
        else if(action.key == 'b'){
          window.open("https://airbotswana.co.bw/", '_blank');
        }

        else if(action.key == 'c'){

          this.qParams=this.bookFlightForm;
        console.log("this.qParams>>> ",this.qParams);

        setTimeout(() => { 
          console.log("Delayed for 1 second.");
        }, 1000)

          await ChatapiService.getMyBookingFlights(this.qParams).then((response) => {
          console.log("response>>> ",response);
          
          let f_list = []

          response.data.booking_list.forEach(ele => {

            f_list.push({
              key:ele.booking_id,
              bookingID:ele.booking_id,
              showCheckStatusButton: true,
              label: `Booking ID: ${ele.booking_id} - Flight Number: ${ele.flight.flight_number} - Airline: ${ele.flight.airline_name}`
            })
            
          });

          if(f_list.length){
            this.messages.push({
          id: this.getMessageId(),
          isMine: false,
          text:'Your booked flights:' ,
          author: "Bot",
          actions:f_list
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.SHOWING_LIST_FOR_FLIGHT_STATUS;

          }

          else{
              this.messages.push({
              id: this.getMessageId(),
              isMine: false,
              text:`No booking found.` ,
              author: "Bot",
            })

            this.scrollToBotton()
            this.currentState = this.botStatus.SHOWING_LIST_FOR_FLIGHT_STATUS;

            setTimeout(()=> {

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Do you need more help? ' ,
            author: "Bot",
            actions :this.botActions
            })

            this.currentState = this.botStatus.HOME_PAGE
            this.scrollToBotton()
            }, 3000);
            }




          
          }).catch((error => {
            console.log("error>>> ", error);
          }))

          }

        else if(action.key == 'd'){
          window.open("https://airbotswana.co.bw/", '_blank');
        }
        else if(action.key == 'e'){
          window.open("https://airbotswana.co.bw/", '_blank');
        }
        else if(action.key == 'f'){

          this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'' ,
            author: "Bot",
            actions:[
            {key:'', label:'Talk to agent?', 'showTalkToAgentButton':true},
          ]
          })
          this.currentState = this.botStatus.TALK_TO_AGENT;

          this.scrollToBotton()


        }
        else if(action.key == 'g'){
          window.open("https://airbotswana.co.bw/", '_blank');
        }
        }

        }

       else if(this.currentState == this.botStatus.ASKING_BOOKING_DIPARTURE){
        this.bookFlightForm.departure = selectedAction.location;
        this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Select Arrival ?' ,
            author: "Bot",
            actions :this.arrivalOptions

          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_ARRIVAL;
      }

      else if(this.currentState == this.botStatus.ASKING_BOOKING_ARRIVAL){
        this.bookFlightForm.arrival = selectedAction.location;

          this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Enter Date (DD/MM/YYYY)' ,
            author: "Bot",
          })

          this.scrollToBotton()
          this.currentState = this.botStatus.ASKING_BOOKING_DATE;
          }
      
      else if(this.currentState == this.botStatus.SHOWING_AVAILABLE_FLIGHTS){
        window.open("https://airbotswana.co.bw/", '_blank');


        this.bookFlightForm.arrival = selectedAction.boo;


        let apiData = {}
        apiData['flight_id'] = selectedAction.bookingID
        apiData['booking_date'] = this.bookFlightForm.date

        await ChatapiService.bookFlight(apiData).then((response) => {
          console.log("response>>> ",response);
        
          }).catch((error => {
            console.log("error>>> ", error);
          }))


        this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Thank you for booking flight with us.' ,
            author: "Bot",
          })

          this.scrollToBotton()

          setTimeout(()=> {

          this.messages.push({
          id: this.getMessageId(),
          isMine: false,
          text:'Do you need more help? ' ,
          author: "Bot",
          actions :this.botActions
          })

          this.currentState = this.botStatus.HOME_PAGE
          this.scrollToBotton()
          }, 3000);


      }

      else if(this.currentState == this.botStatus.SHOWING_LIST_FOR_FLIGHT_STATUS){
        // let in this Case "id = this.currentState "

           await ChatapiService.getFlightByID(selectedAction.bookingID).then((response) => {
            
            console.log("response>>> ",response);
            let message = `Flight #${response.data.booking_details.flight.flight_number} from ${response.data.booking_details.flight.origin_location} to ${response.data.booking_details.flight.destination_location} is ${response.data.booking_details.flight.status_message}` 
            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:message ,
            author: "Bot",
          })

          this.scrollToBotton()

          setTimeout(()=> {

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Do you need more help? ' ,
            author: "Bot",
            actions :this.botActions
          })

          this.currentState = this.botStatus.HOME_PAGE
          this.scrollToBotton()
        }, 3000);


            }).catch((error) => {
              console.log("error>>> ,", error);
            })

      }


      else if(this.currentState == this.botStatus.TALK_TO_AGENT){

        window.open("https://airbotswana.co.bw/", '_blank');

          setTimeout(()=> {

            this.messages.push({
            id: this.getMessageId(),
            isMine: false,
            text:'Do you need more help? ' ,
            author: "Bot",
            actions :this.botActions
          })

          this.currentState = this.botStatus.HOME_PAGE
          this.scrollToBotton()
        }, 3000);


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
