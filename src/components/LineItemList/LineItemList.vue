<template>
    <div>
        <div v-for="lineItem in lineItems" :key="lineItem.productID">
            <div class="line__list__item has-text-weight-bold">
                <p>
                    Procuct Name:
                    <b-tag type="is-info is-light">
                        {{ lineItem.name }}
                    </b-tag>
                </p>
                <p>
                    Product ID:
                    <b-tag type="is-warning is-light">
                        {{ lineItem.product_ID }}
                    </b-tag>
                </p>
                <p>
                    Price:
                    <b-tag type="is-success is-light">
                        {{ formatPrice(lineItem.price) }}
                    </b-tag>
                </p>
                <p>
                    Quantity:
                    <b-tag type="is-link is-light">
                        {{ lineItem.quantity }}
                    </b-tag>
                </p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'LineItemList',
    props: {
        lineItems: Array
    },
    methods: {
        formatPrice(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value)
        },
    },

}
</script>

<style lang="scss">
.line__list {
    display: flex;
}

.line__list__item {
    background: #ffff;
    border-radius: 5px;
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
}
</style>

