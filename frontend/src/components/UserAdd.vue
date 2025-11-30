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
import { Occupations } from '@/types/types'
import type { IUserInterface } from '@/types/types'
import { ref } from 'vue'
import { employeeFormRules } from '@/helpers/forms'
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'

const emit = defineEmits(['close'])

const formRef = ref<FormInst | null>(null)
const occupationOptions = Object.entries(Occupations).map(([key, label]) => ({
  label,
  value: key,
}))

const modelRef = ref<IUserInterface>({
  id: Date.now(),
  firstname: '',
  lastname: '',
  age: 0,
  occupation: Occupations.developer,
  salary: 0,
  employed: Date.now(),
})

console.log(employeeFormRules)
const message = useMessage()

const employeeFormValidation = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success(`Successfully added Employee ${modelRef.value.firstname}`)
    } else {
      console.log(errors)
      message.error(`Failed to submit employee data`)
    }
  })
}
</script>

<template>
  <n-flex justify="center" size="large" class="addParent">
    <h1>Create a new user</h1>
    <n-form
      style="margin: 2rem; width: 100%"
      :rules="employeeFormRules"
      ref="formRef"
      :model="modelRef"
    >
      <n-form-item label="Firstname" path="firstname">
        <n-input round v-model:value="modelRef.firstname"></n-input>
      </n-form-item>
      <n-form-item label="Lastname" path="lastname">
        <n-input round v-model:value="modelRef.lastname"></n-input>
      </n-form-item>
      <n-form-item label="Age" path="age">
        <n-input-number round v-model:value="modelRef.age"></n-input-number>
      </n-form-item>
      <n-form-item label="Occupation" path="occupation">
        <n-select
          placeholder="Select role"
          :options="occupationOptions"
          v-model:value="modelRef.occupation"
        >
        </n-select>
      </n-form-item>
      <n-form-item label="Salary" path="salary">
        <n-input-number step="100" round v-model:value="modelRef.salary"></n-input-number>
      </n-form-item>
      <n-form-item label="Employed" path="employed">
        <n-date-picker type="datetime" round v-model:value="modelRef.employed"></n-date-picker>
      </n-form-item>
      <n-button type="primary" style="margin-top: 2rem" strong block @click="employeeFormValidation"
        >Create</n-button
      >
      <n-button type="warning" strong style="margin-top: 0.5rem" block @click="emit('close')"
        >Close</n-button
      >
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
