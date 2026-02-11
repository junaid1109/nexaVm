<template>
  <div class="page legal">
	 <NewsHero 
      :news-hero-title="$t('legal1-title')"
    />
    <NewsSection 
      :news-title="$t('legal1-title')"
      :news-paragraph="$t('legal1-paragraph')"
    />
	<NewsSection 
      :news-title="$t('legal2-title')"
      :news-paragraph="$t('legal2-paragraph')"
    />
	<NewsSection 
      :news-title="$t('legal3-title')"
      :news-paragraph="$t('legal3-paragraph')"
    />
  </div>
</template>
<script lang="ts" setup></script>

<style lang="postcss" scoped>
.legal{
	background-color: var(--light-gray);
	padding-bottom:200px;
}</style>