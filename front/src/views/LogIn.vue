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
    },
    data() 
    {
        return {
            isConnected: false,
        }
    }
}
</script> 

<style>
</style>

<template>
    <div class="container">
        <NavHeader :isConnected="isConnected" />
        <main>
            <LoginForm />
        </main>
    </div>
</template>