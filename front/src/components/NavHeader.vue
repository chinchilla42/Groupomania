<template>
    <header class="navbar">
        <img class="navbar__img" src="../assets/icon-left-font.png" alt="Logo de Groupomania">
        <nav class="navbar__menu">
            <ul>
                <li><router-link to="/signup">S'inscrire</router-link></li>
                <li><router-link to="/">Se connecter</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
	name: 'NavHeader'
}
</script>



<style>
.navbar{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

img {
    object-fit: cover;
    width: 60%;
    height: 200px;
}
</style>