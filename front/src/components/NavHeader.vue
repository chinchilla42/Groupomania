<script>
export default {
	name: 'NavHeader',
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push('/');
        }

    }
}
</script>

<template>
    <header>
        <img src="../assets/icon-left-font.png" alt="Logo de Groupomania">
        <nav>
            <ul> 
                <li><router-link to="/" @click="logout()"><i class="fas fa-power-off"></i> Déconnexion</router-link></li>    
                <li><router-link to="/signup">Créer un compte</router-link></li>
                <li><router-link to="/">Se connecter</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style>
header{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
#test{
    display: none;
}

img {
    object-fit: cover;
    width: 60%;
    height: 200px;
}

ul {
    list-style-type: none;  
}

li{
    margin: 5px;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover{
    color:#FD2D01;
}
</style>