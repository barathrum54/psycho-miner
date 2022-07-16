<template>
  <router-view></router-view>
</template>

<script>
import EventBus from "./AppEventBus";
import AuthService from "./service/AuthService.js";
import { useUserStore } from "@/store/user.store";

window.auth = new AuthService();
export default {
  themeChangeListener: null,
  mounted() {
    window.userStore = useUserStore();
    this.authUiListener = (event) => {
      window.auth.login();
    };
    this.themeChangeListener = (event) => {
      const elementId = "theme-link";
      const linkElement = document.getElementById(elementId);
      const cloneLinkElement = linkElement.cloneNode(true);
      const newThemeUrl = linkElement
        .getAttribute("href")
        .replace(this.$appState.theme, event.theme);
      console.log(newThemeUrl);
      cloneLinkElement.setAttribute("id", elementId + "-clone");
      cloneLinkElement.setAttribute("href", newThemeUrl);
      cloneLinkElement.addEventListener("load", () => {
        linkElement.remove();
        cloneLinkElement.setAttribute("id", elementId);
      });
      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      this.$appState.theme = event.theme;
      this.$appState.darkTheme = event.dark;
      console.log(event);
    };
    EventBus.on("auth-change", this.authChangeListener);
    EventBus.on("theme-change", this.themeChangeListener);
    EventBus.on("profile-click", this.authUiListener);
  },
  beforeUnmount() {
    EventBus.off("theme-change", this.themeChangeListener);
    EventBus.off("profile-click", this.authUiListener);
    EventBus.off("auth-change", this.authChangeListener);
  },
};
</script>
