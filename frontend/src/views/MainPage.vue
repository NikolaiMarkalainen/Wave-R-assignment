<script setup lang="ts">
import type { DataTableColumns, DataTableInst, DataTableRowKey } from 'naive-ui'
import { NDataTable, NSpace, NButton, NIcon, NFlex, NModal } from 'naive-ui'
import { AddCircle, TrashBin } from '@vicons/ionicons5'
import { ref } from 'vue'
import UserAdd from '@/components/UserAdd.vue'
import { Occupations } from '@/types/types'
import type { IUserInterface, IOccupations } from '@/types/types'
import UserView from '@/components/UserView.vue'
const columns: DataTableColumns<IUserInterface> = [
  { type: 'selection' },
  {
    title: 'Firstname',
    key: 'firstname',
    sorter: (row1, row2) => row1.firstname.localeCompare(row2.firstname),
  },
  {
    title: 'Lastname',
    key: 'lastname',
    sorter: (row1, row2) => row1.lastname.localeCompare(row2.lastname),
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age,
  },
  {
    title: 'Occupation',
    key: 'occupation',
    filterOptions: Object.values(Occupations).map((label) => ({
      label,
      value: label,
    })),
    filter(value, row) {
      return Boolean(~row.occupation.indexOf(value as IOccupations))
    },
  },
  {
    title: 'Salary',
    key: 'salary',
    sorter: (row1, row2) => row1.salary - row2.salary,
  },
  {
    title: 'Employed',
    key: 'employed',
    sorter: (row1, row2) => row1.employed - row2.employed,
  },
]

const data: IUserInterface[] = [
  {
    id: 1,
    firstname: 'James',
    lastname: 'Thompson',
    age: 34,
    occupation: Occupations.developer,
    salary: 82000,
    employed: 2023,
  },
  {
    id: 2,
    firstname: 'Sarah',
    lastname: 'Mitchell',
    age: 29,
    occupation: Occupations.sales,
    salary: 61000,
    employed: 2024,
  },
  {
    id: 3,
    firstname: 'Robert',
    lastname: 'Carter',
    age: 41,
    occupation: Occupations.management,
    salary: 102000,
    employed: 2023,
  },
  {
    id: 4,
    firstname: 'Emily',
    lastname: 'Hughes',
    age: 26,
    occupation: Occupations.hr,
    salary: 54000,
    employed: 2021,
  },
  {
    id: 5,
    firstname: 'Daniel',
    lastname: 'Rodriguez',
    age: 31,
    occupation: Occupations.customer_success,
    salary: 58000,
    employed: 2019,
  },
  {
    id: 6,
    firstname: 'Natalie',
    lastname: 'Brooks',
    age: 23,
    occupation: Occupations.tester,
    salary: 48000,
    employed: 2019,
  },
]
const pagination = ref({ pageSize: 5 })

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const checkedRows = ref<IUserInterface[]>([])

const dataTableInst = ref<DataTableInst | null>(null)

const showDetails = ref(false)
const selectedRow = ref<IUserInterface | null>(null)

const showAddModal = ref(false)

const rowKey = (row: IUserInterface) => {
  return row.id
}
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys
  checkedRows.value = data.filter((row) => rowKeys.includes(rowKey(row)))
}

const handleRowClick = (row: IUserInterface) => {
  showDetails.value = true
  selectedRow.value = row
}

const handleDelete = () => {
  //send request to delete by id
  console.log(checkedRows.value)
}

const handleAdd = () => {
  showAddModal.value = true
  console.log('Add')
}
</script>

<template>
  <n-flex justify="center" class="table" size="large">
    <n-space vertical :size="12">
      <n-space>
        <n-button type="success" v-on:click="handleAdd">
          <template #icon>
            <n-icon :component="AddCircle"> </n-icon>
          </template>
          Add
        </n-button>
        <n-button type="error" v-on:click="handleDelete">
          <template #icon>
            <n-icon :component="TrashBin"></n-icon>
          </template>
          Delete
        </n-button>
      </n-space>
      <n-data-table
        ref="dataTableInst"
        :columns="columns"
        :row-props="
          (row: IUserInterface) => ({
            onClick: (e: MouseEvent) => {
              const target = e.target as HTMLElement

              if (target.closest('.n-checkbox-box')) {
                return
              }

              handleRowClick(row)
            },
          })
        "
        :data="data"
        :pagination="pagination"
        :row-key="rowKey"
        @update-checked-row-keys="handleCheck"
      />
    </n-space>
    <n-modal v-model:show="showDetails">
      <UserView v-if="selectedRow" :data="selectedRow" @close="showDetails = false" />
    </n-modal>
    <n-modal v-model:show="showAddModal">
      <UserAdd @close="showAddModal = false" />
    </n-modal>
  </n-flex>
</template>

<style scoped>
.table {
  margin: 2.5rem 1rem 0;
  width: 100vw;
}
:deep(.n-data-table-td) {
  background: rgba(87, 199, 133, 1);
}
</style>
