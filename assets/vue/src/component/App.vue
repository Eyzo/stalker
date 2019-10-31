<template>
    <div>
        <div class="container">
            <AppHeader></AppHeader>
            <router-view></router-view>
            <AppFooter></AppFooter>
        </div>
    </div>
</template>

<script>
    import AppHeader from './base/Header'
    import AppFooter from './base/Footer'

    export default {
        name: 'App',
        components: { AppHeader, AppFooter }
    }
</script>