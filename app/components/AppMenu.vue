<script setup lang="ts">
import { ref } from 'vue'

const currentDropdown = ref('')

function toggleDropdown(name: string) {
  currentDropdown.value = currentDropdown.value === name ? '' : name
}
</script>

<template>
  <nav class="menu-bar">

    <!-- Menu items -->
    <ul class="menu-items">
      <li class="menu-item">
        <button @click="toggleDropdown('products')">
          Products
          <span class="caret" :class="{ open: currentDropdown==='products' }">▼</span>
        </button>
        <ul v-if="currentDropdown==='products'" class="dropdown">
          <li><NuxtLink to="/products#virtualization">Virtualization</NuxtLink></li>
          <li><NuxtLink to="/products#multicloud">Multicloud</NuxtLink></li>
          <li><NuxtLink to="/products#sds">Software Defined Storage</NuxtLink></li>
          <li><NuxtLink to="/products#vdi">VDI</NuxtLink></li>
          <li><NuxtLink to="https://hive.nexavm.com/category/8/documentation" target="_blank">Documentation</NuxtLink></li>
        </ul>
      </li>

      <li class="menu-item">
        <button @click="toggleDropdown('resources')">
          Resources
          <span class="caret" :class="{ open: currentDropdown==='resources' }">▼</span>
        </button>
        <ul v-if="currentDropdown==='resources'" class="dropdown">
          <li><NuxtLink to="https://hive.nexavm.com/category/5/technical-support" target="_blank">Support</NuxtLink></li>
          <li><NuxtLink to="https://hive.nexavm.com/category/6/download.html" target="_blank">Download</NuxtLink></li>
          <li><NuxtLink to="https://hive.nexavm.com/category/7/knowledgebase" target="_blank">Knowledge Base</NuxtLink></li>
          <li><NuxtLink to="https://hive.nexavm.com/category/3/blogs" target="_blank">Blog</NuxtLink></li>
        </ul>
      </li>

      <li class="menu-item"><NuxtLink to="/company">Company</NuxtLink></li>
      <li class="menu-item"><NuxtLink to="/become-a-partner">Partner</NuxtLink></li>
      <li class="menu-item"><NuxtLink to="/compatibility">Compatibility</NuxtLink></li>
      <li class="menu-item"><NuxtLink to="/annoucements">Announcements</NuxtLink></li>
    </ul>

    <!-- Buttons -->
    <div class="menu-buttons">
      <NuxtLink to="/try-it-now" class="btn">Try It Now</NuxtLink>
      <NuxtLink to="/request-a-demo" class="btn">Request a Demo</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: #222;
  color: #fff;
  font-family: sans-serif;
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

/* Menu items */
.menu-items {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.menu-item {
  position: relative;
}

.menu-item button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.menu-item .caret {
  display: inline-block;
  transition: transform 0.3s ease;
}

.menu-item .caret.open {
  transform: rotate(-180deg);
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: 2.5rem;
  left: 0;
  background: #333;
  border-radius: 0.5rem;
  min-width: 180px;
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 100;
}

.dropdown li {
  padding: 0.5rem 1rem;
}

.dropdown li a {
  color: #fff;
  text-decoration: none;
  display: block;
}

.dropdown li a:hover {
  background: #e85039;
  border-radius: 0.25rem;
}

/* Buttons */
.menu-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  background: #e85039;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}

.btn:hover {
  background: #cf3c28;
}

/* Responsive */
@media screen and (max-width: 900px) {
  .menu-items {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }

  .menu-buttons {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .dropdown {
    position: static;
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
}
</style>

<style lang="postcss">
/* reset */

.mobile-only {
  display: none;
}

@media screen and (max-width: 1200px) {
  .mobile-only {
    display: block;
  }

  .mobile-btn {
    display: block;
    padding: 12px 20px;
    background-color: #e85039;
    color: var(--white);
    text-align: center;
    border-radius: 8px;
    font-weight: 500;
    margin-top: 8px;
  }

  .mobile-btn:hover {
    background-color: #cf3c28;
  }
}


.NavigationMenuItems {
    list-style: none;

    .jk {
        padding: 8px;
        border-bottom: 1px solid var(--black);
        margin: 0;
        min-height: 50px;
        position: relative;

        border-radius: 8px;

        &:hover,
        &:focus {
            background-color: #e85039;

            a {

                color: var(--white);
            }
        }


        a {
            color: var(--light-gray);
            white-space: nowrap;


            &:after {
                content: "";
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

            }
        }

        &:last-of-type {
            border: none;
        }
    }
}


button,
p {
    all: unset;
}

.NavigationMenuRoot {
    position: relative;
    display: flex;
    justify-content: center;
    width: auto;
    z-index: 1;
}

.NavigationMenuList {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 6px;
    list-style: none;
    margin: 0;
    gap: 24px;

    button,
    li {
        font-weight: var(--regular);
    }
}


.NavigationMenuTrigger,
.NavigationMenuLink {
    position: relative;
    padding: 0;
    outline: none;
    user-select: none;
    font-weight: var(--regular);
    line-height: 1;
    font-size: var(--text);
    font-family: "Roboto Flex", sans-serif;
    color: var(--light-gray);

}

.NavigationMenuTrigger:focus,
.NavigationMenuLink:focus {
    color: var(--white);
}

.NavigationMenuTrigger:hover,
.NavigationMenuLink:hover {
    color: var(--white);
}

.NavigationMenuTrigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2px;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
}

.NavigationMenuLink {
    display: block;
    text-decoration: none;
    font-size: var(--text);
    line-height: 1;
}

.NavigationMenuContent {

    animation-duration: 250ms;
    animation-timing-function: ease;

    background-color: var(--dark-gray-2);
    border-radius: 8px;
    border: 0.5px solid var(--dark-gray-1);
}

.NavigationMenuItems {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding: 8px 24px;
        border-bottom: 1px solid var(--black);
        margin: 0;
        min-height: 50px;
        position: relative;



        border-radius: 8px;


        &:hover,
        &:focus {
            background-color: #e85039;

            a {

                color: var(--white);
            }
        }


        a {
            color: var(--light-gray);
            white-space: nowrap;


            &:after {
                content: "";
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;

            }
        }

        &:last-of-type {
            border: none;
        }
    }
}



.NavigationMenuContent[data-motion='from-start'] {
    animation-name: enterFromLeft;
}

.NavigationMenuContent[data-motion='from-end'] {
    animation-name: enterFromRight;
}

.NavigationMenuContent[data-motion='to-start'] {
    animation-name: exitToLeft;
}

.NavigationMenuContent[data-motion='to-end'] {
    animation-name: exitToRight;
}

@media only screen and (min-width: 600px) {
    .NavigationMenuContent {
        width: auto;
    }
}

.NavigationMenuIndicator {
    background-color: var(--gray);
    position: absolute;
    transition: width, transform, 250ms ease;
}

.NavigationMenuIndicator[data-orientation="horizontal"] {
    left: 0;
    height: 3px;
    transform: translateX(var(--reka-navigation-menu-indicator-position));
    width: var(--reka-navigation-menu-indicator-size);
}

.NavigationMenuIndicator[data-state='visible'] {
    animation: fadeIn 200ms ease;
}

.NavigationMenuIndicator[data-state='hidden'] {
    animation: fadeOut 200ms ease;
}

.NavigationMenuViewport {
    position: relative;
    transform-origin: top center;
    margin-top: 10px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    height: var(--reka-navigation-menu-viewport-height);
    transition: width, height, 300ms ease;
}

.NavigationMenuViewport[data-state='open'] {
    animation: scaleIn 200ms ease;
}

.NavigationMenuViewport[data-state='closed'] {
    animation: scaleOut 200ms ease;
}

@media only screen and (min-width: 600px) {
    .NavigationMenuViewport {
        width: var(--reka-navigation-menu-viewport-width);
    }
}

.List {
    display: grid;
    padding: 22px;
    margin: 0;
    column-gap: 10px;
    list-style: none;
}



.ListItemLink {
    display: block;
    outline: none;
    text-decoration: none;
    user-select: none;
    padding: 12px;
    border-radius: 6px;
    font-size: 15px;
    line-height: 1;
}

.ListItemLink:focus {
    box-shadow: 0 0 0 2px var(--grass-7);
}

.ListItemLink:hover {
    background-color: var(--mauve-3);
}


.ViewportPosition {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 100%;
    left: 0;
    perspective: 2000px;
    z-index: 1000;
}

.CaretDown {
    position: relative;
    color: var(--grass-10);
    top: 1px;
    transition: transform 250ms ease;
}

[data-state='open']>.CaretDown {
    transform: rotate(-180deg);
}

.Arrow {
    position: relative;
    top: 70%;
    background-color: white;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-top-left-radius: 2px;
}

@keyframes enterFromRight {
    from {
        opacity: 0;
        transform: translateX(200px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes enterFromLeft {
    from {
        opacity: 0;
        transform: translateX(-200px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes exitToRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(200px);
    }
}

@keyframes exitToLeft {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(-200px);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: rotateX(-30deg) scale(0.9);
    }

    to {
        opacity: 1;
        transform: rotateX(0deg) scale(1);
    }
}

@keyframes scaleOut {
    from {
        opacity: 1;
        transform: rotateX(0deg) scale(1);
    }

    to {
        opacity: 0;
        transform: rotateX(-10deg) scale(0.95);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>