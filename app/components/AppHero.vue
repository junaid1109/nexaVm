<template>

    <div class="app-hero">
        <div class="background"><img :src="img"></div>
        <div class="contents content-width">
            <h1 class="title">{{ title }}</h1>
            <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
    title: string,
    subtitle?: string,
    img?: string,
}>(), {
    img: '/img/abstract-2.png'
})


</script>
<style lang="postcss">
.app-hero {
    padding: var(--app-margin);
    height: 650px;
    position: relative;

    .contents {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        position: relative;
        z-index: 50;

        .title {
            font-size: var(--header-h1);
            font-weight: 300;
            line-height: 1;
            margin: 0;
            margin-bottom: 16px;
        }

        .subtitle {
            font-size: var(--subheader);
            line-height: 1.2;
            font-weight: 200;
            max-width: 40ch;
        }

    }

    .background {
        position: absolute;
        z-index: 0;
        right: 0;
        top: 0;
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

@media screen and (max-width: 800px) {
.app-hero {
    padding: var(--app-margin-mobile);
    height: 80vh;
    position: relative;
}

}
</style>