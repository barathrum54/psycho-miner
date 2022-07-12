<template>
  <div class="layout-menu-container">
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    />
    <Divider align="right">
      <Button
        label="Contact Us"
        icon="pi pi-send"
        class="p-button-outlined p-2"
      ></Button>
    </Divider>

    <a href="/" class="block mt-3">
      <h2 class="hover m-0 p-2 shadow-2 border-round text-center">
        Advertise Here Maybe
      </h2>
    </a>
  </div>
</template>

<script>
import AppSubmenu from "./AppSubmenu";

export default {
  props: {
    model: Array,
  },
  methods: {
    onMenuItemClick(event) {
      this.$emit("menuitem-click", event);
    },
    onKeyDown(event) {
      const nodeElement = event.target;
      if (event.code === "Enter" || event.code === "Space") {
        nodeElement.click();
        event.preventDefault();
      }
    },
    bannerImage() {
      return this.$appState.darkTheme
        ? "images/banner-primeblocks-dark.png"
        : "images/banner-primeblocks.png";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
  components: {
    AppSubmenu: AppSubmenu,
  },
};
</script>
