<template>

    <div class="product-card">
        <Icon class="icon" :name="icon" size="2em" mode="svg" />
        <component :is="tag" class="title">{{ title }}</component>
        <p class="description">
            <slot></slot>
        </p>
        <!-- Only render the AppButton if showButton is true -->
        <a v-if="showButton" variant="link" :href="url" class="download-button" target="_blank">
            {{ $t('download-product-brochure') }}
            <Icon name="local:download" size="1.4em" />
        </a>
    </div>


</template>
<script lang="ts" setup>


withDefaults(defineProps<{
    showButton?: boolean,
    url: string,
    title: string,
    tag?: string,
    icon: string
}>(), {
    tag: 'h4',
    showButton: true
})






</script>
<style lang="postcss">
.product-card {
    padding: 32px;
    color: var(--white);
    background-color: var(--dark-gray-2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    font-size: var(--text-small);

    .icon {
        margin-bottom: 42px;
        color: var(--accent-blue);

        path {
            stroke-width: 2px;
        }

    }

    .title {
        font-size: 32px;
        line-height: 1;
        font-weight: var(--regular);
        margin: 0;
        margin-bottom: 20px;
    }

    .description {
        display: block;
        margin: 0;
        margin-bottom: 42px;
        font-size: var(--text);
        max-width: 50ch;
    }

    .ui-button {
        margin-top: auto;
        align-self: flex-start;
    }

    .download-button {

        margin-top: auto;
        align-self: flex-start;
        color: var(--accent-blue);
        font-weight: var(--bold);
        display: flex;
        align-items: center;
        cursor: pointer;
    }
}
</style>
