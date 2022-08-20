<script>
import NavHeader from '@/components/NavHeader.vue'
import LoginForm from '../components/LoginForm.vue'

export default 
{
    name: "SignIn",
    components: 
    { 
        NavHeader, 
        LoginForm 
    }
}
</script> 

<style>
</style>

<template>
    <div class="container">
        <NavHeader />
        <main>
            <LoginForm />
        </main>
    </div>
</template>