<template>
  <v-layout justify-center>
    <!-- <v-card class="mx-auto" max-width="500"> -->
    <v-list subheader>
      <v-subheader>Image List</v-subheader>

      <v-list-item
        v-for="image in imageList"
        :key="image.filename"
        @click="getImage(image.filename)"
      >
        <!-- <v-list-item-avatar>
          <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
        </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title v-text="image.filename"></v-list-item-title>
        </v-list-item-content>

        <!-- <v-list-item-icon>
          <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
            mdi-message-outline
          </v-icon>
        </v-list-item-icon> -->
      </v-list-item>
    </v-list>
    <!-- </v-card> -->

    <v-btn
      fab
      color="cyan accent-2"
      bottom
      left
      absolute
      class="v-btn--example"
      @click="uploadImageFlag = !uploadImageFlag"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <!-- 이미지등록 dialog -->
    <v-dialog v-model="uploadImageFlag" max-width="500px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="uploadImageFlag = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Upload Image</v-toolbar-title>
          <!-- <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <v-card-text>
          <input
            ref="image"
            id="input"
            type="file"
            name="image"
            accept="image/*"
            multiple="multiple"
            class="hidden"
            @change="uploadImage()"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="submit()"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 이미지 출력 dialog -->
    <v-dialog v-model="dialog" width="500">
      <v-row justify="center">
        <v-img :src="img"> </v-img>
      </v-row>
    </v-dialog>
  </v-layout>
</template>

<script>
import Constant from "../Constant";
export default {
  data() {
    return {
      imageList: [],

      img: null,
      dialog: false,

      uploadImageFlag: false,
      uploadImg: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getImageList();
  },
  methods: {
    getImageList() {
      this.$http
        .get(Constant.URL_GET_PHOTOLIST, { "Content-Type": "application-json" })
        .then((res) => {
          this.imageList = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getImage(fileName) {
      this.img = null;
      this.dialog = true;
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
    submit() {
      let form = new FormData();
      form.append("file", this.uploadImg);

      this.$http
        .post(Constant.URL_IMG_UPLOAD, form, {
          header: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          this.uploadImageFlag = false;
          this.uploadImg = null;
          this.getImageList();
        })
        .catch((err) => console.log(err));
    },
    uploadImage() {
      this.uploadImg = this.$refs["image"].files[0];
    },
  },
};
</script>

<style>
.v-btn--example {
  bottom: 0px !important;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>