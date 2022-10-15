<script>
import NavConnect from '@/components/NavConnect.vue'
import LoginForm from '../components/LoginForm.vue'

export default 
{
    name: "SignIn",
    components: 
    { 
        NavConnect, 
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

<template>
    <div class="container">
        <NavConnect />
        <main>
            <LoginForm />
        </main>
    </div>
</template>