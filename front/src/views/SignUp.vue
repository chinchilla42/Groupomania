<template>
    <div class="container">
        <NavHeader />
        <main>
            <div class="connection">
                <h1>Créer un compte</h1>
                <form class="sign-in-form">
                    <label>Nom</label>
                    <input type="name" name="username" v-model="input.username" placeholder="Camille Martin">
                    <label>Adresse e-mail</label>
                    <input type="email" name="email" v-model="input.email" placeholder="nom@groupomania.fr">
                    <label>Mot de passe</label>
                    <input type="password" name="password" v-model="input.password" placeholder="****">
                    <button type="button" @click="signup">Connexion</button>
                </form>
                <p>Déjà membre ? <router-link to="/">Connectez-vous !</router-link></p>
            </div>
        </main>
   </div> 
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
    name: "SignIn",
    components: { NavHeader },
    data(){
        return {
            input:{
                username: "",
                email: "",
                password: "",
            }
        }
    },
    methods: {
        signup() {
            let user =
            {
            username: this.input.username,
            email: this.input.email,
            password: this.input.password
            }
            const options =
            {
            method: "POST",
            headers:
            {
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };
         fetch("http://localhost:3000/api/signup", options)

        .then((res) => res.json())
        .then((data) => 
        {
          console.log(data);
            this.$router.push('/HomePage');
        })
        .catch(error => console.log('error', error));
    }
    }
}
</script> 

<style>
main {
    margin: 0px;
    width: 100%;    
}

.connection{
    position: relative;
    margin: 25px auto ;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #FFD7D7;
    padding : 10px;
    align-self: center;
    width: 30%; 
    border-radius: 5px;

}

form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 10px;
}

h1{
    border-bottom-width: 2px;
    border-bottom-style:  solid;
    border-bottom-color:  inherit;
    text-align: left;
    padding-bottom: 2px;
    margin-left: 15px;
}

input, label, button{
    margin-top: 10px;
    margin: 10px;
}

input{
    padding: 5px;
    border-radius: 5px;
    border: none;
}

button {
    align-self: center;
    border-radius: 25px;
    padding: 10px 25px;
    background-color: #FD2D01 ;
    font-family: inherit;
    font-weight: bold;
    color: #fff;
    border: none;
    margin: 25px;
}

button:hover {
  cursor: pointer;
  -webkit-transform: scale(1.05);
      -ms-transform: scale(1.05);
          transform: scale(1.05);
  -webkit-box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

p{
    text-align: right;
    margin: 5px;
    padding-bottom: 5px;
}

@media (max-width: 767px) {
.connection{ 
    margin: 5px;
    width: auto;
}

}
</style>