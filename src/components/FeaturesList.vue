
<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
    items: {
        type: Object as PropType<String[] | null>,
        default: null,
        required: true,
    },
    caption: {
        type: Object as PropType<String | null>,
        default: null,
        required: false,
    }
})
</script>

<template>
    <h2 class="mb-2 colon-after text-xl font-textbold block leading-none" v-if="props.caption">{{ props.caption }}</h2>
    <ul class="mb-6">
        <li v-for="item in props.items" class="leading-5">
            {{ item }}
        </li>
    </ul>
</template>


<style  scoped>
ul {
    @apply list-square pl-5;

    li {
        @apply relative mb-2;

        &::marker {
            @apply text-blue-400;
        }
    }
}
</style>
