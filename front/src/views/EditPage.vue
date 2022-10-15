<script>
import NavHome from '@/components/NavHome.vue'

export default {
    name: "EditPage",

    components: {
        NavHome
    },

    data() {
        return {
            postId: this.$route.params.id,
            content: "",
            date: "",
            imageUrl: "",
            file: "",
            userId: localStorage.getItem('userId'),
            admin: localStorage.getItem('admin'),
            newImage: "",
            newContent: "",
            imagePreview: null,
        }
    },
    created() {
        this.getOnePost(this.postId);
    },
    beforeUpdate() {
        if(localStorage.getItem("token") == null)
        {
            this.$router.push("/");
        } else{
            console.log("ok");
        }
    },

    methods:
    {
        /* get a post using its ID*/
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
        /* add file to post */
        addImg()
        {
            this.file = this.$refs.file.files[0];
            if (this.file && this.file['type'].split('/')[0] === 'image') 
            {
                this.imagePreview = URL.createObjectURL(this.file);
            }
            else 
            {
                this.$refs.file.value = null;
            }
        },

        /* edit a post*/
        editPost() 
        {
            /* if empty */
            if (this.content == "" && this.file === "") 
            {
                 alert("Votre publication est vide");
            }
            /* post with no image */
            else if (this.file === "")  
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
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
                    .then((res => res.json()
                        .then(res => {
                            console.log(res);
                            alert("Votre message a été modifié avec succès");
                            this.$router.push('/HomePage');                            
                        })
                        .catch(error => console.log('error', error))))

           }
           /* post with image */
            else 
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
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
                    .then(res => {
                        console.log(res);
                        return res.json();
                    })
                    .then(resData => {
                        console.log(resData);
                        alert("Votre message a été modifié avec succès");
                        this.$router.push('/HomePage');
                    })
                    .catch(error => console.log('error message: ', error))
            }
        }
    }
}

</script>

<template>
    <div class="container">
        <NavHome />
        <div class="edit_post">
            <form name="editPost" id="editPost">
                <textarea type="text" aria-label="contenu" v-model="content"></textarea>
                <div class="post__image" v-if="imageUrl">
					<img :src="imageUrl">
				</div>
                <input 
                    type="file" 
                    class="image"
                    ref="file" 
                    id="file"
                    name="file"
                    accept="image/*"
                    @change="addImg()"
                    aria-label="file selection" />
                <div v-if="imagePreview">
                    <img :src=imagePreview />  
                </div>              
                <button type="button" @click="editPost()">Modifier</button>
            </form>
        </div>
    </div>
</template>

<style>
.edit_post {
    display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin:  10px ;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 2px #4E5166;  
}
.post__image img {
	margin-left: auto;
	margin-right: auto;
	object-fit: cover;
	max-height: 100%;
	height: auto;
	max-width: 100%;
}

@media (max-width: 767px) {
    textarea {
        height: auto;
    }
}
</style>