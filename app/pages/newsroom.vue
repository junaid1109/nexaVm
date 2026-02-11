<template>
	   <div class="newsroom">
        <AppHero 
        :title="$t('newsroom-title')"
        :subtitle="$t('newsroom-subtitle')"
        img="/img/abstract-4.png"/>
    </div>
</template>
<script lang="ts" setup>
// SEO
useHead({
  meta: [
    { name: "description", content: "Stay up to date with product news, ecosystem updates, and insights from our community." },
    { property: "og:title", content: "NexaVM | Newsroom" },
    { property: "og:description", content: "Stay up to date with product news, ecosystem updates, and insights from our community." },
    { property: "og:image", content: "/img/default.jpg" },
    { property: "og:url", content: `https://nexavm.com/newsroom` },
  ]
});

</script>
<style lang="postcss" scoped></style>