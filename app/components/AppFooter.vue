<template>

    <footer class="app-footer">
        <div class="contents content-width">
            <div class="entries">
                <div class="address">
                    <p>
                        NEXAVM Technologies AG <br />
                        Via Serafino Balestra 27 <br />
                        6900 Lugano (Switzerland) <br />
                    </p>
                    <p>
                        VAT CHE-394.261.609
                    </p>
                </div>

                <ul class="navigation">

                    <li>
                        <h3>Community</h3>
                        <ul>
                            <li>
                                <NuxtLink :to="$localePath('https://hive.nexavm.com/category/5/technical-support')"
                                    target="_blank">{{ $t('Support') }}
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>
                            <li>
                                 <NuxtLink :to="$localePath('https://hive.nexavm.com/category/6/download.html')"
                                    target="_blank">{{ $t('Download') }}
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>
                            <li>
                               <NuxtLink :to="$localePath('https://hive.nexavm.com/category/7/knowledgebase')"
                                    target="_blank">{{ $t('nowledge-base') }}
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath('https://hive.nexavm.com/category/3/blogs')" target="_blank">
                                    {{ $t('Blog') }}
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>

                        </ul>
                    </li>


                    <li>
                        <h3>{{ $t('Products') }}</h3>
                        <ul>
                            <li>
                                <NuxtLink :to="$localePath(`/products#${$t('Virtualization')}`)">
                                    {{ $t('Virtualization') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`/products#${$t('Multicloud')}`)">{{ $t('Multicloud') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`/products#${$t('Software-Defined-Storage')}`)">
                                    {{ $t('Software-Defined-Storage') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`/products#${$t('VDI')}`)">{{ $t('VDI') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`https://hive.nexavm.com/category/8/documentation`)">{{ $t('Documentation') }}</NuxtLink>
                            </li>
                            <!-- <li>
                                <NuxtLink :to="$localePath(`/products#${$t('MultiplatformMigration')}`)">
                                    {{ $t('Multiplatform Migration') }}
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`/products#${$t('DisasterRecovery')}`)">
                                    {{ $t('Disaster Recovery') }}
                                </NuxtLink>
                            </li> -->
                        </ul>
                    </li>

                    <li>
                        <h3>{{ $t('Company') }}</h3>
                        <ul>
                            <li>
                                <NuxtLink :to="$localePath(`/company`)">{{ $t('About') }}</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="$localePath(`/company`)">{{ $t('Contact') }}</NuxtLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h3>Social</h3>
                        <ul>
                            <li>
                                <NuxtLink to="https://www.linkedin.com/company/nexavm/" target="_blank"
                                    rel="noopener noreferrer">Linkedin
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="https://www.youtube.com/@nexavm" target="_blank"
                                    rel="noopener noreferrer">Youtube
                                    <Icon name="local:external-link" class="ExternalLink" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>

                </ul>

            </div>

            <Icon name="local:logo" size="90px" class="logo" />

            <div class="last">
                <div class="copyright">©{{ currentYear }} {{ $t('All Rights Reserved') }}</div>
                <NuxtLink :to="$localePath('/legal')">{{ $t('Legal') }}</NuxtLink>
                <NuxtLink to="/sla.pdf" target="_blank" rel="noopener noreferrer">SLA</NuxtLink>
                <NuxtLink :to="$localePath('/privacy-policy')">{{ $t('Privacy policy') }}</NuxtLink>
            </div>
        </div>
    </footer>


</template>

<script setup lang="ts">

const currentYear = computed(() => new Date().getFullYear())

</script>

<style lang="postcss">
.app-footer {
    padding: 76px var(--app-margin) 48px var(--app-margin);
    background-color: var(--dark-gray-2);
    color: var(--white);
    font-size: var(--text-small);
    font-weight: var(--light);


    .entries {

        display: flex;
        gap: 24px;
        justify-content: space-between;
        margin-bottom: 48px;

        .navigation {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            margin: 0;
            padding: 0;
            list-style: none;

            h3 {
                font-size: var(--eyebrow-header) !important;
                color: var(--accent-blue);
                text-transform: uppercase;
                letter-spacing: 0.1rem;
                font-weight: var(--light);

            }

            ul,
            li {
                list-style: none;
                margin: 0;
                padding: 0;
                font-size: var(--text-small);
            }

        }

    }

    .logo {
        margin-block: 24px;
    }

   .last {
    font-size: var(--text-mini);
    display: flex;
    flex-wrap: wrap; /* allow items to wrap */
    justify-content: center;
    gap: 12px; /* smaller gap for mobile */
    align-items: center;
    color: var(--dark-gray-3);
    padding: 1rem;

    > * {
        white-space: normal; /* allow wrapping if needed */
    }

    .copyright {
        margin-right: auto; /* keeps it on the left on larger screens */
    }

    a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s;
    }

    a:hover {
        color: var(--gray);
    }
}

/* Mobile adjustments */
@media screen and (max-width: 600px) {
    .last {
        flex-direction: column;
        align-items: center;
        gap: 8px;
        text-align: center;
    }

    .copyright {
        margin-right: 0;
    }
}

}



@media screen and (max-width: 800px) {

    .app-footer {
        padding: var(--app-margin-mobile);
    }

    .entries {
        flex-direction: column;
        gap: 48px;
        margin-top: 32px;

        .navigation {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }

    .logo {
        width: 50%;
    }

}
</style>
