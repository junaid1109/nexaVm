<template>

    <div class="card-fact">
        <img :src="img" :alt="alt">
        <component :is="tag" class="title">{{ title }}</component>
        <slot></slot>
    </div>


</template>
<script lang="ts" setup>

withDefaults(defineProps<{
    img: string,
    alt: string,
    title: string,
    tag?: string
}>(), {
    tag: 'h3'
})


</script>
<style lang="postcss">
.card-fact {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-inline: 24px;
    padding-bottom: 24px;
    border-left: 1px solid var(--gray);

    font-size: var(--text-small);

    .title {
        font-size: var(--subheader);
        font-weight: var(--regular);
        margin: 0;
        min-height:90px;
    }

    img {
        margin-bottom: 24px;
        align-self: center;
        min-height: 100px;
        max-width: 100%;
    }
}

@media screen and (max-width: 1200px) {
.card-fact {

    .title {
        min-height:24px;
    }

    img {
        margin-bottom: 24px;
        align-self: center;
        min-height: 100px;
        max-width: 100%;
    }
}
}
</style>