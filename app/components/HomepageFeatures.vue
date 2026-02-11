<template>
    <div class="homepage-features">
        <div class="contents content-width features-wrapper">
            <h2 class="title">{{ $t('features-title') }}</h2>
            <div class="features">
                <AppFeature :title="$t('features-item1-title')">
                   {{ $t('features-item1-description') }}
                </AppFeature>

                <AppFeature :title="$t('features-item2-title')">
                    {{ $t('features-item2-description') }}
                </AppFeature>

                <AppFeature :title="$t('features-item3-title')">
                     {{ $t('features-item3-description') }}
                </AppFeature>

                <AppFeature :title="$t('features-item4-title')">
                     {{ $t('features-item4-description') }}
                </AppFeature>

                <AppButton icon="local:arrow-right" variant="link" :to="$localePath('/products')">
                    {{ $t('Explore products') }}
                </AppButton>

            </div>
        </div>
        <div class="background-image">
            <img src="/img/abstract-1.png" />
        </div>
    </div>


</template>
<script setup lang="ts"></script>
<style lang="postcss">
.homepage-features {
    padding: 76px var(--app-margin);
    background-color: var(--light-gray);
    color: var(--black);
    position: relative;

    .contents {
        align-self: flex-end;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 32px;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        z-index: 100;
        .title {
            font-size: var(--header-h2);
            letter-spacing: 3%;
            line-height: 1;
            font-weight: 300;
            margin: 0;
            max-width: 20ch;
        }

        .features {
            align-self: flex-end;
    
        }
    }

    .background-image {
        position: absolute;
        pointer-events: none;
        z-index: 1;
        top: 25%;
        left: 0;
        height: 50%;
        width: auto;


        overflow: hidden;

        img {
            object-fit: contain;
            object-position: left;
            height: 100%;
            width: 100%;
        }
    }

    .features-wrapper{
        display:grid;
        grid-template-columns:1fr 1fr;

         :nth-child(4){
            margin-bottom:48px;
        }
    }
}

@media screen and (max-width: 1200px) {

    .homepage-features {
    padding: 76px var(--app-margin-mobile);
    

     .features-wrapper{
        grid-template-columns:1fr ;
        padding-bottom:400px;
        
        :nth-child(4){
            margin-bottom:24px;
        }
}

 .background-image {
    position: absolute;
        pointer-events: none;
        z-index: 1;
        top: auto;
        left: 0;
        bottom:1%;
        height: 30%;
        width: auto;
    }

    }

   



}
</style>