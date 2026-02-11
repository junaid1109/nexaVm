<template>
    <div class="text-block">
        <div class="contents content-width">
            <h2 class="title">
                <slot name="title"></slot>
            </h2>
            <div class="text">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style lang="postcss">
.text-block {
    padding-block: 76px;
    padding-inline: var(--app-margin);

    .contents {
        display: flex;
        gap: 48px;

        &>* {
            flex: 1;
        }

        .title {
            font-size: var(--header-h2);
            font-weight: 300;
            line-height: 1;
            margin: 0;
            margin-bottom: 16px;
        }

    }
}


@media screen and (max-width: 800px) {
.text-block {
    padding-inline: var(--app-margin-mobile);

    .contents {
        display: block;
    }
}

}


</style>