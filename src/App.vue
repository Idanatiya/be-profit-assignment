<script>
import TheSidebar from '@/layout/TheSidebar/TheSidebar.vue'
import DashboardView from '@/views/DashboardView.vue'

export default {
  components: {
    TheSidebar,
    DashboardView,
  }

}

</script>

<template>
  <div class="root">
    <TheSidebar />
    <main class="main-content">
      <DashboardView />
    </main>
  </div>
</template>

<style lang="scss">
.root {
  height: 100dvh;
  display: grid;
  grid-template-columns: 100px 1fr;
}

.main-content {
  grid-column: 2 / -1;
  padding: 20px
}
</style>
