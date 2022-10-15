<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods:
    {
        /* login */
        login() 
        {
            const user =
            {
                email: this.email,
                password: this.password
            }
            const options =
            {
                method: 'POST',
                body: JSON.stringify(user),                    
                headers:
                {
                    'Content-Type': 'application/json'
                },
            };
            fetch('http://localhost:3000/groupomania/auth/login', options)
                .then(res => res.json())
                .then(data => 
                {
                    if (data.userId && data.token) 
                    {
                        let token = data.token;
                        let userId = data.userId;
                        let admin = data.admin;
                        localStorage.setItem("token", token);
                        localStorage.setItem("userId", (userId));
                        localStorage.setItem("admin", JSON.stringify(admin));
                        this.$router.push('/HomePage');
                    }
                    else 
                    {
                        alert("Identifiants incorrects");
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
}
</script>

<template>
    <div class="connection">
        <h1>Se connecter</h1>
        <form class="sign-in-form">
            <label>Adresse e-mail</label>
            <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.fr">
            <label>Mot de passe</label>
            <input type="password" name="password" v-model="password" required placeholder="****">
            <button type="button" @click="login()">Connexion</button>
        </form>
        <p>Pas encore membre ?<br/> <router-link to="/signup">Créez un compte !</router-link>
        </p>
    </div>
</template>

