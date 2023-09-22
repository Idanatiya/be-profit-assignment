<template>
    <aside class="sidebar">
        <header class="sidebar__header">
            <div class="sidebar__avatar">
                <img class="sidebar__avatar_img" alt="logo" />
            </div>
        </header>
        <nav>
            <ul>

                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </nav>

    </aside>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.sidebar {
    // background: red;
    grid-row: 1 / -1;
    // border-right: 1px solid #e4e4e4;
    background: #2e3044;
}
</style>