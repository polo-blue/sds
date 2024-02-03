
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
    <h2 class="font-headregular mb-6 font-medium text-lg colon-after" v-if="props.caption">{{ props.caption }}</h2>
    <ul class="mb-4">
        <li v-for="item in props.items" class="leading-5">
            {{ item }}
        </li>
    </ul>
</template>


<style lang="scss" scoped>
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
