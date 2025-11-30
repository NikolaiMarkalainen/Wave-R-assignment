<script setup lang="ts">
import {
  NFlex,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDatePicker,
  NSelect,
  NInputNumber,
} from 'naive-ui'
import type { IUserInterface } from '@/types/IUserObject'
import { Occupations } from '@/types/OccupationRecords'
interface Props {
  data: IUserInterface
}
import { ref, watch } from 'vue'

const props = defineProps<Props>()
console.log(props.data)
const occupationOptions = Object.entries(Occupations).map(([key, label]) => ({
  label,
  value: key,
}))
const modelRef = ref<IUserInterface>({ ...props.data })

watch(
  () => props.data,
  (newData) => {
    if (newData) modelRef.value = { ...newData }
  },
  { immediate: true },
)
</script>

<template>
  <n-flex justify="center" size="large" class="addParent">
    <n-form style="margin: 2rem; width: 100%">
      <n-form-item label="Firstname">
        <n-input round v-model:value="modelRef.firstname"></n-input>
      </n-form-item>
      <n-form-item label="Lastname">
        <n-input round v-model:value="modelRef.lastname"></n-input>
      </n-form-item>
      <n-form-item label="Age">
        <n-input-number round v-model:value="modelRef.age"></n-input-number>
      </n-form-item>
      <n-form-item label="Occupation">
        <n-select
          placeholder="Select role"
          :options="occupationOptions"
          multiple
          v-model:value="modelRef.occupation"
        >
        </n-select>
      </n-form-item>
      <n-form-item label="Salary">
        <n-input-number step="100" round v-model:value="modelRef.salary"></n-input-number>
      </n-form-item>
      <n-form-item label="Employed">
        <n-date-picker type="datetime" round v-model:value="modelRef.employed"></n-date-picker>
      </n-form-item>
      <n-button type="primary" style="margin-top: 2rem" strong block> Update</n-button>
      <n-button type="warning" strong style="margin-top: 0.5rem" block> Close</n-button>
    </n-form>
  </n-flex>
</template>

<style scoped>
.addParent {
  width: 50vw;
  min-height: 50vh;
  background-color: antiquewhite;
}
</style>
