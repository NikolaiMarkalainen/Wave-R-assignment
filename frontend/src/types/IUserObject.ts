<template>
  <n-modal v-model:show="show" :mask-closable="false" style="width: 500px">
    <n-card :title="data ? 'Edit User' : 'Add User'">
      <n-form :model="formData" label-placement="left" label-width="100">
        <n-form-item label="Firstname">
          <n-input v-model="formData.firstname" placeholder="Enter firstname" round />
        </n-form-item>

        <n-form-item label="Lastname">
          <n-input v-model="formData.lastname" placeholder="Enter lastname" round />
        </n-form-item>

        <n-form-item label="Age">
          <n-input-number v-model="formData.age" :min="0" :max="120" />
        </n-form-item>

        <n-form-item label="Occupation">
          <n-select
            v-model="formData.occupation"
            :options="occupationOptions"
            placeholder="Select occupation"
          />
        </n-form-item>

        <n-form-item label="Salary">
          <n-input-number v-model="formData.salary" :min="0" step="1000" />
        </n-form-item>

        <n-form-item label="Employed Year">
          <n-input-number v-model="formData.employed" :min="1900" :max="2100" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="close">Cancel</n-button>
          <n-button type="primary" @click="submit">Save</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IUserInterface } from '@/types/IUserObject'
import { NModal, NCard, NForm, NFormItem, NInput, NInputNumber, NSelect, NButton, NSpace } from 'naive-ui'

interface Props {
  show: boolean
  data: IUserInterface | null
}
const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'submit'])

// Local reactive form data
const formData = ref<IUserInterface>({
  id: 0,
  firstname: '',
  lastname: '',
  age: 0,
  occupation: '',
  salary: 0,
  employed: new Date().getFullYear(),
})

// Watch for prop changes to prefill form if editing
watch(
  () => props.data,
  (newVal) => {
    if (newVal) formData.value = { ...newVal }
  },
  { immediate: true }
)

const occupationOptions = [
  { label: 'Developer', value: 'developer' },
  { label: 'Sales', value: 'sales' },
  { label: 'HR', value: 'hr' },
  { label: 'Management', value: 'management' },
  { label: 'Customer Success', value: 'customer_success' },
  { label: 'Tester', value: 'tester' },
]

const close = () => {
  emit('update:show', false)
}

const submit = () => {
  emit('submit', { ...formData.value })
  close()
}
</script>

<style scoped>
.addParent {
  width: 100%;
}
</style>
