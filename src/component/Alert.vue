<template>
    <div class="alignC">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <router-view></router-view>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    name: 'alert-box',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            console.log(to, from);
            this.clearAlert();
        }
    } 
};
</script>

<style lang="scss" scoped>
.alert{

  &-danger{
    background: none;
    color: #EB5757;
    border: none;
    padding: 0;
  }
}
</style>