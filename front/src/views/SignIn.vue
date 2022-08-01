<template>
    <div container>
        <NavHeader />
        <main>
            <div class="connection">
                <h1>Se connecter</h1>
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
    display: flex;
    flex-direction: column;
}

</style>