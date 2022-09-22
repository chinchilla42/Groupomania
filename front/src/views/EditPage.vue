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
            content: "",
            date: "",
            imageUrl: "",
            file: "",
            userId: localStorage.getItem('userId'),
            newImage: "",
            newContent: "",
            imagePreview: null,
        }
    },
    created() {
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
                    this.userId = singlePostData.userId;
                    this.author = singlePostData.author;
                    this.date = singlePostData.date;
                    this.content = singlePostData.content;
                    this.imageUrl = singlePostData.imageUrl;
                })
                .catch(error => console.log(error));
        },

        /* modifier un post*/
        editPost(id) 
        {
            console.log("test");
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
                            this.$router.push('/HomePage');                            
                        })
                        .catch(error => console.log('error', error))))

            }
            else // post avec image *
            {
                const newPost = new FormData();
                newPost.append("userId", localStorage.getItem("userId"));
                newPost.append("author", this.author);
                newPost.append("date", this.date);
                newPost.append("content", this.newContent);
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
                <textarea type="text" aria-label="contenu" v-model="this.content"></textarea>
                <div class="post__image" v-if="this.imageUrl">
					<img :src="this.imageUrl">
				</div>
                <input type="file" ref="imageUrl" name="image" id="imageUrl" accept="image/*" aria-label="image">
                <button type="button" @click="editPost(this.postId)">Modifier</button>
            </form>
        </div>
    </div>
</template>