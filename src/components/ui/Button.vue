<script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })
  
  const buttonClasses = computed(() => {
    return [
        'rounded',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'flex',
        'items-center',
        'justify-center',
        'cursor-pointer',
        {
            'bg-amber-500 text-white hover:bg-amber-600': props.variant === 'primary',
            'bg-white text-amber-500 border border-amber-500 hover:bg-amber-50': props.variant === 'outline',
            'bg-transparent text-amber-500 hover:bg-amber-50': props.variant === 'ghost',
        },
        {
            'px-4 py-2 text-sm': props.size === 'small',
            'px-6 py-3 text-base': props.size === 'medium',
            'px-8 py-4 text-lg': props.size === 'large',
        },
        {
            'opacity-50 cursor-not-allowed': props.disabled,
        },
    ]
  })
</script>

<template>
    <button
      :class="buttonClasses"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
</template>
