<template>
  <div class="page privacy">
	 <NewsHero 
      :news-hero-title="$t('privacy1-title')"
    />
    <NewsSection 
      :news-paragraph="$t('privacy1-paragraph')"
    />
  </div>
</template>
<script lang="ts" setup></script>

<style lang="postcss" scoped>
.privacy{
	background-color: var(--light-gray);
	padding-bottom:200px;
}</style>