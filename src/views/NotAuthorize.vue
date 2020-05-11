<template>
    <el-row>
        <h1>Your account is not authorized</h1> <el-button :loading="isLoading" type="warning" @click="handleLogout">ចាកចេញ</el-button>
    </el-row>
</template>

<script>
    export default  {
        data(){
            return {
                isLoading:false,
            }
        },
        methods: {
            handleLogout() {
                this.isLoading=true;
                this.$store.commit("unSetUser");
                setTimeout(() => {
                    this.isLoading=false;
                    this.$router.push("/");
                }, 500);
            },
        }
    }
</script>