<template>
    <div class="product-cards">
        <div class="contents content-width">
            <NuxtLink :id="category" :to="`#${category}`">
                <h3 class="category">{{ category }}</h3>
            </NuxtLink>
            <div class="cards">
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

defineProps<{
    category: string
}>()

</script>
<style lang="postcss">
.product-cards {
    padding-inline: var(--app-margin);
    padding-block: 24px;

    .contents {
        border-top: 1px solid var(--accent-blue);

        .category {
            font-size: 20px;
            color: var(--accent-blue);
            text-transform: uppercase;
        }

        display: flex;
        flex-direction: column;

        .cards {
            align-self: flex-end;
            display: flex;
            justify-content: stretch;
            align-items: stretch;
            gap: 8px;
            flex-wrap: wrap;
            width: 66%;

            &>* {
                flex: 1;
            }
        }
    }
}

@media screen and (max-width: 800px) {
.product-cards {
    padding-inline: var(--app-margin-mobile);

    .contents {
       
        .cards {
            display: block;
            width: 100%;
           
            >*{
             margin-bottom:24px;
            }
        }
    }
}

}

</style>