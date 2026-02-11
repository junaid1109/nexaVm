<template>
    <div class="news-hero">
        <div class="contents content-width">
            <h1 class="news-hero-title">{{ newsHeroTitle }}</h1>
            <p class="news-hero-subtitle"  v-if="newsHeroTitle">{{ newsHeroSubtitle }}</p>
        </div>
    </div>
</template>



<script lang="ts" setup>

withDefaults(defineProps<{
    newsHeroTitle: string,
    newsHeroSubtitle?: string,
}>(), {
    
})
</script>


<style lang="postcss">
.news-hero {
    padding: var(--app-margin);
    height: 650px;
    position: relative;
    background-color: var(--light-gray);
    display:flex;
    align-items:center;
    font-size: var(--header-h2);

    .news-hero-title{
         font-size: var(--header-h1);
         font-weight: 300;
    }

}
</style>