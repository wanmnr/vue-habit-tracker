<template>
    <div class="flex-demo">
        <a-card title="Flex Layout Examples" :bordered="false">
            <!-- Basic Flex Row -->
            <a-space direction="vertical" :size="24" style="width: 100%">
                <section>
                    <h3>Basic Flex Row</h3>
                    <a-flex gap="small">
                        <a-button type="primary">Button 1</a-button>
                        <a-button>Button 2</a-button>
                        <a-button>Button 3</a-button>
                    </a-flex>
                </section>

                <!-- Justify Content -->
                <section>
                    <h3>Justify Content</h3>
                    <a-flex justify="space-between" gap="small">
                        <a-card size="small" title="Card 1" style="width: 200px">
                            Content 1
                        </a-card>
                        <a-card size="small" title="Card 2" style="width: 200px">
                            Content 2
                        </a-card>
                        <a-card size="small" title="Card 3" style="width: 200px">
                            Content 3
                        </a-card>
                    </a-flex>
                </section>

                <!-- Vertical Flex -->
                <section>
                    <h3>Vertical Flex</h3>
                    <a-flex vertical gap="small" style="width: 300px">
                        <a-input v-model:value="inputValue" placeholder="Enter text" />
                        <a-textarea v-model:value="textAreaValue" :rows="4" placeholder="Enter description" />
                        <a-button type="primary" block>Submit</a-button>
                    </a-flex>
                </section>

                <!-- Flex Wrap -->
                <section>
                    <h3>Flex Wrap with Tags</h3>
                    <a-flex gap="small" wrap="wrap">
                        <a-tag v-for="tag in tags" :key="tag" :color="getRandomColor()" closable
                            @close="handleClose(tag)">
                            {{ tag }}
                        </a-tag>
                        <a-button v-if="tags.length < 10" size="small" @click="handleAddTag">
                            + New Tag
                        </a-button>
                    </a-flex>
                </section>
            </a-space>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State management
const inputValue = ref<string>('')
const textAreaValue = ref<string>('')
const tags = ref<string[]>(['Tag 1', 'Tag 2', 'Tag 3'])

// Methods
const getRandomColor = (): string => {
    const colors = [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}

const handleClose = (removedTag: string): void => {
    tags.value = tags.value.filter(tag => tag !== removedTag)
}

const handleAddTag = (): void => {
    const newTag = `Tag ${tags.value.length + 1}`
    tags.value.push(newTag)
}
</script>

<style scoped>
.flex-demo {
    padding: 24px;
}

section {
    background-color: #fafafa;
    padding: 16px;
    border-radius: 8px;
}

h3 {
    margin-bottom: 16px;
    color: #1f1f1f;
    font-size: 16px;
    font-weight: 500;
}
</style>