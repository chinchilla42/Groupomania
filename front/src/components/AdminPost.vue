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
         que nos collaborateurs ont signée avant d'accéder à ce service.<br> 
         Vous avez la possibilité de modifier ou de supprimer les publications qui contreviennent aux valeurs de notre entreprise.<br> 
         Nous comptons sur vous pour faire preuve de bienveillance et de discernement.

    </div>
</template>

<style>
.admin__post{
    padding: 20px;
    text-align: justify;
    line-height: 25px;

}
</style>