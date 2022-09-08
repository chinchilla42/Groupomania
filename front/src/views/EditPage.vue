<script>
import NavHeader from '@/components/NavHeader.vue'

export default {
    name: "EditPage",

    components: {
        NavHeader
    },
    data() {
        return {
            isConnected: true,
            postId: this.$route.params.id,
            post: [],
            content: "",
            date: "",
            imageUrl: "",
            file: "",
            userId: localStorage.getItem('userId'),
            imagePreview: null,
        }
    },
    mounted() {
        this.getOnePost(this.postId);
    },

    methods:
    {

        /* récupérer un post  grâce à son ID*/
        getOnePost(id) {
            
            const url = `http://localhost:3000/groupomania/post/${id}`;
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                },
            }
            fetch(url, options)
                .then(res => res.json())
                .then(singlePostData => {
                    this.post = singlePostData;
                    console.log(this.post);
                })
                .catch(error => console.log(error));
        },

        /* modifier un post*/
        editPost(id) {
            //console.log(this.postId);
            if (this.content == "" && this.file === "") // si le post vide
            {
                alert("Votre publication est vide");
            }
            else if (this.file === "") // post sans image 
            {

                const newContent = {
                    userId: this.userId,
                    author: this.author,
                    date: this.date,
                    content: this.content,
                }
                console.log(newContent);
                const options =
                {
                    method: 'PUT',
                    body: JSON.stringify(newContent),
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                };
                fetch(`http://localhost:3000/groupomania/post/${id}`, options)
                    .then((res => res.json()
                        .then(res => {
                            console.log(res);
                            alert("Votre message a été modifié avec succès");
                            this.toggleIsCreate;
                            this.getAllPosts();
                        })
                        .catch(error => console.log('error', error))))

            }
            else // post avec image *
            {
                const newPost = new FormData();
                newPost.append("userId", localStorage.getItem("userId"));
                newPost.append("author", this.author);
                newPost.append("date", this.date);
                newPost.append("content", this.content);
                newPost.append("imageUrl", this.file);
                for (const value of newPost.values()) {
                    console.log(value);
                }
                const options =
                {
                    method: 'PUT',
                    body: newPost,
                    headers:
                    {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                };
                fetch(`http://localhost:3000/groupomania/post/${id}`, options)
                    .then(res => {
                        console.log(res);
                        return res.json();
                    })
                    .then(resData => {
                        console.log(resData);
                        alert("Votre message a été modifié avec succès");
                        this.toggleIsCreate;
                        this.getAllPosts();
                    })
                    .catch(error => console.log('error message: ', error))
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <NavHeader />
        <div class="edit_post">
            <form name="editPost" id="editPost">
                <input type="text" required v-model="this.content"  v-bind:placeholder="content" aria-label="contenu">
                <input type="file" ref="imageUrl" name="image" id="imageUrl" accept="image/*" aria-label="image">
                <button type="button" @click="editPost()">Modifier</button>
            </form>
        </div>
    </div>
</template>