
<template>
    <div class="table">
        <div class="table__header">
            <OrderCountSelect @orderCountChange="setOrderCount" />
            <b-field label="Search">
                <b-input @input="debouncedInputChange" icon="magnify" placeholder="Search order..."></b-input>
            </b-field>
        </div>
        <b-table :data="ordersToShow" striped ref="table" paginated :per-page="perPage" detailed show-detail-icon
            defaultSortDirection="asc" aria-next-label="Next page" aria-previous-label="Previous page"
            aria-page-label="Page" default-sort="order_ID" aria-current-label="Current page">

            <b-table-column field="order_ID" label="#Order ID" width="40" centered sortable numeric v-slot="props">
                {{ props.row.order_ID }}
            </b-table-column>

            <b-table-column field="name" label="Name" sortable numeric v-slot="{ row: { name } }">
                <b-tooltip :active="name.length > 10" :label="name">
                    {{ name.length > 10 ? `${name.slice(0, 10)}...` : name }}
                </b-tooltip>
            </b-table-column>

            <b-table-column field="created_at" label="Date" sortable centered v-slot="{ row: { created_at } }">
                <b-tag type="is-success">
                    {{ new Date(created_at).toLocaleDateString() }}
                </b-tag>
            </b-table-column>

            <b-table-column field="gross_profit" centered label="Profit" sortable v-slot="{ row: { gross_profit } }">
                <b-tooltip label="This number is 🔥" position="is-right" :active="gross_profit > 85">
                    <span :class="{ 'has-text-success has-text-weight-bold': gross_profit > 85 }">
                        {{ formatPrice(gross_profit) }}
                    </span>
                </b-tooltip>
            </b-table-column>

            <b-table-column field="total_price" centered label="Total Price" sortable v-slot="{ row: { total_price } }">
                {{ formatPrice(total_price) }}
            </b-table-column>

            <b-table-column field="total_discounts" centered label="Discount" sortable numeric
                v-slot="{ row: { total_discounts } }">
                <b-tooltip label="This number is 💩" position="is-right" :active="total_discounts < 1">
                    <span :class="{ 'has-text-danger has-text-weight-bold': total_discounts < 1 }">
                        {{ formatPrice(total_discounts) }}
                    </span>
                </b-tooltip>
            </b-table-column>

            <b-table-column label="Country" centered v-slot="props">
                {{ props.row.country }}
            </b-table-column>

            <b-table-column field="fulfillment_status" centered label="Status" v-slot="{ row: { fulfillment_status } }">
                <b-tag class="status"
                    :type="fulfillment_status === 'fulfilled' ? 'is-success is-light' : 'is-danger is-light'">
                    {{ fulfillment_status }}
                </b-tag>
            </b-table-column>

            <b-table-column custom-key="actions" v-slot="props" label="Actions">
                <div class="actions">
                    <b-button type="is-danger" icon-right="delete" @click="deleteOrder(props.row.order_ID)">
                    </b-button>
                    <b-button type="is-info" icon-right="pen" @click="pressEdit(props.row)">
                    </b-button>
                </div>
            </b-table-column>
            <template #detail="{ row: { line_items } }">
                <h1 v-if="!line_items.length">
                    No Line Items available
                </h1>
                <LineItemList :lineItems="line_items" />
            </template>
        </b-table>
    </div>
</template>

<script>
import LineItemList from '@/components/LineItemList/LineItemList.vue';
import OrderCountSelect from '@/components/OrderCountSelect/OrderCountSelect.vue';
import debounce from 'lodash.debounce';


export default {
    props: {
        orders: {
            type: Array
        }
    },
    data: () => {
        return {
            currentPage: 1,
            perPage: 20,
            defaultOpenedDetails: [1],
            searchTerm: '',
        }
    },
    components: {
        LineItemList,
        OrderCountSelect,
    },
    computed: {
        ordersToShow() {
            const { searchTerm } = this
            if (!searchTerm) return this.orders
            return this.orders.filter(order => {
                const { name, country, fulfillment_status,
                    total_discounts,
                    gross_profit,
                    total_price,
                    order_ID
                } = order
                return [order_ID, name, country, fulfillment_status, total_discounts, gross_profit, total_price]
                    .some(item => item.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            })
        }
    },
    methods: {
        debouncedInputChange: debounce(function (value) {
            this.searchTerm = value
        }, 500),
        formatPrice(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value)
        },
        setOrderCount(num) {
            this.perPage = num
        },
        deleteOrder(orderId) {
            this.$emit('deleteOrder', orderId)
        },
        pressEdit(order) {
            this.$emit('pressEdit', order)
        }
    },

}
</script>

<style lang="scss" scoped>
table.table {
    table-layout: fixed;
}

.table__header {
    margin-bottom: 1rem;
}

.actions {
    display: flex;
    gap: 1.25rem;
}

.status {
    text-transform: capitalize;
}
</style>
