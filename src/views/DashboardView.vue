<script>
import mockOrders from '../orders.json'

export default {
    name: 'DashboardView',
    data: () => {
        return {
            data: mockOrders,
            isPaginated: true,
            isPaginationSimple: false,
            isPaginationRounded: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            perPage: 20,
        }
    },
    created() {

    },
    methods: {
        getTableData() {
            const data = mockOrders.map(order => {
                const { order_ID, name, created_at, fulfillment_status, country, gross_profit } = order
                return {
                    order_ID,
                    name,
                    created_at,
                    fulfillment_status,
                    country
                }
            })
            console.log({ data })
            this.data = data
        }
    }
}
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <b-table :data="data" :paginated="isPaginated" :per-page="perPage" :default-sort-direction="defaultSortDirection"
            :pagination-position="paginationPosition" :pagination-rounded="isPaginationRounded" :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize" default-sort="data.order_ID" aria-next-label="Next page"
            aria-previous-label="Previous page" aria-page-label="Page">
            <b-table-column field="order_ID" label="#Order ID" width="40" sortable numeric v-slot="props">
                {{ props.row.order_ID }}
            </b-table-column>

            <b-table-column label="Name" sortable v-slot="props">
                {{ props.row.name }}
            </b-table-column>

            <b-table-column field="fulfillment_status" label="Fullfillment Status" sortable v-slot="props">
                {{ props.row.fulfillment_status }}
            </b-table-column>

            <b-table-column field="created_at" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.created_at).toLocaleDateString() }}
                </span>
            </b-table-column>

            <b-table-column field="gross_profit" label="Profit" sortable v-slot="props">
                {{ props.row.gross_profit }}
            </b-table-column>

            <b-table-column label="Country" v-slot="props">
                <span>
                    {{ props.row.country }}
                </span>
            </b-table-column>

        </b-table>

    </div>
</template>
