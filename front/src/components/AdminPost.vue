<script>
export default {
	name: 'AdminPost',
    data() {
        return {
            admin: localStorage.getItem("admin"),
        }
    },
}
</script>

<template>
    <div class="admin__post">
        Cher administrateur, chère administratrice, <br>
        Votre rôle est d'assurer le respect de la charte d'utilisation
         que nos collaborateurs ont signé avant d'accéder à ce service.  

    </div>
</template>

<style>
.admin__post{
    padding: 20px;
    text-align: justify;
    line-height: 25px;

}
</style>