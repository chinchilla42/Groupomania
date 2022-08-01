<template>
    <div container>
        <NavHeader />
        <main>
            <div class="connection">
                <h1>Créer un compte</h1>
                <form class="sign-in-form">
                    <label>Adresse e-mail</label>
                    <input type="email" placeholder="nom@groupomania.fr">
                    <label>Mot de passe</label>
                    <input type="password">
                    <button type="submit">Connexion</button>
                </form>
            </div>
        </main>
   </div> 
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
    name: "SignIn",
    components: { NavHeader }
}
</script> 

<style>
main {
    width: 30%;
    display: flex;
    margin: auto;
    height: 100%;
}

.connection{
    display: flex;
    flex-direction: column;
    background-color: #FFD7D7;
    padding : 10px;
}
form{
    justify-content: center;
    display: flex;
    flex-direction: column;

}
input, label, button{
        margin-top: 10px;

}

</style>