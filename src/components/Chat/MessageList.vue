<template>
  <v-list v-auto-bottom="msgs">
    <transition-group name="list" >
      <div v-for="(msg) in msgs" :key="msg.msg">
        <v-list-item>
          <v-list-item-action>
            <span>{{msg.from.name}}</span>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{msg.msg}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
      </div>
    </transition-group>
  </v-list>
</template>

<script>
export default {
  name: 'MessageList',
  props: ['msgs'],
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
