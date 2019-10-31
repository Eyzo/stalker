<template>
    <div>
        <div class="col-md-12 box">
            <div class="row">
                <div class="col-md-6">
                    <img :src="post.img" :alt="post.name" width="100%">
                </div>
                <div class="col-md-6">
                    <h1 class="text-center">{{ post.name }}</h1>
                    <p>{{ post.description }}</p>

                    <div class="txtc">

                        <form @submit.prevent="deletingPost">
                            <button class="btn btn-danger" type="submit">Supprimer</button>
                        </form>

                        <button class="btn btn-info" @click="updatingPost()">Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PostIndex',
        computed: {
            post: function () {
                return this.$store.getters['post/getPost'];
            }
        },
        created() {
            this.$store.dispatch('post/fetchPost',this.$route.params.id);
        },
        methods: {
            deletingPost: function (event) {
                if (confirm('êtes vous sur de bien vouloir supprimer cet article ?')) {
                    let id = this.$route.params.id;
                    this.$store.dispatch('post/deletingPost',id);
                    this.$router.push("/home");
                }
            },
            updatingPost: function () {
                console.log('updating post');
            }
        }
    }
</script>