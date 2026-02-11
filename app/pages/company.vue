<template>
    <div class="our-company">
        <AppHero 
        :title="$t('company-title')"
        :subtitle="$t('company-subtitle')"
        img="/img/abstract-3.png"/>
        

        <div class="light-gray">
            <TextBlock>

                <template #title>
                   {{ $t('about-us') }}
                </template>

                 {{ $t('about-us-paragraph1') }}
            </TextBlock>

            <CardFacts />

            <TextBlock>
                {{ $t('about-us-paragraph2') }}
            </TextBlock>

            <CompanyDetails />

        </div>


    </div>
</template>
<script lang="ts" setup>
// SEO
useHead({
  meta: [
    { name: "description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:title", content: "NexaVM | Company" },
    { property: "og:description", content: "NexaVM is revolutionising enterprise infrastructure with cutting-edge virtualisation technology." },
    { property: "og:image", content: "/img/default.jpg" },
    { property: "og:url", content: `https://nexavm.com/company` },
  ]
});
</script>
<style lang="postcss" scoped>
.light-gray {
    background-color: var(--light-gray);
}
</style>
