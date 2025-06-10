
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
    <h2 
        class="features-list-caption" 
        v-if="props.caption"
    >
        {{ props.caption }}
    </h2>
    <ul class="features-list-ul">
        <li 
            v-for="item in props.items" 
            class="features-list-item"
            :key="item"
        >
            {{ item }}
        </li>
    </ul>
</template>


