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
  useMessage,
} from 'naive-ui';
import { ref, watch } from 'vue';
import type { FormInst } from 'naive-ui';
import type { IEmployee, IEmployeePut } from '@/types/types';
import { Occupations } from '@/types/types';
import { employeeFormRules } from '@/helpers/forms';
import { postEmployeeService, putEmployeeService } from '@/services/userServices';

interface Props {
  data?: IEmployee;
}
const props = defineProps<Props>();
const emit = defineEmits(['close', 'updated']);

const modelRef = ref<IEmployeePut>(
  props.data
    ? { ...props.data }
    : {
        id: undefined,
        firstname: '',
        lastname: '',
        age: 0,
        occupation: Occupations.developer.toLowerCase(),
        salary: 0,
        employed: new Date(Date.now()),
      },
);

const dateNumRef = ref<number | null>(Number(modelRef.value.employed));

watch(dateNumRef, (newVal) => {
  if (newVal) {
    modelRef.value.employed = new Date(newVal);
  }
});

watch(
  () => props.data,
  (newData) => {
    if (newData) modelRef.value = { ...newData };
  },
  { immediate: true },
);

const occupationOptions = Object.entries(Occupations).map(([key, label]) => ({
  label,
  value: key.toLowerCase(),
}));

const formRef = ref<FormInst | null>(null);
const message = useMessage();

const employeeFormValidation = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      handleFormSubmit();
    } else {
      console.log(errors);
      message.error(`Failed to submit employee data`);
    }
  });
};
const handleFormSubmit = async () => {
  const action = props.data ? 'updated' : 'added';

  message.success(`Successfully ${action} Employee: ${modelRef.value.firstname}`);
  try {
    if (props.data) {
      await putEmployeeService(modelRef.value);
    } else {
      await postEmployeeService(modelRef.value);
    }
    emit('updated');
    emit('close');
  } catch (e) {
    message.error(`Failed to ${action} employee`);
    console.error(e);
  }
};
</script>

<template>
  <n-flex
    justify="center"
    size="large"
    style="width: 50vw; min-height: 50vh; background-color: antiquewhite"
  >
    <h1>{{ props.data ? 'Update user details' : 'Create a new user' }}</h1>
    <n-form
      style="margin: 2rem; width: 100%"
      :rules="employeeFormRules"
      ref="formRef"
      :model="modelRef"
      @submit.prevent="handleFormSubmit"
    >
      <n-form-item label="Firstname" path="firstname">
        <n-input round v-model:value="modelRef.firstname" />
      </n-form-item>
      <n-form-item label="Lastname" path="lastname">
        <n-input round v-model:value="modelRef.lastname" />
      </n-form-item>
      <n-form-item label="Age" path="age">
        <n-input-number round v-model:value="modelRef.age" />
      </n-form-item>
      <n-form-item label="Occupation" path="occupation">
        <n-select
          placeholder="Select role"
          :options="occupationOptions"
          v-model:value="modelRef.occupation"
        />
      </n-form-item>
      <n-form-item label="Salary" path="salary">
        <n-input-number step="100" round v-model:value="modelRef.salary" />
      </n-form-item>
      <n-form-item label="Employed" path="employed">
        <n-date-picker type="datetime" round v-model:value="dateNumRef" />
      </n-form-item>
      <n-button
        type="primary"
        style="margin-top: 2rem"
        strong
        block
        @click.prevent="employeeFormValidation"
      >
        {{ props.data ? 'Update' : 'Create' }}
      </n-button>
      <n-button type="warning" strong style="margin-top: 0.5rem" block @click="emit('close')">
        Close
      </n-button>
    </n-form>
  </n-flex>
</template>
