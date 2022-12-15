(function(){"use strict";var t={6589:function(t,e,o){var s=o(7195),i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"app"},[e("div",{ref:"messages",staticClass:"messages"},t._l(t.messages,(function(o){return e("Message",{key:o.id,class:["message",{right:o.isMine}],attrs:{dark:o.isMine,text:o.text,author:o.author,actions:o.actions,list_items:t.messages.list_items}})})),1),e("ChatBox",{staticClass:"chat-box",on:{submit:t.onSubmit}}),t.user?t._e():e("RegisterDialog",{on:{submit:t.onRegister}})],1)},n=[],a=(o(7658),function(){var t=this,e=t._self._c;return e("div",{class:["message",{dark:t.dark}]},[e("h5",[t._v(t._s(t.author))]),t._v(" "+t._s(t.text)+" "),t._l(t.actions,(function(o,s){return e("p",{key:s},[t._v(" "+t._s(o.key)+" "+t._s(o.label)+" ")])})),t._l(t.list_items,(function(o,s){return e("p",{key:s},[t._v(" "+t._s(o.label)+" ")])}))],2)}),r=[],l={name:"Message",props:["text","author","dark","actions","list_items"]},u=l,h=o(3736),m=(0,h.Z)(u,a,r,!1,null,"4d2bffd6",null),c=m.exports,g=function(){var t=this,e=t._self._c;return e("form",{staticClass:"chat-box",on:{submit:function(e){return t.onSubmit(e)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],attrs:{placeholder:"Write a message",type:"text"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),e("button",{attrs:{disabled:""===t.text}},[t._v("Send")])])},d=[],p={name:"ChatBox",data:()=>({text:""}),methods:{onSubmit(t){this.$emit("submit",t,this.text),this.text=""}}},b=p,f=(0,h.Z)(b,g,d,!1,null,"769cea4e",null),v=f.exports,_=function(){var t=this,e=t._self._c;return e("div",{staticClass:"register"},[e("div",{staticClass:"dialog"},[e("h5",[t._v("Welcome to Chat app")]),e("span",[t._v("Please enter your name, email id and phone number to initiate conversation:")]),e("form",{on:{submit:function(e){return t.$emit("submit",e,t.loginForm)}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.fullName,expression:"loginForm.fullName"}],attrs:{placeholder:"Name",type:"text"},domProps:{value:t.loginForm.fullName},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"fullName",e.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.email,expression:"loginForm.email"}],attrs:{placeholder:"Email",type:"text"},domProps:{value:t.loginForm.email},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"email",e.target.value)}}}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.phoneNumber,expression:"loginForm.phoneNumber"}],attrs:{placeholder:"Phone Number",type:"text"},domProps:{value:t.loginForm.phoneNumber},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"phoneNumber",e.target.value)}}}),e("button",{attrs:{disabled:""===t.loginForm.fullName||""===t.loginForm.email||""===t.loginForm.phoneNumber}},[t._v(" Enter ")])])])])},A=[],N={name:"RegisterDialog",data:()=>({loginForm:{fullName:"",email:"",phoneNumber:""}}),methods:{onSubmit(){$emit("submit",$event,loginForm)}}},S=N,x=(0,h.Z)(S,_,A,!1,null,"4ec48de9",null),F=x.exports,I=o(1412);const k={HOME_PAGE:1,ASKING_BOOKING_ARRIVAL:2,ASKING_BOOKING_DIPARTURE:3,ASKING_BOOKING_DATE:4,SHOWING_AVAILABLE_FLIGHTS:5};var O={BOT_STATUS:k},B={name:"App",components:{RegisterDialog:F,ChatBox:v,Message:c},data:()=>({user:void 0,messages:[],botActions:[{key:"a",label:"Book a Flight "},{key:"b",label:"Modify a current Booking "},{key:"c",label:"Flight Status "},{key:"d",label:"Baggage claims "},{key:"e",label:"Online Check-in "},{key:"f",label:"My problem is not listed here "},{key:"g",label:"Book cargo "}],currentState:null,botStatus:O.BOT_STATUS,bookFlightForm:{departure:null,arrival:null,date:null}}),created(){},methods:{onRegister(t,e){t.preventDefault(),console.log("loginForm: ",e),this.user={fullName:e.fullName,email:e.email,phoneNumber:e.phoneNumber,id:(0,I.Z)()},this.initChat()},initChat(){this.messages.push({id:this.getMessageId(),isMine:!1,text:"Hello, Greetings of the Day! What can we help you with today? ",author:"Bot",actions:this.botActions}),this.currentState=this.botStatus.HOME_PAGE},getMessageId(){return this.messages.length+1},scrollToBotton(){s.ZP.nextTick((()=>{const t=this.$refs["messages"];t.scrollTo({behavior:"smooth",top:t.scrollHeight})}))},onSubmit(t,e){if(t.preventDefault(),console.log("text: ",e),this.messages.push({id:this.getMessageId(),isMine:!0,text:e,author:this.user?.fullName}),this.scrollToBotton(),this.currentState==this.botStatus.HOME_PAGE){let t=this.botActions.find((t=>t.key==e));console.log("action: ",t),t?"a"==t.key&&(this.messages.push({id:this.getMessageId(),isMine:!1,text:"Book a Flight - Please fill in the details requested below",author:"Bot"}),this.messages.push({id:this.getMessageId(),isMine:!1,text:"Departure ?",author:"Bot"}),this.scrollToBotton(),this.currentState=this.botStatus.ASKING_BOOKING_DIPARTURE):(this.messages.push({id:this.getMessageId(),isMine:!1,text:"Please select valid option",author:"Bot",actions:this.botActions}),this.scrollToBotton())}else this.currentState==this.botStatus.ASKING_BOOKING_DIPARTURE?(this.bookFlightForm.departure=e,this.messages.push({id:this.getMessageId(),isMine:!1,text:"Arrival  ?",author:"Bot"}),this.scrollToBotton(),this.currentState=this.botStatus.ASKING_BOOKING_ARRIVAL):this.currentState==this.botStatus.ASKING_BOOKING_ARRIVAL?(this.bookFlightForm.arrival=e,this.messages.push({id:this.getMessageId(),isMine:!1,text:"Date  ? (DD/MM/YYYY)",author:"Bot"}),this.scrollToBotton(),this.currentState=this.botStatus.ASKING_BOOKING_DATE):this.currentState==this.botStatus.ASKING_BOOKING_DATE&&(this.bookFlightForm.date=e,this.messages.push({id:this.getMessageId(),isMine:!1,text:`${this.bookFlightForm.departure} to ${this.bookFlightForm.arrival} available flights on ${this.bookFlightForm.date}`,author:"Bot",list_items:[{key:"A3456",label:"Airline: AIR Airlines - Flight Number: A3456 "},{key:"J3456",label:"Airline: JET Airlines - Flight Number: J3456 "}]}),this.scrollToBotton(),this.currentState=this.botStatus.SHOWING_AVAILABLE_FLIGHTS)}}},y=B,M=(0,h.Z)(y,i,n,!1,null,"2654925e",null),T=M.exports;const G=()=>{};s.ZP.config.productionTip=!1,G(),new s.ZP({render:t=>t(T)}).$mount("#app")}},e={};function o(s){var i=e[s];if(void 0!==i)return i.exports;var n=e[s]={exports:{}};return t[s](n,n.exports,o),n.exports}o.m=t,function(){var t=[];o.O=function(e,s,i,n){if(!s){var a=1/0;for(h=0;h<t.length;h++){s=t[h][0],i=t[h][1],n=t[h][2];for(var r=!0,l=0;l<s.length;l++)(!1&n||a>=n)&&Object.keys(o.O).every((function(t){return o.O[t](s[l])}))?s.splice(l--,1):(r=!1,n<a&&(a=n));if(r){t.splice(h--,1);var u=i();void 0!==u&&(e=u)}}return e}n=n||0;for(var h=t.length;h>0&&t[h-1][2]>n;h--)t[h]=t[h-1];t[h]=[s,i,n]}}(),function(){o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,{a:e}),e}}(),function(){o.d=function(t,e){for(var s in e)o.o(e,s)&&!o.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};o.O.j=function(e){return 0===t[e]};var e=function(e,s){var i,n,a=s[0],r=s[1],l=s[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(i in r)o.o(r,i)&&(o.m[i]=r[i]);if(l)var h=l(o)}for(e&&e(s);u<a.length;u++)n=a[u],o.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return o.O(h)},s=self["webpackChunkair_chatboat_vue"]=self["webpackChunkair_chatboat_vue"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=o.O(void 0,[998],(function(){return o(6589)}));s=o.O(s)})();
//# sourceMappingURL=app.e866b665.js.map