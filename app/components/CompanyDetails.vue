<template>
    <div class="company-details">
        <div class="contents content-width features-wrapper">
            <h2 class="title">{{ $t('here-for-you') }}</h2>
            <div class="features">
                <!-- Default Office -->
                <AppFeature :title="$t('Switzerland')" :icon="false">
                    Via Serafino Balestra 27 <br>
                    CH-6900 Lugano <br>
                    Switzerland
                </AppFeature>

                <!-- Dynamic Offices from API -->
                <AppFeature 
                    v-for="office in offices" 
                    :key="office.id"
                    :title="office.title" 
                    :icon="false"
                >
                    {{ office.address }}
                </AppFeature>

                <AppFeature :title="$t('email')" :icon="false">
                    <AppLink to="mailto:info@nexavm.com">info@nexavm.com</AppLink><br />
                    <AppLink to="mailto:hr@nexavm.com">hr@nexavm.com</AppLink>
                </AppFeature>
            </div>
        </div>
        <div class="background-image">
            <img src="/img/abstract-1.png" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Office = {
  id: number
  title: string
  address: string
}

const offices = ref<Office[]>([])

async function loadOffices() {
  try {
    const data = await $fetch('/api/offices')
    offices.value = data || []
  } catch (error) {
    console.error('Failed to load offices:', error)
    offices.value = []
  }
}

onMounted(() => {
  loadOffices()
})
</script>
<script setup lang="ts"></script>
<style lang="postcss">
.company-details {
    padding: 76px var(--app-margin);
    background-color: var(--light-gray);
    color: var(--black);
    position: relative;

    .contents {
        align-self: flex-end;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        z-index: 100;

        .title {
            font-size: var(--header-h2);
            letter-spacing: 3%;
            line-height: 1;
            font-weight: 300;
            margin: 0;
            max-width: 20ch;
        }

        .features {
            align-self: flex-end;

        }
    }

    .background-image {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        top: 25%;
        left: 0;
        height: 50%;
        width: auto;


        overflow: hidden;

        img {
            object-fit: contain;
            object-position: left;
            height: 100%;
            width: 100%;
        }
    }

    .features-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;

        :nth-child(4) {
            margin-bottom: 48px;
        }
    }
}

@media screen and (max-width: 1200px) {

    .company-details {
        padding: 76px var(--app-margin-mobile);


        .features-wrapper {
            grid-template-columns: 1fr;
            padding-bottom: 400px;

            :nth-child(4) {
                margin-bottom: 24px;
            }
        }

        .background-image {
            position: absolute;
            pointer-events: none;
            z-index: 1;
            top: auto;
            left: 0;
            bottom: 1%;
            height: 30%;
            width: auto;
        }

    }





}
</style>