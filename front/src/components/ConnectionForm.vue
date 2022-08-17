<script>
export default {
	name: 'ConnectionForm',
    data() {
        return {
            input: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        }
    },
    methods: {
         signup() {
            const userData =
            {
                firstName: this.input.firstName,
                lastName: this.input.lastName,
                email: this.input.email,
                password: this.input.password
            }
            // let password = this.input.password;
            // let regex = /^[a-zA-Z\-'çñàéèêëïîôüù ]{2,}$/;
            // if (!regex.test(password)) {
            //    document.getElementById("passwordError").textContent = "Votre mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 2 chiffres et un caractère spécial";
            //    return false;
            // }
            const options =
            {
                method: "POST",
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            };
            fetch("http://localhost:3000/api/auth/signup", options)

                .then((res) => res.json())
				.then (() =>{
                    console.log(userData);
					alert("Inscription confirmée, veuillez vous connecter")
                    this.$router.push('/');				
                })
			.catch(error => console.log(error))
		}
	}
}
</script>

<template>
    <div class="connection">
        <h1>Créer un compte</h1>
        <form class="sign-in-form">
            <label>Prénom</label>
            <input type="firstName" name="firstName" v-model="input.firstName" required placeholder="Camille">
            <label>Nom</label>
            <input type="lastName" name="lastName" v-model="input.lastName" required placeholder="Martin">
            <label>Adresse e-mail</label>
            <input type="email" name="email" v-model="input.email" required placeholder="nom@groupomania.fr">
            <label>Mot de passe</label>
            <input type="password" name="password" v-model="input.password" required placeholder="****">
            <button type="button" @click="signup">Connexion</button>
        </form>
        <p>Déjà membre ? <router-link to="/">Connectez-vous !</router-link>
        </p>
    </div>
</template>