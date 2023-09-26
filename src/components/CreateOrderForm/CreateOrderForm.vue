<template>
    <div class="modal-card">
        <h1 class="modal-title">{{ formMode }} Order</h1>
        <b-field label="Name">
            <b-input v-model.trim="order.name"></b-input>
        </b-field>
        <b-field label="Country">
            <b-select v-model="order.country">
                <option value="US">US</option>
                <option value="DE">DE</option>
                <option value="CA">CA</option>
                <option value="AU">AU</option>
            </b-select>
        </b-field>
        <b-field label="Status">
            <b-radio v-model="order.fulfillment_status" name="status" native-value="fulfilled">
                Fulfilled
            </b-radio>
            <b-radio v-model="order.fulfillment_status" name="status" native-value="unfulfilled">
                Unfulfilled
            </b-radio>
        </b-field>

        <b-field label="Discount">
            <b-numberinput v-model.number="order.total_discounts" placholder="Order discount" />
        </b-field>
        <b-field label="Total price">
            <b-numberinput v-model.number="order.total_price" />
        </b-field>
        <b-field label="Profit">
            <b-numberinput v-model.number="order.gross_profit" />
        </b-field>
        <div>
            <b-button :disabled="!isAllFieldsFilled" type="is-primary" expanded @click="handleSubmit">Submit</b-button>
        </div>
    </div>
</template>

<script>


export default {
    props: {
        orderToEdit: Object
    },
    data: () => ({
        order: {
            name: '',
            country: 'US',
            fulfillment_status: '',
            total_discounts: '',
            total_price: '',
            gross_profit: '',
        },
        editing: false,
    }),
    methods: {
        handleSubmit() {
            this.editing ? this.editOrder() : this.createOrder()
            this.$emit('close')

        },
        createOrder() {
            this.$emit('createOrder', this.order)
        },
        editOrder() {
            const { order_ID, created_at, line_items } = this.orderToEdit
            const updatedOrder = {
                ...this.order,
                order_ID,
                created_at,
                line_items
            }
            this.$emit('editOrder', updatedOrder)
        },

    },
    computed: {
        isAllFieldsFilled() {
            return Object.values(this.order).every(val => val !== undefined && val !== null);

        },
        formMode() {
            return this.editing ? 'Edit' : 'Create'
        }
    },
    created() {
        if (this.orderToEdit) {
            this.editing = true
            const { name, country, fulfillment_status,
                total_discounts,
                gross_profit,
                total_price,
            } = this.orderToEdit
            this.order = {
                name,
                country,
                fulfillment_status,
                total_discounts,
                total_price,
                gross_profit,
            }

        }
    },
}
</script>

<style lang="scss" scoped>
.modal-title {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.modal-card {
    background: #fff;
    height: auto;
    padding: 1.25rem;
}
</style>