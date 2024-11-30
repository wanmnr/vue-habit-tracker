<!-- views/NotFound.vue -->
<template>
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist."
        :style="{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
        <template #extra>
            <a-space>
                <a-button type="primary" @click="goBack">
                    <template #icon>
                        <left-outlined />
                    </template>
                    Go Back
                </a-button>
                <a-button @click="goHome">
                    <template #icon>
                        <home-outlined />
                    </template>
                    Home
                </a-button>
            </a-space>
        </template>
    </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { LeftOutlined, HomeOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'NotFound',
    components: {
        LeftOutlined,
        HomeOutlined
    },
    setup() {
        const router = useRouter();

        const goBack = (): void => {
            router.back();
        };

        const goHome = (): void => {
            router.push('/');
        };

        return {
            goBack,
            goHome
        };
    }
});
</script>

<style scoped>
/* 
    No additional CSS needed as we're leveraging Ant Design's built-in styling
    This follows the KISS principle while maintaining visual hierarchy and consistency
  */
</style>