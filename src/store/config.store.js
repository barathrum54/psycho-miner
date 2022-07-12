import { defineStore } from "pinia";
const initialConfig = {
  menuDebug: false,
  fullDebug: false
};
export const useConfigStore = defineStore("configStore", {
  state: () => ({
    config: JSON.parse(
      localStorage.getItem("config") || JSON.stringify(initialConfig)
    ),
  }),
  getters: {
    o_o() {
      return this.config;
    },
  },
  actions: {
    c_c(params) {
      if (!params) return this.config;
      let paramType = typeof params;
      let res;
      switch (paramType) {
        case "string":
          res = this.config[params];
          break;
          case "object":
          Object.entries(params).map((item) => {
            this._set(item[0], item[1]);
          });
          break;
      }
      return res;
    },
    _set(key, value) {
      console.log(key,value);
      this.config[key] = value;
      localStorage.setItem("config", JSON.stringify(this.config));
    },
    reset() {
      localStorage.removeItem("config");
      this.$reset();
    },
  },
});
