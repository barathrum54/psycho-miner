import { defineStore } from "pinia";
const pcid = "97";
const initialUser = {
  wallet: null,
  chainId: null,
};
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(
      localStorage.getItem("user") || JSON.stringify(initialUser)
    ),
  }),
  getters: {
    getUser() {
      return this.user;
    },
    isAuth() {
      console.log(this.user.wallet, this.user.chainId);
      if (this.user.wallet != null && this.user.chainId == pcid) {
        console.log("user is auth");
        return true;
      } else {
        console.error("user is not auth");
        if (this.user.chainId != pcid && this.user.chainId) {
          console.error("Please change your chainId to " + pcid);
        }
        return false;
      }
    },
  },
  actions: {
    setUser(user) {
      console.log(user);
      if (user.wallet) {
        this.user.wallet = user.wallet;
      }
      if (user.chainId) {
        this.user.chainId = user.chainId;
      }
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    reset() {
      localStorage.removeItem("user");
      this.$reset();
    },
  },
});
