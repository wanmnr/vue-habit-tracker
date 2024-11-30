<template>
    <div class="sample-container">
        <div class="container">
            <a-layout>
                <a-layout-sider v-model:collapsed="collapsed" collapsible>
                    <div class="logo" />
                    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                        <a-menu-item key="1">
                            <user-outlined />
                            <span>Users</span>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <shopping-outlined />
                            <span>Products</span>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <bar-chart-outlined />
                            <span>Analytics</span>
                        </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout>
                    <a-layout-header class="header">
                        <a-row justify="space-between" align="middle">
                            <a-col>
                                <a-typography-title :level="4" style="color: white; margin: 0">
                                    Dashboard
                                </a-typography-title>
                            </a-col>
                            <a-col>
                                <a-space>
                                    <a-badge :count="notifications.length">
                                        <a-button type="link" @click="showNotificationDrawer">
                                            <bell-outlined />
                                        </a-button>
                                    </a-badge>
                                    <a-dropdown>
                                        <a-button type="link">
                                            <user-outlined />
                                            Admin
                                        </a-button>
                                        <template #overlay>
                                            <a-menu>
                                                <a-menu-item key="profile">Profile</a-menu-item>
                                                <a-menu-item key="settings">Settings</a-menu-item>
                                                <a-menu-item key="logout">Logout</a-menu-item>
                                            </a-menu>
                                        </template>
                                    </a-dropdown>
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-layout-header>

                    <a-layout-content style="margin: 16px">
                        <a-card>
                            <template #title>User Management</template>
                            <template #extra>
                                <a-button type="primary" @click="showUserModal">
                                    Add User
                                </a-button>
                            </template>

                            <!-- Search and Filter Section -->
                            <a-form layout="inline" :model="searchForm">
                                <a-form-item label="Search">
                                    <a-input v-model:value="searchForm.keyword" placeholder="Search users"
                                        allow-clear />
                                </a-form-item>
                                <a-form-item label="Status">
                                    <a-select v-model:value="searchForm.status" style="width: 120px" allow-clear>
                                        <a-select-option value="active">Active</a-select-option>
                                        <a-select-option value="inactive">Inactive</a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item>
                                    <a-button type="primary" @click="handleSearch">
                                        Search
                                    </a-button>
                                </a-form-item>
                            </a-form>

                            <!-- Data Table -->
                            <a-table :columns="columns" :data-source="users" :loading="loading" :pagination="pagination"
                                @change="handleTableChange">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'status'">
                                        <a-tag :color="record.status === 'active' ? 'green' : 'red'">
                                            {{ record.status }}
                                        </a-tag>
                                    </template>
                                    <template v-if="column.key === 'action'">
                                        <a-space>
                                            <a-button type="link" @click="editUser(record)">
                                                Edit
                                            </a-button>
                                            <a-popconfirm title="Are you sure you want to delete this user?"
                                                @confirm="deleteUser(record)">
                                                <a-button type="link" danger>Delete</a-button>
                                            </a-popconfirm>
                                        </a-space>
                                    </template>
                                </template>
                            </a-table>
                        </a-card>
                    </a-layout-content>
                </a-layout>
            </a-layout>

            <!-- User Modal -->
            <a-modal v-model:visible="userModalVisible" :title="editingUser ? 'Edit User' : 'Add User'"
                @ok="handleUserModalOk">
                <a-form :model="userForm" :rules="rules" ref="userFormRef" layout="vertical">
                    <a-form-item label="Name" name="name">
                        <a-input v-model:value="userForm.name" />
                    </a-form-item>
                    <a-form-item label="Email" name="email">
                        <a-input v-model:value="userForm.email" />
                    </a-form-item>
                    <a-form-item label="Status" name="status">
                        <a-switch v-model:checked="userForm.status" :checked-value="'active'"
                            :un-checked-value="'inactive'" />
                    </a-form-item>
                    <a-form-item label="Role" name="role">
                        <a-radio-group v-model:value="userForm.role">
                            <a-radio value="admin">Admin</a-radio>
                            <a-radio value="user">User</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-form>
            </a-modal>

            <!-- Notification Drawer -->
            <a-drawer title="Notifications" :visible="notificationDrawerVisible" @close="hideNotificationDrawer"
                width="400">
                <a-list :data-source="notifications">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-list-item-meta :title="item.title" :description="item.description">
                                <template #avatar>
                                    <a-avatar :style="{
                                        backgroundColor: item.type === 'success' ? '#52c41a' : '#1890ff'
                                    }">
                                        <template v-if="item.type === 'success'">
                                            <check-outlined />
                                        </template>
                                        <template v-else>
                                            <info-outlined />
                                        </template>
                                    </a-avatar>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </template>
                </a-list>
            </a-drawer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { FormInstance, TablePaginationConfig } from 'ant-design-vue';
import {
    UserOutlined,
    ShoppingOutlined,
    BarChartOutlined,
    BellOutlined,
    CheckOutlined,
    InfoOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

interface User {
    key: string;
    name: string;
    email: string;
    status: string;
    role: string;
}

interface SearchForm {
    keyword: string;
    status: string;
}

interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'success' | 'info';
}

export default defineComponent({
    name: 'DashboardView',
    components: {
        UserOutlined,
        ShoppingOutlined,
        BarChartOutlined,
        BellOutlined,
        CheckOutlined,
        InfoOutlined,
    },
    setup() {
        const collapsed = ref<boolean>(false);
        const selectedKeys = ref<string[]>(['1']);
        const loading = ref<boolean>(false);
        const userModalVisible = ref<boolean>(false);
        const notificationDrawerVisible = ref<boolean>(false);
        const editingUser = ref<User | null>(null);
        const userFormRef = ref<FormInstance>();

        const searchForm = reactive<SearchForm>({
            keyword: '',
            status: '',
        });

        const userForm = reactive({
            name: '',
            email: '',
            status: 'active',
            role: 'user',
        });

        const rules = {
            name: [{ required: true, message: 'Please input name' }],
            email: [
                { required: true, message: 'Please input email' },
                { type: 'email', message: 'Please input valid email' },
            ],
            role: [{ required: true, message: 'Please select role' }],
        };

        const notifications = ref<Notification[]>([
            {
                id: '1',
                title: 'New User Registration',
                description: 'A new user has registered to the platform',
                type: 'info',
            },
            {
                id: '2',
                title: 'System Update',
                description: 'System has been updated successfully',
                type: 'success',
            },
        ]);

        const users = ref<User[]>([
            {
                key: '1',
                name: 'John Doe',
                email: 'john@example.com',
                status: 'active',
                role: 'admin',
            },
            {
                key: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                status: 'inactive',
                role: 'user',
            },
        ]);

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: 'Action',
                key: 'action',
            },
        ];

        const pagination = reactive<TablePaginationConfig>({
            total: 100,
            current: 1,
            pageSize: 10,
        });

        // Methods
        const handleSearch = () => {
            loading.value = true;
            // Implement search logic here
            setTimeout(() => {
                loading.value = false;
            }, 1000);
        };

        const handleTableChange = (pag: TablePaginationConfig) => {
            pagination.current = pag.current || 1;
            handleSearch();
        };

        const showUserModal = () => {
            editingUser.value = null;
            userForm.name = '';
            userForm.email = '';
            userForm.status = 'active';
            userForm.role = 'user';
            userModalVisible.value = true;
        };

        const handleUserModalOk = async () => {
            try {
                await userFormRef.value?.validate();
                // Implement save logic here
                message.success(
                    editingUser.value ? 'User updated successfully' : 'User added successfully'
                );
                userModalVisible.value = false;
            } catch (error) {
                console.error('Validation failed:', error);
            }
        };

        const editUser = (user: User) => {
            editingUser.value = user;
            userForm.name = user.name;
            userForm.email = user.email;
            userForm.status = user.status;
            userForm.role = user.role;
            userModalVisible.value = true;
        };

        const deleteUser = (user: User) => {
            // Implement delete logic here
            message.success('User deleted successfully');
        };

        const showNotificationDrawer = () => {
            notificationDrawerVisible.value = true;
        };

        const hideNotificationDrawer = () => {
            notificationDrawerVisible.value = false;
        };

        return {
            collapsed,
            selectedKeys,
            loading,
            userModalVisible,
            notificationDrawerVisible,
            editingUser,
            userFormRef,
            searchForm,
            userForm,
            rules,
            notifications,
            users,
            columns,
            pagination,
            handleSearch,
            handleTableChange,
            showUserModal,
            handleUserModalOk,
            editUser,
            deleteUser,
            showNotificationDrawer,
            hideNotificationDrawer,
        };
    },
});
</script>

<style scoped>
.container {
    min-height: 100vh;
}

.logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.header {
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

:deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
}

:deep(.ant-layout-header) {
    background: #001529;
}
</style>