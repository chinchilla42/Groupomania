<script>
export default {
	name: 'ConnectionForm',
    data() {
        return {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
        }
    },
    methods: {
        checkInput ()
        {
            /* regex */
            let nameRegex = /^[a-zA-Z\-'çñàéèêëïîôüù ]{2,}$/;
            let passwordRegex =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,30})$/;
            let emailRegex = /^[^@&"/()!_$*€£`+=;?#]+@groupomania.fr$/;            
            
            if (nameRegex.test(this.firstName) == true) 
            {
                if (nameRegex.test(this.lastName) == true) 
                {
                    if (emailRegex.test(this.email) == true)
                    {
                        if (passwordRegex.test(this.password) == true) 
                        {    
                            this.signup();
                        }
                        else
                        {
                            alert('Votre mot de mot de passe doit contenir au moins : une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial et au moins 8 caractères')
                        } 
                    }
                    else 
                    {
                        alert('Veuillez utiliser votre adresse e-mail professionelle')
                    } 
                }
                else 
                {
                    alert('Format de nom invalide');
                }
            }
            else 
            {
                alert('Format de prénom invalide');
            }
        },

        signup() {   
            const userData =
            {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            }
            const options =
            {
                method: "POST",
                headers:
               {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                };
                fetch("http://localhost:3000/groupomania/auth/signup", options)
                .then(res => res.json())
                .then (() =>{
                        alert("Veuillez vous connecter") 
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
            <input type="text" name="firstName" v-model="firstName" required placeholder="Camille">
            <label>Nom</label>
            <input type="text" name="lastName" v-model="lastName" required placeholder="Martin">
            <label>Adresse e-mail</label>
            <input type="email" name="email" v-model="email" required placeholder="nom@groupomania.fr">
            <label>Mot de passe</label>
            <input type="password" name="password" v-model="password" required placeholder="****">
            <button type="button" @click="checkInput()">Inscription</button>
        </form>
        <p>Déjà membre ? <br/> <router-link to="/">Connectez-vous !</router-link>
        </p>
    </div>
</template>