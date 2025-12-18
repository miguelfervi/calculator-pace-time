<template>
  <label class="block">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
      {{ label }}
    </span>
    <div class="flex gap-2">
      <div class="relative flex-1">
        <input
          :value="displayValue"
          :type="inputType"
          :placeholder="placeholder"
          :class="[
            inputClasses,
            inputType === 'number' ? 'no-spinner' : '',
            isCalculated ? 'pr-12' : '',
          ]"
          @input="handleInput"
        />
        <div
          v-if="isCalculated"
          class="absolute right-10 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400"
          title="Valor calculado"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <ClearButton
          :visible="isVisible"
          :on-click="handleClear"
          :title="clearTitle"
          :aria-label="clearTitle"
        />
      </div>
      <select :value="selectedUnit" :class="SELECT_CLASSES" @change="handleUnitChange">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ClearButton from "./ClearButton.vue";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  modelValue: string | number | null;
  selectedUnit: string;
  placeholder: string;
  options: Option[];
  inputType?: "text" | "number";
  isVisible: boolean;
  clearTitle: string;
  inputClasses: string | string[];
  isCalculated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  inputType: "text",
  isCalculated: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
  "update:selectedUnit": [value: string];
  clear: [];
}>();

const SELECT_CLASSES =
  "px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer outline-none transition";

const displayValue = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return "";
  }
  return String(props.modelValue);
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.inputType === "number" ? Number(target.value) : target.value;
  emit("update:modelValue", value);
};

const handleUnitChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:selectedUnit", target.value);
};

const handleClear = () => {
  emit("clear");
};
</script>

<style scoped>
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield;
}
</style>
