<template>
  <div id="layout-config" :class="containerClass">
    <a
      href="#"
      class="layout-config-button"
      id="layout-config-button"
      @click="toggleConfigurator"
    >
      <i class="pi pi-cog"></i>
    </a>
    <Button
      class="p-button-danger layout-config-close p-button-rounded p-button-text"
      icon="pi pi-times"
      @click="hideConfigurator"
      :style="{ 'z-index': 1 }"
    ></Button>

    <div class="layout-config-content">
      <h5 class="mt-0">Settings</h5>
      <h5>Dark Mode</h5>
      <InputSwitch
        :modelValue="rippleActive"
        @update:modelValue="changeRipple"
      />
    </div>
  </div>
</template>

<script>
import EventBus from "./AppEventBus";
import { useConfigStore } from "@/store/config.store";

export default {
  props: {
    layoutMode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: false,
      d_layoutMode: this.layoutMode,
      scale: 14,
      scales: [12, 13, 14, 15, 16],
    };
  },
  outsideClickListener: null,
  themeChangeListener: null,
  config: null,
  watch: {
    $route() {
      if (this.active) {
        this.active = false;
        this.unbindOutsideClickListener();
      }
    },
    layoutMode(newValue) {
      this.d_layoutMode = newValue;
    },
  },
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener);
  },
  beforeCreate() {
    this.config = useConfigStore();
  },
  mounted() {
    this.themeChangeListener = () => {
      this.applyScale();
    };

    EventBus.on("theme-change", this.themeChangeListener);
    // EventBus.emit("theme-change", { theme: 'bootstrap4-dark-blue', dark: true });
  },
  methods: {
    toggleConfigurator(event) {
      this.active = !this.active;
      event.preventDefault();

      if (this.active) this.bindOutsideClickListener();
      else this.unbindOutsideClickListener();
    },
    hideConfigurator(event) {
      this.active = false;
      this.unbindOutsideClickListener();
      event.preventDefault();
    },
    changeInputStyle(value) {
      this.$primevue.config.inputStyle = value;
    },

    changeMenuDebug(value) {
      this.config.c_c({ menuDebug: value });
    },
    changeRipple(value) {
      console.log(value);
      value
        ? this.changeTheme(null, "bootstrap4-dark-blue", true)
        : this.changeTheme(null, "bootstrap4-light-blue", false);
      this.$primevue.config.ripple = value;
    },

    changeLayout(event, layoutMode) {
      this.$emit("layout-change", layoutMode);
      event.preventDefault();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.active && this.isOutsideClicked(event)) {
            this.active = false;
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(
        this.$el.isSameNode(event.target) || this.$el.contains(event.target)
      );
    },
    decrementScale() {
      this.scale--;
      this.applyScale();
    },
    incrementScale() {
      this.scale++;
      this.applyScale();
    },
    applyScale() {
      document.documentElement.style.fontSize = this.scale + "px";
    },
    changeTheme(event, theme, dark) {
      console.log(theme);
      EventBus.emit("theme-change", { theme: theme, dark: dark });
      event?.preventDefault();
    },
  },
  computed: {
    containerClass() {
      return ["layout-config", { "layout-config-active": this.active }];
    },

    menuDebug() {
      return this.config.c_c("menuDebug");
    },
    rippleActive() {
      return this.$primevue.config.ripple;
    },

    inputStyle() {
      return this.$appState.inputStyle;
    },
  },
};
</script>
