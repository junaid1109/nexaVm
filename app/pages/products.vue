<template>
    <div class="products">
        <AppHero :title="$t('products-title')" :subtitle="$t('products-subtitle')" />
        <div class="products-list">
            <ProductCards :category="$t('Virtualization')">
                <ProductCard title="nSSV" :url="`/brochures/nSSV-${locale}.pdf`" icon="local:nssv">
                    {{ $t('nssv-description') }}
                </ProductCard>
                <ProductCard title="nHCI" :url="`/brochures/nHCI-${locale}.pdf`" icon="local:nbck">
                    {{ $t('nhci-description') }}
                </ProductCard>
            </ProductCards>
            <ProductCards :category="$t('Multicloud')">
                <ProductCard title="nCSSV" :url="`/brochures/nCSSV-${locale}.pdf`" icon="local:ncssv">
                    {{ $t('ncssv-description') }}
                </ProductCard>
                <!-- <ProductCard title="nCMP" :url="`/brochures/nCMP-${locale}.pdf`" icon="local:ncmp" :show-button="false">
                    {{ $t('ncmp-description') }}
                </ProductCard>
                <ProductCard title="nMCMP" :url="`/brochures/nMCMP-${locale}.pdf`" icon="local:nmcmp"
                    :show-button="false">
                    {{ $t('nmcmp-description') }}
                </ProductCard>  -->
            </ProductCards>
            <ProductCards :category="$t('Software-Defined-Storage')">
                <ProductCard title="nSAN" :url="`/brochures/nSAN-${locale}.pdf`" icon="local:nsan">
                    {{ $t('nsan-description') }}
                </ProductCard>
                <!-- <ProductCard title="nSDS" :url="`/brochures/nSDS-${locale}.pdf`" icon="local:nsds">
                    {{ $t('nsds-description') }}
                </ProductCard> -->
            </ProductCards>
            <ProductCards :category="$t('VDI')">
                <ProductCard title="nDesk" :url="`/brochures/nDESK-${locale}.pdf`" icon="local:ndesk">
                    {{ $t('ndesk-description') }}
                </ProductCard>
            </ProductCards>
            <!-- <ProductCards :category="$t('Multiplatform-Migration')">
                <ProductCard title="nCSSV" :url="`/brochures/-${locale}.pdf`" icon="local:nmcd">
                    Cloud Software Virtualization, Private and Hybrid Cloud platform, with open APIs, automate operations scripts, a billing system covering all business requirements.
                </ProductCard>
            </ProductCards> -->
            <!-- <ProductCards :category="$t('Disaster-Recovery')">
                <ProductCard title="nSR" :url="`/brochures/-${locale}.pdf`" icon="local:nsr">
                    Site Recovery is our all-in-one DR solution, designed to simplify the business continuity operations.
                </ProductCard>
                <ProductCard title="nBCK" :url="`/brochures/-${locale}.pdf`" icon="local:nbck">
                    Powerful integrated backup software for your VMs' local backup.
                </ProductCard>
            </ProductCards> -->

        </div>
    </div>
</template>
<script lang="ts" setup>

const { locale } = useI18n()


// SEO
useHead({
    meta: [
        { name: "description", content: "A complete stack of advanced technologies designed to bring virtualization to a whole new level." },
        { property: "og:title", content: "NexaVM | Products " },
        { property: "og:description", content: "A complete stack of advanced technologies designed to bring virtualization to a whole new level." },
        { property: "og:image", content: "/img/default.jpg" },
        { property: "og:url", content: `https://nexavm.com/products` },
    ]
});

</script>
<style lang="postcss" scoped>
.products-list {
    background-color: var(--light-gray);
    padding-block: 42px;
}
</style>
