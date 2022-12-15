import ApiService from "./api.service";

const ChatapiService = {
  // users/register
  async register(data) {
    return await ApiService.post("/users/register", data);
  },
  // flights/available-flights

  async availableFlights(qParams={}) {
      return await ApiService.get("/flights/available-flights", qParams);
    },

  // get booking detials flight_bookings/my-bookings/BKA34561

  async getFlightByID(id) {
    return await ApiService.get(`/flight_bookings/my-bookings/${id}`);
  },

  async getMyBookingFlights(qParams={}) {
    return await ApiService.get("/flight_bookings/my-bookings", qParams);
  },

  //  /flight_bookings/cancel
  async flightCancel(data) {
    return await ApiService.post("/flight_bookings/cancel/", data);
  },


  async bookFlight(data) {
    return await ApiService.post("/flight_bookings/add", data);
  },
  
  
  // async checkResetPasswordToken(data) {
  //   return await ApiService.post("/auth/check-reset-password-token", data);
  // },

  // async getProfile() {
  //   return await ApiService.get("/auth/profile");
  // },
  
  // async updateProfile(data) {
  //   return await ApiService.post("/auth/profile", data);
  // }
};

export default ChatapiService;
