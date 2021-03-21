<template>
    <v-layout align-center justify-center>
        채팅 프로그램에 오신 것을 환영합니다.
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            password: '',
        }
    },
    computed: {
        nameValidation: function() {
            return (this.id === "" && this.password === "");
        }
    },
    created() {
        // this.$http.get("/api/login")
        //     .then((res) => {
        //         const user = res.data.user;
        //         if (user) {
        //             this.$store.commit("setUserId", res.data.user.id);
        //             this.$router.push( { name: "ChatRoom" });
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //     });
    },
    methods: {
        onSubmit() {
            const id = this.id;
            const password = this.password;
            this.$http.post("api/login", { id, password, }, { "Content-Type": "application-json" })
                .then((res) => {
                    if (res.data.user) {
                        this.$store.commit("setUserId", res.data.user.id);
                        this.$router.push( { name: "ChatRoom" });
                    } else if (res.data.message) {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
}
</script>

<style></style>