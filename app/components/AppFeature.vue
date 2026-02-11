<template>

    <div class="app-feature">
        <component :is="tag" class="feature-title">
            <Icon v-if="icon" name="local:list-decoration" class="decoration" />
            {{ title }}
        </component>
        <p>
            <slot></slot>
        </p>
    </div>


</template>
<script lang="ts" setup>

withDefaults(defineProps<{
    title: string,
    tag?: string,
    icon?: boolean
}>(), {
    tag: 'h3',
    icon: true
})


</script>
<style lang="postcss">
.app-feature {
    padding-block: 32px;
    border-top: 1px solid var(--gray);

    font-size: var(--text-small);

    .decoration {
        color: var(--gray);
    }

    .feature-title {
        font-size: var(--subheader);
        font-weight: var(--regular);
        margin: 0;
    }

}
</style>