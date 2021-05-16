<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <form>
        <v-avatar
          color="primary"
          size="128"
          @click="imageDialogFlag = !imageDialogFlag"
        >
          <v-img :src="img"> </v-img>
        </v-avatar>
        <v-text-field v-model="userInfo.id" disabled label="ID"></v-text-field>
        <v-text-field
          v-model="userInfo.password"
          label="PASSWORD"
        ></v-text-field>
        <v-text-field v-model="userInfo.name" label="NAME"></v-text-field>
        <v-text-field v-model="userInfo.email" label="EMAIL"></v-text-field>
        <!-- <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox> -->

        <v-btn class="mr-4" @click="save"> save </v-btn>
        <!-- <v-btn @click="clear"> clear </v-btn> -->
      </form>
    </v-flex>

    <!-- 이미지등록 dialog -->
    <v-dialog v-model="imageDialogFlag" max-width="500px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="imageDialogFlag = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Upload Image</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-card-text>
          <!-- <v-row justify="center">
            <v-img :src="uploadImg"> </v-img>
          </v-row> -->
          <input
            ref="image"
            id="input"
            type="file"
            name="image"
            accept="image/*"
            multiple="multiple"
            class="hidden"
            @change="uploadImageLocal()"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="uploadImage()"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Constant from "../Constant";
export default {
  data() {
    return {
      userInfo: {
        id: null,
        password: null,
        name: null,
        email: null,
        image: null,
      },
      img: null,
      imageDialogFlag: false,
      uploadImg: null,
    };
  },
  computed: {
    id: function () {
      return this.$store.state.userInfo.userInfo.id;
    },
    password: function () {
      return this.$store.state.userInfo.userInfo.password;
    },
    name: function () {
      return this.$store.state.userInfo.userInfo.name;
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.$http
        .get(Constant.URL_USER)
        .then((res) => {
          this.userInfo = res.data.user;
          this.getImage(this.userInfo.image);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getImage(fileName) {
      this.img = null;
      this.$http
        .post(
          Constant.URL_IMG_DOWNLOAD,
          { fileName },
          { "Content-Type": "application-json" }
        )
        .then((res) => {
          this.img = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    save() {
      this.$http
        .put(Constant.URL_USER + "/" + this.userInfo.id, this.userInfo, {
          "Content-Type": "application-json",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    uploadImageLocal() {
      this.uploadImg = this.$refs["image"].files[0];
    },
    uploadImage() {
      let form = new FormData();
      form.append("file", this.uploadImg);

      this.$http
        .post(Constant.URL_IMG_UPLOAD, form, {
          header: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.userInfo.image = res.data.filename;
          this.imageDialogFlag = false;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style></style>