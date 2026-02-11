<template>

    <div class="app-quote">

        <div class="contents content-width">

            <img src="/img/stack-gradient-light.svg" >

            <blockquote>
                <slot>
                   {{$t('quote')}}
                </slot>
            </blockquote>

            <!-- <p class="cite">
                <slot name="cite">
                    Jackie Chen,
                    <span class="role">CEO NEXAVM</span>
                </slot>
            </p> -->
        </div>
    </div>


</template>
<script lang="ts" setup>





</script>
<style lang="postcss">
.app-quote {
    padding-inline: var(--app-margin);
    padding-block: 196px;

    .contents {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -80px;

        blockquote {
            font-size: var(--header-h2);
            line-height: 1.2;
            letter-spacing: 3%;
            font-style: italic;
            font-weight: var(--regular);
            margin: 0;
            padding: 0;
            text-align: center;
            max-width: 50ch;
            margin-bottom: 24px;

        }

        .cite {
            font-size: var(--text-small);

            .role {
                font-size: var(--eyebrow-header);
                text-transform: uppercase;
                color: var(--accent-orange);
                font-weight: 500;
            }
        }

    }


}
</style>