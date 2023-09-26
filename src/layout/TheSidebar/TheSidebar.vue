<template>
    <aside class="sidebar">
        <header class="sidebar__header">
            <div class="sidebar__avatar">
                <img class="sidebar__avatar_img" alt="logo" :src="require('../../assets/imgs/logo.jpeg')" />
            </div>
        </header>
        <nav>
            <ul class="sidebar__links">
                <li>
                    <b-tooltip label=" Linkedin" position="is-right">
                        <a href="https://www.linkedin.com/in/idan-atiya-0505911b2/" target="_blank" rel="noreferrer">
                            <b-icon class="icon linkedin" icon="linkedin" size="is-large">
                            </b-icon>
                        </a>
                    </b-tooltip>
                </li>
                <li>
                    <b-tooltip label="Github Profile" position="is-right">
                        <a href="https://github.com/Idanatiya" target="_blank" rel="noreferrer">
                            <b-icon class="icon github" icon="github" size="is-large">
                            </b-icon>
                        </a>
                    </b-tooltip>
                </li>
            </ul>
        </nav>

    </aside>
</template>

<script>


export default {
    name: 'TheSidebar'
}
</script>

<style scoped lang="scss">
.sidebar {
    grid-row: 1 / -1;
    background: #2e3044;

    .sidebar__header {
        display: flex;
        justify-content: center;
        padding-top: 5px;
        border-bottom: 1px solid #797a79;

        .sidebar__avatar_img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    .sidebar__links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 1.5rem;


        .linkedin {
            color: #0074b0;

        }

        .github {
            color: white;
        }
    }
}
</style>