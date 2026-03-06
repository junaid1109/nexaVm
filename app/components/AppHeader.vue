<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '#imports'
import { useMediaQuery, useScrollLock } from '@vueuse/core'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isMobile = useMediaQuery('(max-width: 1200px)')
const menuOpen = ref(false)
const openSub = ref<string | null>(null)

const route = useRoute()
const lock = useScrollLock(window)

watch(menuOpen, v => (lock.value = v))
watch(() => route.fullPath, () => {
  menuOpen.value = false
  openSub.value = null
})

function toggleSub(name: string) {
  if (!isMobile.value) return
  openSub.value = openSub.value === name ? null : name
}


</script>

<template>
  <header class="header">
    <div class="inner">
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <Icon name="local:logo" size="36px" />
      </NuxtLink>

      <!-- Desktop menu -->
      <nav class="nav desktop">
        <ul class="menu">
          <!-- Products -->
			<li class="item has-sub">
				<span class="link">{{ $t('Products') }}</span>
                    <Icon name="local:chevron-down" class="CaretDown" />

				<ul class="submenu">
					<li>
							<NuxtLink :to="$localePath(`/products#${$t('Virtualization')}`)"  >
								{{ $t('Virtualization') }}
							</NuxtLink>
					</li>
					<li>
							<NuxtLink :to="$localePath(`/products#${$t('Multicloud')}`)">{{ $t('Multicloud') }}
							</NuxtLink>
					</li>
					<li>
							<NuxtLink :to="$localePath(`/products#${$t('Software-Defined-Storage')}`)">
								{{ $t('Software-Defined-Storage') }}
							</NuxtLink>
					</li>
					<li>
							<NuxtLink :to="$localePath(`/products#${$t('VDI')}`)">{{ $t('VDI') }}</NuxtLink>
					</li>
					<li>
							<NuxtLink :to="$localePath(`https://hive.nexavm.com/category/8/documentation`)">{{ $t('Documentation') }}</NuxtLink>
					</li>
				</ul>
			</li>

          <!-- Resources -->
          <li class="item has-sub">
            <span class="link"> {{ $t('Resources') }}</span>
			<Icon name="local:chevron-down" class="CaretDown" />
            <ul class="submenu">
              <li><NuxtLink to="https://hive.nexavm.com/category/5/technical-support">{{ $t('Support') }}</NuxtLink></li>
              <li><NuxtLink to="https://hive.nexavm.com/category/6/download.html">{{ $t('Download') }}</NuxtLink></li>
              <li><NuxtLink to="https://hive.nexavm.com/category/7/knowledgebase">{{ $t('nowledge-base') }}</NuxtLink></li>
              <li><NuxtLink to="https://hive.nexavm.com/category/3/blogs">{{ $t('Blog') }}</NuxtLink></li>
            </ul>
          </li>

          <li class="item"><NuxtLink class="link" to="/company">{{ $t('Company') }}</NuxtLink></li>
          
          <li class="item has-sub">
            <span class="link">{{ $t('partner') }}</span>
            <Icon name="local:chevron-down" class="CaretDown" />
            <ul class="submenu">
              <li><NuxtLink to="/become-a-partner">Become a Partner</NuxtLink></li>
              <li><NuxtLink to="/partners/technology">Technology Partner</NuxtLink></li>
              <li><NuxtLink to="/partners/channel">Channel Partner</NuxtLink></li>
            </ul>
          </li>
          
          <li class="item"><NuxtLink class="link" to="/compatibility">{{ $t('compatibility') }}</NuxtLink></li>
          <li class="item"><NuxtLink class="link" to="/annoucements">{{ $t('annoucement') }}</NuxtLink></li>
          <li class="item"><NuxtLink class="link" to="/customers">{{ $t('our-customers') }}</NuxtLink></li>
        </ul>
      </nav>

      <!-- Right side -->
      <div class="utils">
        <div class="langs">
          <NuxtLink
            v-for="l in locales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            :class="{ active: l.code === locale }"
          >
            {{ l.code.toUpperCase() }}
          </NuxtLink>
        </div>

        <!-- DESKTOP buttons -->
        <NuxtLink class="btn desktop" to="/try-it-now">{{ $t('tryitnow-title') }}</NuxtLink>
        <NuxtLink class="btn desktop" to="/request-a-demo">{{ $t('Request a demo') }}</NuxtLink>

        <!-- Mobile burger -->
        <button class="burger mobile" @click="menuOpen = !menuOpen">
          <Icon :name="menuOpen ? 'local:close' : 'local:hamburger-menu'" />
        </button>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <nav class="nav mobile" v-if="menuOpen">
      <ul class="menu mobile-menu">
        <li class="item" @click="toggleSub('products')" :class="{ open: openSub === 'products' }">
          <span class="link"> {{ $t('Products') }}</span>
          <ul class="submenu">
            <li><NuxtLink to="/products#virtualization">{{ $t('Virtualization') }}</NuxtLink></li>
            <li><NuxtLink to="/products#multicloud">{{ $t('Multicloud') }}</NuxtLink></li>
            <li><NuxtLink to="/products#software-defined-storage">{{ $t('Software-Defined-Storage') }}</NuxtLink></li>
            <li><NuxtLink to="/products#vdi">{{ $t('VDI') }}</NuxtLink></li>
            <li><NuxtLink to="https://hive.nexavm.com/category/8/documentation">{{ $t('Documentation') }}</NuxtLink></li>
          </ul>
        </li>

        <li class="item" @click="toggleSub('resources')" :class="{ open: openSub === 'resources' }">
          <span class="link">{{ $t('Resources') }}</span>
          <ul class="submenu">
            <li><NuxtLink to="https://hive.nexavm.com/category/5/technical-support">{{ $t('Support') }}</NuxtLink></li>
            <li><NuxtLink to="https://hive.nexavm.com/category/6/download.html">{{ $t('Download') }}</NuxtLink></li>
            <li><NuxtLink to="https://hive.nexavm.com/category/7/knowledgebase">{{ $t('nowledge-base') }}</NuxtLink></li>
            <li><NuxtLink to="https://hive.nexavm.com/category/3/blogs"> {{ $t('Blog') }}</NuxtLink></li>
          </ul>
        </li>

        <li class="item"><NuxtLink class="link" to="/company">{{ $t('Company') }}</NuxtLink></li>
        
        <li class="item" @click="toggleSub('partners')" :class="{ open: openSub === 'partners' }">
          <span class="link">{{ $t('partner') }}</span>
          <ul class="submenu">
            <li><NuxtLink to="/become-a-partner">Become a Partner</NuxtLink></li>
            <li><NuxtLink to="/partners/technology">Technology Partner</NuxtLink></li>
            <li><NuxtLink to="/partners/channel">Channel Partner</NuxtLink></li>
          </ul>
        </li>
        
        <li class="item"><NuxtLink class="link" to="/compatibility">{{ $t('compatibility') }}</NuxtLink></li>
        <li class="item"><NuxtLink class="link" to="/customers">{{ $t('our-customers') }}</NuxtLink></li>

        <!-- MOBILE buttons -->
        <li class="mobile-buttons">
          <NuxtLink class="btn" to="/try-it-now">{{ $t('tryitnow-title') }}</NuxtLink>
          <NuxtLink class="btn" to="/request-a-demo"> {{ $t('Request a demo') }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>



.header {
  background: #00151c;
  color: #fff;
  position: relative;
  z-index: 1000;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.logo {
  display: flex;
  align-items: center;
}

/* MENU */
.menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  position: relative;
}

.link {
  color: #fff;
  cursor: pointer;
  text-decoration: none;
}

/* DESKTOP SUBMENU */
.desktop .has-sub:hover > .submenu {
  display: block;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #00151c;
  border-radius: 8px;
  min-width: 220px;
  padding: 0.5rem 0;
  list-style: none; /* ← remove bullets */
  margin: 0;         /* ← remove default margin */
}

.submenu li a {
  display: block;
  padding: 10px 16px;
  color: #fff;
  text-decoration: none;
 list-style: none;

}

li a:hover {
  background: #e85039;
  padding: 10px;
	border-radius: 8px;
}
.submenu li a:hover {
  background: #e85039;
}

/* UTILS */
.utils {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.langs a {
  color: #fff;
  margin-right: 6px;
  text-decoration: none;
}

.langs a.active {
  font-weight: bold;
}

.btn {
  background: #e85039;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
}

.burger {
  background: none;
  border: none;
  color: #fff;
}

/* MOBILE */
.mobile {
  display: none;
}

@media (max-width: 1200px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }

  .mobile-menu {
    flex-direction: column;
    gap: 0;
    padding: 1rem;
  }

  .mobile-menu .item {
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.15);
  }

  .mobile-menu .submenu {
    position: static;
    background: transparent;
    padding-left: 1rem;
    display: none;
    list-style: none;
    margin: 0;
    padding-left: 1rem;
  }

  .mobile-menu .item.open > .submenu {
    display: block !important;
  }

  .mobile-menu .submenu li {
    padding: 8px 0;
  }

  .mobile-menu .submenu li a {
    color: #fff;
    text-decoration: none;
    display: block;
  }

  .mobile-menu .submenu li a:hover {
    color: #e85039;
  }

  .mobile-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 1rem;
  }
}
</style>
