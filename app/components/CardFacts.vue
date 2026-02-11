<template>

    <div class="card-facts">

        <div class="contents content-width">

            <h2 class="block-title">{{ $t('our-impact') }}</h2>

            <div class="cards">
                <slot>
                    <CardFact img="/img/icons/integration.svg" alt="" :title="$t('impact1-title')">
                        {{ $t('impact1-description') }}
                    </CardFact>

                    <CardFact img="/img/icons/high-performance.svg" alt="" :title="$t('impact2-title')">
                         {{ $t('impact2-description') }}</CardFact>

                    <CardFact img="/img/icons/flexibility.svg" alt="" :title="$t('impact3-title')">
                        {{ $t('impact3-description') }}
                    </CardFact>

                    <CardFact img="/img/icons/optimize.svg" alt="" :title="$t('impact4-title')">
                         {{ $t('impact4-description') }}
                    </CardFact>

                </slot>
            </div>

            <AppButton icon="local:arrow-right" variant="link" :to="$localePath('/company')">
                {{ $t('Discover more') }}
            </AppButton>

        </div>

    </div>


</template>
<script lang="ts" setup></script>
<style lang="postcss">
.card-facts {
    padding-inline: var(--app-margin);
    padding-block: 128px;

    .contents {
        display: flex;

        flex-direction: column;
        gap: 56px;
        align-items: center;


        .block-title {
            font-size: 20px;
            color: var(--accent-orange);
            text-transform: uppercase;
            font-weight: var(--bold);
            
        }

    }

    .cards {
        display: flex;
        gap: 48px 0;
        justify-content: flex-start;
        flex-wrap: wrap;

        &>* {
            flex: 1;
        }
    }
}

@media screen and (max-width: 1200px) {
.card-facts{
    padding-inline: var(--app-margin-mobile);
    padding-block: 80px;

    .cards > *{
        flex:auto;
    }
}

   
}
</style>