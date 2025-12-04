<script setup lang="ts">
import type { DataTableColumns, DataTableInst, DataTableRowKey, PaginationProps } from 'naive-ui'
import { NDataTable, NButton, NIcon, NFlex, NModal } from 'naive-ui'
import { AddCircle, TrashBin } from '@vicons/ionicons5'
import { ref } from 'vue'
import { Occupations } from '@/types/types'
import type { IEmployee, IOccupations } from '@/types/types'
import UserView from '@/components/UserView.vue'

const columns: DataTableColumns<IEmployee> = [
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
    sorter: (row1, row2) => {
      const dateA = new Date(row1.employed).getTime()
      const dateB = new Date(row2.employed).getTime()

      return dateA - dateB
    },
  },
]

// const pagination = ref<PaginationProps>({
//   page: page,
//   pageSize: limit,
//   pageSizes: [10, 25, 50, 100],
//   showSizePicker: true,
//   itemCount: 10,
//   pageCount: 100,

//   // Handlers
//   onUpdatePage: (page: number) => {
//     // 1. Update the component's internal state
//     apiParams.page = page
//     // 2. Trigger the fetch function (defined in step 2)
//     fetchEmployees()
//   },

//   // Handlers for Page Size
//   onUpdatePageSize: (pageSize: number) => {
//     // 1. Update the component's internal state
//     apiParams.limit = pageSize
//     // 2. Reset the page to 1 whenever page size changes
//     apiParams.page = 1
//     pagination.page = 1
//     // 3. Trigger the fetch function
//     fetchEmployees()
//   },
// })

const checkedRowKeysRef = ref<DataTableRowKey[]>([])
const checkedRows = ref<IEmployee[]>([])

const dataTableInst = ref<DataTableInst | null>(null)

const showDetails = ref(false)
const selectedRow = ref<IEmployee | null>(null)

const showAddModal = ref(false)

const rowKey = (row: IEmployee) => {
  return row.id
}
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys
  checkedRows.value = data.filter((row) => rowKeys.includes(rowKey(row)))
}

const handleRowClick = (row: IEmployee) => {
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
  <n-flex size="large" style="margin: 2.5rem 5rem">
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
    <n-data-table
      ref="dataTableInst"
      :columns="columns"
      :row-props="
        (row: IEmployee) => ({
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
    <n-modal v-model:show="showDetails">
      <UserView v-if="selectedRow" :data="selectedRow" @close="showDetails = false" />
    </n-modal>
    <n-modal v-model:show="showAddModal">
      <UserView @close="showAddModal = false" />
    </n-modal>
  </n-flex>
</template>
