<script>
export default {
	name: 'DisplayFeed',
	data() {
		return {
			userId: localStorage.getItem('userId'),
			isAdmin: localStorage.getItem('isAdmin'),
			firstName: "",
			lastName: "",
			imageUrl: "",
			posts: [],
		};
	},
	mounted() {
		this.getAllPosts();
	},
	methods:
	{
		getAllPosts() {
			const url = "http://localhost:3000/groupomania/post";
			const options =
			{
				method: "GET",
				headers:
				{
					"Content-Type": "application/json",
					"Authorization": "Bearer " + localStorage.getItem("token"),
				}
			};
			fetch(url, options)
				.then(res => res.json())
				.then(data => {
					this.posts = data;
					console.log("ok");
				})
				.catch(error => console.log(error));
		},

		editPost(id) {
			this.$router.push({
				path: "/PostEdit/" + id
			});
		},

		// 	deletePost(id)
		// 	{
		// 			const url = "http://localhost:3000/groupomania/post/" + id;
		// 			const options = {
		// 				method: "DELETE",
		// 				headers: 
		// 				{
		// 					"Content-Type": "application/json",
		// 					"Authorization": "Bearer " + localStorage.getItem("token"),
		// 				},
		// 			};
		// 			fetch(url, options)
		// 				.then(response => response.json())
		// 				.then(data => {
		// 					this.post = data;
		// 				})
		// 				.catch(error => console.log(error));
		// 	}
		// },

		deletePost(id) {
			{ console.log(id); }

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
						} else {
							console.log(res.json());
						}
					})
					.catch((err) => console.log(err))
			}
		},

	},
}
</script>

<template>
	<div class="feeds">
		<h2>Votre fil d'actualité</h2>
		<div class="feeds_post">
			<div v-for="post in posts" :key="post.id" class="post">
				<div class="post__user">
					<p>{{ firstName }} {{ lastName }} a dit : </p>
				</div>
				<div class="post__image">{{ post.image }}
				</div>
				<p class="post__content">{{ post.content }}</p>
				<div class="like"><i class="fas fa-thumbs-up"></i> J'aime</div>
				<div class="post__edit" v-if="post.userId == userId || admin == 'true'">
					<div class="modify_post" @click="editPost(post._id)">
						<p><i class="fas fa-pen"></i> Modifier</p>
					</div>
					<div class="delete_post" @click="deletePost(post._id)">
						<p><i class="fas fa-trash"></i> Supprimer</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.post__edit {
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