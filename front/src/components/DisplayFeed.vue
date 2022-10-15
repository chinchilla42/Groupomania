<script>

export default
	{
		name: "DisplayFeed",
		data() {
			return {
				userId: localStorage.getItem("userId"),
				admin: localStorage.getItem("admin"),
				posts: [],
				user: {},
			};
		},

		methods:
		{
			/* get all posts ti display */
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

			/* delete a post */
			deletePost(id) {
			console.log("post id: " + id);
			console.log("user id: " + this.userId);
				if (confirm("Voulez vous supprimer cette publication ? ")) {
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

			/* like a post*/
			likePost(id) {
				const newLike = {
					like: 1,
					userId: this.userId,
					postId: id,
				}
				console.log(newLike);
				const url = `http://localhost:3000/groupomania/post/${id}/like`;
				const options =
				{
					method: 'POST',
					body: JSON.stringify(newLike),
					headers:
					{
						"Content-Type": "application/json",
						"Authorization": "Bearer " + localStorage.getItem("token"),
					}
				};
				fetch(url, options)
					.then((res => res.json()
						.then(res => { console.log(res); this.getAllPosts(); })
						.catch(error => console.log('error', error))))
			},
		},

		mounted() {
			this.getAllPosts();
		}

	}
</script>

<template>
	<div class="feeds">
		<h2>Votre fil d'actualité</h2>
		<div class="feeds_post">
			<div v-for="post in posts.slice().reverse()" :key="post.id" class="post">
				<div class="post__box">
					<div class="post__data">
						<div class="post__user">
							<p>Le {{ post.date }}, <span class="writer">{{ post.author }} </span> a dit : </p>
						</div>
						<p class="post__content">{{ post.content }}</p>
						<div class="post__image" v-if="post.imageUrl">
							<img :src="post.imageUrl">
						</div>
						<div class="post__reaction">
							{{ post.likes }} 
							<span class="like" @click="likePost(post._id)" v-if="admin == 'false'">
								<i class="fas fa-thumbs-up"></i></span>
						</div>
						<div class="change" v-if="post.userId == userId || admin == 'true'">
							<div class="modify_post">
								<router-link :to="{ name: 'editPage', params: {id: post._id }}">
									<p><i class="fas fa-pen"></i> Modifier</p>
								</router-link>
							</div>
							<div class="delete-post" @click="deletePost(post._id)">
								<p><i class=" fas fa-trash"></i> Supprimer</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.create-post,
.post,
.admin__post {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 10px;
	padding: 10px;
	border-radius: 5px;
	box-shadow: 2px 2px 5px 2px #4E5166;
}

.post__data {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin: 5px;
	padding: 5px;
}

.writer {
	font-weight: bold;
}

.change {
	display: flex;
	flex-wrap: wrap;
	width: auto;
	justify-content: space-around;
}

.post__reaction {
	align-self: flex-end;
	align-items: baseline;
	padding: 5px;
}

.like {
	padding: 5px;
	margin: 5px;
}

.modify__post,
.delete__post {
	color: #FD2D01;
	padding: 5px;
}

.postLiked {
	color: gray;
}

.post__image {
	display: flex;
	flex-wrap: wrap;
	margin: 10px;
	overflow: hidden;
	flex-basis: auto;
}

main img {
	margin-left: auto;
	margin-right: auto;
	object-fit: cover;
	max-height: 100%;
	height: auto;
	max-width: 100%;
}
</style>