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

        addImg()
    {
      this.file = this.$refs.file.files[0];
      if (this.file && this.file['type'].split('/')[0] === 'image') 
      {
        this.imagePreview = URL.createObjectURL(this.file);
        console.log(this.imagePreview);
        this.imageUrl = this.file;
      }
      else 
      {
        this.$refs.file.value = null;
      }
    },

        /* modifier un post*/
        editPost() 
        {
            console.log(this.postId);
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
                fetch(`http://localhost:3000/groupomania/post/${this.postId}`, options)
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
        <NavHeader />
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