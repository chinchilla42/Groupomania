
<script>
import NavHeader from '@/components/NavHeader.vue'
import ConnectionForm from '../components/ConnectionForm.vue'
export default 
{
    name: "SignUp",
    components: 
    { 
        NavHeader, 
        ConnectionForm 
    },
}
</script> 

<template>
    <div class="container">
        <NavHeader />
        <main>
            <ConnectionForm />
        </main>
    </div>
</template>

<style>
main {
    margin: 0px;
    width: 100%;
}

.connection {
    position: relative;
    margin: 25px auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #FFD7D7;
    padding: 10px;
    align-self: center;
    width: 30%;
    border-radius: 5px;

}

form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 10px;
}

h1 {
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: inherit;
    text-align: left;
    padding-bottom: 2px;
    margin-left: 15px;
}

input,
label,
button {
    margin-top: 10px;
    margin: 10px;
}

input {
    padding: 5px;
    border-radius: 5px;
    border: none;
}

button {
    align-self: center;
    border-radius: 25px;
    padding: 10px 25px;
    background-color: #FD2D01;
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

p {
    text-align: right;
    margin: 5px;
    padding-bottom: 5px;
}

@media (max-width: 767px) {
    .connection {
        margin: 5px;
        width: auto;
    }

}
</style>


