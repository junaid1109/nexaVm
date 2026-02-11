<template>
    <div class="homepage-landing">
        <div class="contents content-width">
            <h2 class="title">{{ $t('homepage-title') }}</h2>
            <p class="subtitle">{{ $t('homepage-subtitle') }}</p>
            <div class="call-to-actions">
                <AppButton variant="accent" :to="$localePath('/request-a-demo')">{{ $t('Request a demo') }}</AppButton>
                <AppButton icon="local:arrow-right" variant="link" :to="$localePath('/products')">
                    {{ $t('Explore products') }}
                </AppButton>
            </div>
        </div>
        <div class="background-image">
            <img src="/img/stack-gradient.svg" />
        </div>
    </div>


</template>
<script setup lang="ts"></script>
<style lang="postcss">
.homepage-landing {
    padding: var(--app-margin);
    background-color: var(--dark-gray-2);
    min-height: 90vh;
    color: var(--white);

    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .contents {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        z-index: 10;

        .title {
            font-size: var(--header-h1);
            letter-spacing: 3%;
            line-height: 1;
            font-weight: var(--light);
            margin: 0;
            max-width: 30ch;
        }

        .subtitle {
            font-size: var(--subheader);
            font-weight: var(--light);
            max-width: 50ch;
            line-height: 1.3;
        }

        .call-to-actions {
            display: flex;
            gap: 48px;
            margin-top: 48px;
        }
    }

    @media screen and (max-width: 600px) {
        .call-to-actions {
            flex-direction: column;
            align-items: stretch;
        }
    }

    .background-image {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        top: 0;
        right: 0;
        height: 100%;
        width: auto;


        overflow: hidden;

        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
}


@media screen and (max-width: 800px) {
    .homepage-landing {
        padding: var(--app-margin-mobile);
        position: relative;

        .background-image {
            top: auto;
            height: 40vh;
            bottom: 0;


        }
    }


}
</style>
