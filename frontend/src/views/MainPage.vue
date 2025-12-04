<script setup lang="ts">
import type { DataTableColumns, DataTableInst, DataTableRowKey, PaginationProps } from 'naive-ui';
import { NDataTable, NButton, NIcon, NFlex, NModal } from 'naive-ui';
import { AddCircle, TrashBin } from '@vicons/ionicons5';
import { onMounted, reactive, ref } from 'vue';
import { Occupations } from '@/types/types';
import type { IEmployee, IEmployeePayload, IOccupations, queryParams } from '@/types/types';
import UserView from '@/components/UserView.vue';
import { getEmployeeService } from '@/services/userServices';
import { useRoute, useRouter } from 'vue-router';
import type { FilterState } from 'naive-ui/es/data-table/src/interface';

onMounted(() => {
  fetchEmployees();
});

// REFS
const dataTableInst = ref<DataTableInst | null>(null);
const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
const checkedRows = ref<IEmployee[]>([]);
const showDetails = ref(false);
const selectedRow = ref<IEmployee | null>(null);
const showAddModal = ref(false);
const data = ref<IEmployee[]>([]);
const totalItems = ref(0);

const route = useRoute();
const router = useRouter();
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
      return Boolean(~row.occupation.indexOf(value as IOccupations));
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
      const dateA = new Date(row1.employed).getTime();
      const dateB = new Date(row2.employed).getTime();

      return dateA - dateB;
    },
  },
];
const parseOccupations = (value: unknown): IOccupations[] | undefined => {
  if (!value) return undefined;
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .map((v) => Object.keys(Occupations).find((k) => k === v.toString()))
    .filter((k): k is IOccupations => !!k);
};
const validSortKeys: (keyof IEmployeePayload)[] = [
  'firstname',
  'lastname',
  'age',
  'occupation',
  'salary',
  'employed',
];

const parseSortBy = (value: unknown): keyof IEmployeePayload | undefined => {
  if (!value) return undefined;
  return validSortKeys.find((key) => key === value.toString());
};

const apiParams = reactive<queryParams>({
  page: Number(route.query.page) || 1,
  pageSize: Number(route.query.pageSize) || 10,
  occupation: parseOccupations(route.query.occupation),
  sortBy: parseSortBy(route.query.sortBy),
  sortDir: route.query.sortDir === 'desc' ? 'desc' : 'asc',
});

const updateUrlParams = () => {
  router.replace({
    query: {
      page: apiParams.page?.toString(),
      pageSize: apiParams.pageSize?.toString(),
      occupation: apiParams.occupation
        ? Array.isArray(apiParams.occupation)
          ? apiParams.occupation.map((o) => o.toString())
          : apiParams.occupation.toString()
        : undefined,
      sortBy: apiParams.sortBy,
      sortDir: apiParams.sortDir,
    },
  });
};

const pagination = reactive<PaginationProps>({
  page: apiParams.page,
  pageSize: apiParams.pageSize,
  pageSizes: [10, 25, 50, 100],
  showSizePicker: true,
  itemCount: 0,
  onUpdatePage: (page: number) => {
    apiParams.page = page;
    updateUrlParams();
    fetchEmployees();
  },
  onUpdatePageSize: (pageSize: number) => {
    apiParams.pageSize = pageSize;
    apiParams.page = 1;
    updateUrlParams();
    fetchEmployees();
  },
});

const rowKey = (row: IEmployee) => {
  return row.id;
};
const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeysRef.value = rowKeys;

  if (!rowKeys.length) {
    checkedRows.value = [];
    return;
  }

  const selectedRows: IEmployee[] = [];
  const rowKeyMap = new Map(data.value.map((row) => [rowKey(row), row]));

  for (const key of rowKeys) {
    const row = rowKeyMap.get(Number(key));
    if (row) selectedRows.push(row);
  }

  checkedRows.value = selectedRows;
};

const handleRowClick = (row: IEmployee) => {
  showDetails.value = true;
  selectedRow.value = row;
  selectedRow.value.employed = new Date(selectedRow.value.employed);
  selectedRow.value.occupation = selectedRow.value.occupation.toLowerCase();
};

const handleDelete = () => {
  //send request to delete by id
  console.log(checkedRows.value);
};

const fetchEmployees = async () => {
  const result = await getEmployeeService(apiParams);
  data.value = result.employees;
  totalItems.value = result.total;

  pagination.itemCount = Number(result.total);
  pagination.page = Number(apiParams.page);
  pagination.pageSize = Number(apiParams.pageSize);
  console.log(pagination.page * pagination.pageSize < pagination.itemCount);
};
const handleAdd = () => {
  showAddModal.value = true;
  console.log('Add');
};
const handleTableChange = (filters: FilterState) => {
  const occupationFilter = filters.occupation
    ? Array.isArray(filters.occupation)
      ? filters.occupation
      : [filters.occupation]
    : [];

  if (occupationFilter.length) {
    apiParams.occupation = occupationFilter
      .map((val) => Object.entries(Occupations).find(([display]) => display === val)?.[0])
      .filter(Boolean) as IOccupations[];
  } else {
    console.log('?');
    apiParams.occupation = undefined;
  }

  updateUrlParams();
  fetchEmployees();
};
const handleSortChange = (sorter: {
  columnKey: keyof IEmployeePayload;
  order: 'ascend' | 'descend' | null;
}) => {
  if (sorter.order) {
    apiParams.sortBy = sorter.columnKey;
    apiParams.sortDir = sorter.order === 'ascend' ? 'asc' : 'desc';
  } else {
  }
  updateUrlParams();
  fetchEmployees();
};
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
            const target = e.target as HTMLElement;

            if (target.closest('.n-checkbox-box')) {
              return;
            }
            handleRowClick(row);
          },
        })
      "
      :data="data"
      :pagination="pagination"
      :row-key="rowKey"
      :remote="true"
      @update-checked-row-keys="handleCheck"
      @update:filters="handleTableChange"
      @update:sorter="handleSortChange"
    />
    <n-modal v-model:show="showDetails">
      <UserView
        v-if="selectedRow"
        :data="selectedRow"
        @close="showDetails = false"
        @updated="fetchEmployees"
      />
    </n-modal>
    <n-modal v-model:show="showAddModal">
      <UserView @close="showAddModal = false" @updated="fetchEmployees" />
    </n-modal>
  </n-flex>
</template>
