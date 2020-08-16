<template>
    <div class="vue-quote-app">
        <div v-if="settings.title.length > 0" class="section-header text-center">
            <h2>{{ settings.title }}</h2>
        </div>
        <div class="quotes-wrapper">
            <div class="quotes-slider" :data-count="`${blocks.length}`">
                <div v-for="(block, index) in blocks" :key="`block-id-${index}`">
                    <blockquote class="quotes-slider__text text-center">
                        <span class="quote-icon">
                            <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-quote" viewBox="0 0 41 35"><path d="M10.208 17.711h6.124v16.332H0V21.684C0 8.184 5.444.956 16.332 0v6.125c-4.083 1.14-6.124 4.414-6.124 9.82v1.766zm24.498 0h6.124v16.332H24.498V21.684C24.498 8.184 29.942.956 40.83 0v6.125c-4.083 1.14-6.124 4.414-6.124 9.82v1.766z" fill="#000" fill-rule="evenodd"/></svg>
                        </span>
                        <div v-html="block.quote" class="rte-setting rte"></div>
                        <cite>{{ block.author }}</cite>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            settings: Object,
            blocks: Array
        }
    }
</script>