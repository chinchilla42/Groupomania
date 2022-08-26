<script>

export default
	{
		name: "DisplayFeed",
		data() {
			return {
				isEdit: false,
				userId: localStorage.getItem("userId"),
				admin: localStorage.getItem("admin"),
				posts: [],
				user: {},
			};
		},

		methods:
		{
			/* récupérer tous les posts à afficher */
			getAllPosts() {
				const url = "http://localhost:3000/groupomania/post";
				const options = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token"),
					}
				};
				fetch(url, options)
					.then(res => res.json())
					.then(postData => {
						this.posts = postData;
					})
					.catch(error => console.log(error));
			},

			/* récupérer un post  grâce à son ID*/
			getOnePost(id) {
				const url = `http://localhost:3000/groupomania/post/${id}`;
				const options = {
					method: "GET",
					headers: {
						// 'Content-Type': 'application/json',
						'Authorization': "Bearer " + localStorage.getItem("token"),
					},
				}
				fetch(url, options)
					.then(res => res.json())
					.then(singlePostData => {
						this.post = singlePostData;
					})
					.catch(error => console.log(error));
			},

			/* essaie de créer 2 fonction pour afficher la partie modification */
			toggleEditPost() {
				this.isEdit = !this.isEdit;
			},

			openEditPost(id) {
				this.getOnePost(id);
				this.toggleEditPost();
			},
			/**toujours impossible d'accéder à la modification du post. 
			 * j'ai tenté d'ajouter une fonction pour récupérer le post en question et essayer d'en extraire l'id
			 * mais ça ne mène à rien pour l'instant
			  **/

			/* modifier un post*/
			editPost() {
				//à faire
			},

			/* supprimer un post */
			deletePost(id) {
				if (confirm("Voulez vous supprimer ce post ? ")) {
					fetch(`http://localhost:3000/groupomania/post/${id}`,
						{
							method: "DELETE",
							headers:
							{
								Authorization: `Bearer ${localStorage.getItem("token")}`
							},
						})
						.then((res) => {
							if (res.status === 200) {
								alert("Publication supprimée !");
								this.getAllPosts();
							}
							else {
								console.log(res.json());
							}
						})
						.catch((err) => console.log(err));
				}
			},

			/* aimer un post*/
			likePost() {
				//à faire
			}

		},

		mounted() {
			this.getAllPosts()
		},
	}
</script>

<template>
	<div class="feeds">
		<h2>Votre fil d'actualité</h2>
		<div class="feeds_post">
			<div v-for="post in posts.slice().reverse()" :key="post.id" class="post">
				<div class="post__box">
					<div class="post__user">
						<p>Le {{post.date }},  {{ post.author }} a dit : </p>
					</div>
					<div class="post__image">{{ post.image }}
					</div>
					<p class="post__content">{{ post.content }}</p>
					<div class="like" @click="likePost(post._id)"><i class="fas fa-thumbs-up"></i> J'aime</div>
					<div class="change" v-if="post.userId == userId || admin == 'true'">
						<div class="modify_post" @click="openEditPost(post._id)">
							<p><i class="fas fa-pen"></i> Modifier</p>
						</div>
						<div class="delete-post" @click="deletePost(post._id)">
							<p><i class=" fas fa-trash"></i> Supprimer</p>
						</div>
					</div>
					<div class="edit_post" v-if="isEdit">
						<form name="editPost" id="editPost">
							<input type="text" required v-model="this.content" aria-label="contenu">
							<input type="file" ref="imageUrl" name="image" id="imageUrl" accept="image/*"
								aria-label="image">
							<button type="submit" @click="editPost(post._id)">Modifier</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.create-post,
.post {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 10px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 2px 2px 5px 2px #4E5166;
}


.change {
	display: flex;
	flex-wrap: wrap;
	width: auto;
	justify-content: space-around;
	border-top: solid 1px;
}

.like,
.modify__post,
.delete__post {
	color: #FD2D01;
	padding: 5px;

}

.like {
	text-align: right;
	padding-bottom: 10px;
}
</style>