<template>
    <div class="container">
        <NavHeader />
        <main>
            <div class="connection">
                <h1>Se connecter</h1>
                <form class="sign-in-form">
                    <label>Adresse e-mail</label>
                    <input type="email" placeholder="nom@groupomania.fr">
                    <label>Mot de passe</label>
                    <input type="password">
                    <button type="button" @click="login">Connexion</button>
                </form>
                <p>Pas encore membre ? <router-link to="/signup">Créez un compte !</router-link>
                </p>
            </div>
        </main>
    </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
    name: "SignIn",
    components: { NavHeader },
    data() {
        return {
            input: {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        login() {
            const userData =
            {
                "email": this.input.email,
                "password": this.input.password
            }
            const options =
            {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            fetch('http://localhost:3000/api/user/login', options)
                .then(res => res.json())
                .then(res => {
                    if (res.userId && res.token) {
                       
                        this.$router.push('/HomePage')
                    }
                    else {
                        alert("Identifiants incorrects");
                    }
                })
                .catch(error => console.log(error))
        },

    }
}
</script> 

<style>
</style>