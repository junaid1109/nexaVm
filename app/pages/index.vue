<template>
	<div>
	<HomepageLanding />
	<CardFacts />
	<HomepageFeatures />
	<CustomerSlides />
	
	</div>
</template>
<script lang="ts" setup>
// SEO
useHead({
  meta: [
    { name: "description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:title", content: "NexaVM" },
    { property: "og:description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:image", content: "/img/default.jpg" },
    { property: "og:url", content: `https://nexavm.com` },
  ]
});

</script>
<style lang="postcss" scoped></style>
