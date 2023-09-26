<script>
import OrderTable from '@/components/OrderTable/OrderTable.vue'
import { orderService } from '@/services/orderService.js'
import { showToast } from '@/utils'
import { storageService } from '@/services/storageService'
import { STORAGE_KEY } from '@/constants'
import CreateOrderForm from '@/components/CreateOrderForm/CreateOrderForm.vue'


export default {
    name: 'DashboardView',
    components: {
        OrderTable,
        CreateOrderForm,
    },
    data: () => ({
        orders: [],
        isLoading: true,
        isModalActive: false,
        orderToEdit: null
    }),
    methods: {
        toggleModal() {
            this.isModalActive = !this.isModalActive
        },
        async fetchOrders() {
            try {
                const orders = await orderService.getOrders()
                this.orders = orders
                storageService.saveToStorage(STORAGE_KEY, orders)
                showToast('Orders has been fetched!')
            } catch (error) {
                showToast(error.message, 'is-danger')
            } finally {
                this.isLoading = false
            }
        },
        async onDeleteOrder(orderId) {
            const { orders } = this
            showToast('Deleting is in progress')
            try {
                await orderService.deleteOrder(orderId)
                const orderIdx = this.orders.findIndex(order => order.order_ID === orderId)
                if (orderIdx > -1) {
                    orders.splice(orderIdx, 1)
                    storageService.saveToStorage(STORAGE_KEY, this.orders)
                    showToast(`Order ${orderId} been deleted`)
                }
            } catch (err) {
                showToast(err.message, 'is-danger')
            }
        },
        async onCreateOrder(newOrder) {
            try {
                const order = await orderService.createOrder(newOrder)
                this.orders.push(order)
                storageService.saveToStorage(STORAGE_KEY, this.orders)
                showToast('Order has been created')
            } catch (err) {
                showToast(err.message, 'is-danger')
            }
        },
        async onEditOrder(updatedOrder) {
            showToast('Update is in progress..')
            try {
                const updOrder = await orderService.editOrder(updatedOrder)
                const orderIdx = this.orders.findIndex(order => order.order_ID === updOrder.order_ID)
                if (orderIdx > -1) {
                    this.orders.splice(orderIdx, 1, updatedOrder)
                    storageService.saveToStorage(STORAGE_KEY, this.orders)
                }
                showToast('Order has been updated!')
            } catch (err) {
                showToast(err.message, 'is-danger')
            }

        },
        onPressEdit(order) {
            this.orderToEdit = order
            this.toggleModal()
        },
        onCloseModal() {
            if (this.orderToEdit) {
                this.orderToEdit = null
            }
        }
    },
    created() {
        const orderDB = storageService.loadFromStorage(STORAGE_KEY)
        if (!orderDB) return this.fetchOrders()
        this.isLoading = false
        this.orders = orderDB
    }
}
</script>


<template>
    <div class="dashboard">
        <b-loading v-if="isLoading" is-full-page v-model="isLoading" :can-cancel="true"></b-loading>
        <template v-else-if="!orders.length">
            <b-button @click="fetchOrders">
                Fetch orders again!
            </b-button>
        </template>
        <template v-else>
            <header class="dashboard__header">
                <h1>Orders</h1>
                <b-button class="create__btn" icon-left="plus" rounded @click="toggleModal">
                    Create Order
                </b-button>
            </header>
            <OrderTable @deleteOrder="onDeleteOrder" @pressEdit="onPressEdit" :orders="orders" />
            <b-modal @close="onCloseModal" v-model="isModalActive" has-modal-card trap-focus destroy-on-hide
                aria-role="dialog" aria-label="Example Modal" close-button-aria-label="Close" aria-modal>
                <template #default="props">
                    <CreateOrderForm @createOrder="onCreateOrder" @editOrder="onEditOrder" @close="props.close"
                        :orderToEdit="orderToEdit" />
                </template>
            </b-modal>
        </template>

    </div>
</template>

<style lang="scss" scoped>
.dashboard__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    h1 {
        font-size: 2rem;
        font-weight: bold;
    }

    .create__btn {
        background: #2783f5;
        color: white;
    }

}
</style>