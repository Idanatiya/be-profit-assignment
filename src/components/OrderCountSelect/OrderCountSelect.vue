<template>
    <b-field class="order__select" label="Orders Per Page">
        <b-select v-model="orderCount" @input="onChangeOrderCount">
            <option v-for="(option, idx) in options" :value="option" :key="idx">
                {{ option }} Per Page
            </option>
        </b-select>
    </b-field>
</template>

<script>

export default {
    name: 'OrderCountSelect',
    data: () => ({
        orderCount: 20,
        options: [5, 10, 15, 20]
    }),
    methods: {
        onChangeOrderCount() {
            this.$emit('orderCountChange', this.orderCount)
        }
    }

}

</script>

<style lang="scss" scoped>
.order__select {
    margin-top: 0.5rem;

}
</style>