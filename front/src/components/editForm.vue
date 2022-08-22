<!-- <script>
export default
    {
        name: 'editForm',
        data() {
            return {
                postId: this.$route.params._id,
                content: "",
                imageUrl: "",
                userId: localStorage.getItem('userId'),
                admin: localStorage.getItem('admin'),
        },

        // create() {

        //     const url = "http://localhost:3000/groupomania/post/" + postId;
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')
        //         }
        //     };
        //     fetch(url, options)
        //         .then(response => response.json())
        //         .then(data => {
        //             this.postId = data._id;
        //             this.content = data.content;
        //             this.imageUrl = data.imageUrl;
        //         })
        //         .catch(error => console.error(error));
        // },
        methods: {
            editContent() {
                console.log(this.postId);
            }
        }
    }
</script> -->

<template>
  <div class="editPost">
    <h2>Modifier votre publication</h2>
    <div>
        <form name="editPost" id="editPost">
            <input type="text" required v-model="this.content" aria-label="contenu">
            <input type="file" ref="imageUrl" name="image" id="imageUrl" accept="image/*" aria-label="image">
        </form>
    </div>
  </div>
</template>