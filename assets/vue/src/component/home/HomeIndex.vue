<template>
    <div>
        <!-- Card deck -->
        <div v-for="posts in row" class="card-deck mt1">

            <!-- Card -->
            <div v-for="post in posts" class="card mb-4">

                <!--Card image-->
                <div class="view overlay">
                    <img class="card-img-top" :src="post.img" alt="Card image cap">
                    <a href="#!">
                        <div class="mask rgba-white-slight"></div>
                    </a>
                </div>

                <!--Card content-->
                <div class="card-body">

                    <!--Title-->
                    <h4 class="card-title">{{ post.name }}</h4>
                    <!--Text-->
                    <p class="card-text">{{ post.description }}</p>

                    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                    <router-link tag="button" class="btn btn-light-blue btn-md"
                                 :to="{ name: 'post',params: { id: post.id } }" >Voir</router-link>

                </div>

            </div>
            <!-- Card -->

        </div>
        <!-- Card deck -->
    </div>
</template>

<script>
    export default {
        name: 'HomeIndex',
        data: function () {
            return {
                message: 'je suis un message de test'
            }
        },
        computed: {
          row: function () {
              // console.log(this.$store.getters['post/getFilterPost']);
              return _.chunk(this.$store.getters['post/getFilterPost'],4);
          }
        },
    }
</script>