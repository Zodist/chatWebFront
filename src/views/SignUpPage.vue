<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm6>
        <v-text-field
            ref="id"
            v-model="id"
            label="ID"
            required
            v-on:keyup.enter="onSubmit"
        ></v-text-field>
        <v-text-field
            ref="password"
            v-model="password"
            type="password"
            label="PASSWORD"
            required
            v-on:keyup.enter="onSubmit"
        ></v-text-field>
        <v-text-field
            ref="name"
            v-model="name"
            label="NAME"
            required
            v-on:keyup.enter="onSubmit"
        ></v-text-field>
        <div class="text-xs-center">
            <v-btn @click="onSubmit" rounded color="primary" >SIGN UP</v-btn>
        </div>
        </v-flex>
    </v-layout>
</template>

<script>
import Constant from "../Constant"
export default {
    data() {
        return {
            id: '',
            password: '',
            name: '',
        }
    },
    created() {
    },
    methods: {
        onSubmit() {
            const id = this.id;
            const password = this.password;
            const name = this.name;
            this.$http.post(Constant.URL_SIGNUP, { id, password, name }, { "Content-Type": "application-json" })
                .then((res) => {
                    console.log(res);
                    this.$router.push({ name: "Login" });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    }
}
</script>

<style></style>