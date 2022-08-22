<script>
export default 
{
  name: 'CreatePost',
  data() {
    return {
      content: "",
      //imageUrl: "",
      userId: localStorage.getItem('userId'),
    }
  },
  methods: 
  {
    publishContent() //essai pour publication avec image
    {
      if (this.content == "")
      {
        alert("Votre publication est vide");
      }
      else 
      {
        const newImg = document.getElementById('imageUrl');
        const img = newImg.files[0];
        const imageName = JSON.stringify(img.name);
        console.log(imageName);
        const newPost = new FormData();
          newPost.append("userId", this.userId);
          newPost.append("content", this.content);
          newPost.append("image", this.file);
          //newPost.append("image", imageName);
        for (const value of newPost.values()) {
          console.log(value);
        }        
        const options =
        {
          method: 'POST',
          body: newPost,
          headers: 
          {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }
        };
        fetch('http://localhost:3000/groupomania/post', options)

          .then((res => res.json()
          .then(data => {
          console.log(data);
          alert("Votre message a été publié avec succès");
          document.location.reload();
        })
        .catch(error => console.log('error', error))))
      }
     },
      add_img(){
            this.file = this.$refs.file.files[0];
        },
   }
}


// publishContent() //fonctionne pour publication sans image
//     {
//       if (this.content == "")
//       {
//         alert("Votre publication est vide");
//       }
//       else 
//       {
//         const newContent = {
//           userId: this.userId,
//           content: this.content,
//         }
//         console.log(newContent);
//         const options =
//         {
//           method: 'POST',
//           body: JSON.stringify(newContent),
//           headers: 
//           {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("token"),
//           }
//         };
//         fetch('http://localhost:3000/groupomania/post', options)
//           .then((res => res.json()
//           .then(res => {
//           console.log(res);
//           alert("Votre message a été publié avec succès");
//           document.location.reload();
//         })
//         .catch(error => console.log('error', error))))
//       }
//      }
//    }
// }
 
</script>

<style>
textarea {
  resize: none;
  max-width: 100%;
  margin: 5px;
  padding: 5px;
}
</style>

<template>
  <div class="createPost">
    <h2>Créer une publication</h2>
    <form enctype="multipart/form-data" method="post" id="newPost" >
    <!-- <form  id="newPost" > -->
      <textarea wrap="soft" rows="1" name="content" v-model="content" placeholder="Quoi de neuf ?"></textarea>
      <label for="image"><i class="fas fa-file-image"></i> Ajouter une image</label>
      <input 
      type="file" 
      ref="file" 
      name="image" 
      id="imageUrl" 
      @change="add_img()"
      accept=".image/*" 
      aria-label="file selection" />
      <button type="submit" @click="publishContent()">Partager</button>
    </form>
  </div>
</template>