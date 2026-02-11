<template>
    <div class="tryIt-landing">
        <div class="contents content-width">
            <h2 class="title">
                {{ $t('tryitnow-title') }}
            </h2>
            <p class="subtitle">
               {{ $t('demo-subtitle') }}
            </p>
            
            <ul>
                <li>
                    <Icon class="icon" name="local:list-decoration" size="1.6em" /> 
                    {{ $t('demo-list-item1') }}
                </li>
                <li>
                    <Icon class="icon" name="local:list-decoration" size="1.6em" /> 
                     {{ $t('demo-list-item2') }}
                </li>
                <li>
                    <Icon class="icon" name="local:list-decoration" size="1.6em" /> 
                     {{ $t('demo-list-item3') }}
                </li>
            </ul>
        </div>
        <TryItNowForm/>
    </div>


</template>
<script setup lang="ts"></script>
<style lang="postcss">
.tryIt-landing {
    padding: var(--app-margin);
    background-color: var(--dark-gray-2);
    min-height: 90vh;
    color: var(--white);
    position: relative;
    display: grid;
    grid-template-columns: 60% 40%;

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
        padding-right:64px;
        margin: 0 !important;

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

        ul {
            list-style: none;
            padding: 0;
            font-weight: 100;

            li {
                display: flex;
                gap: 24px;
                align-items: center;
                max-width:60ch;

                &+li {
                    margin-top: 24px;
                }
            }

            .icon {
                color: var(--accent-orange);
            }
        }
    }
}


@media screen and (max-width: 1500px) {
    .tryIt-landing {
        grid-template-columns: 50% 50%;
    }
}

@media screen and (max-width: 1200px) {
    .tryIt-landing {
        padding: var(--app-margin-mobile);
        position: relative;
        display: block;

        .contents {
        padding-right:0px;
        margin: 150px 0 !important;
    }
    }
}
</style>
