<template>
    <div class="news-section">
        <div class="news-image" v-if="newsImg">
        <img :src="newsImg"></div>
        <div class="contents content-width">
            <h1 class="news-section-title"  v-if="newsTitle">{{ newsTitle }}</h1>
            <p class="news-section-paragraph">{{ newsParagraph }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

withDefaults(defineProps<{
    newsTitle?: string,
    newsParagraph: string,
    newsImg?: string,
}>(), {
    
})
</script>


<style lang="postcss">
.news-section {
    position: relative;
    max-width:50vw;
    margin:0 auto;
    padding-bottom: var(--app-margin);
  
    .contents {
        .news-section-title {
            font-size: var(--header-h2);
            font-weight: 300;
            line-height: 1;
            margin: 0;
            margin-bottom: 16px;
        }
        .news-section-paragraph {
            font-size: var(--text);
            line-height: 1.6;
            font-weight: 200;
        }

    }

    .news-image {
        max-width:40vw;
        height: 100%;
       
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}


@media screen and (max-width: 800px) {
.news-section {
    max-width:100vw;
    margin:0 var(--app-margin-mobile);
    padding-bottom: var(--app-margin-mobile);
}
}
</style>