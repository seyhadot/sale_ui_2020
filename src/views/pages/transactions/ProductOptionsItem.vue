<template>
  <div class="item" v-bind:style="itemStyle">
    <div class="card">
      <div class="card-avatar" style="background: purple">
        <span>{{item.type.toUpperCase()}}</span>
      </div>
      <div class="card-info" @click="handleClickCard(item)" style="cursor: pointer;">{{item.label}}</div>
      <div class="card-height">
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-delete"
          class="hover:bg-white bg-red-600 text-white hover:text-red-700 hover:border-red-700 border-red-700 is-circle"
          style="padding:12px;"
          @click="handleClickRemove(item)"
          circle
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'item',
        props: {
            item: {
                type: Object
            },
        },
        computed: {
            itemStyle () {
                return {
                    'height': `80px`,
                    'line-height': `2px`,
                }
            }
        },
        methods: {
            handleClickCard(item) {
               this.$emit('item-action', {
                   action: 'edit',
                   item
               })
            },
            handleClickRemove(item) {
                this.$emit('item-action', {
                    action: 'remove',
                    item
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.item {
  box-sizing: border-box;
  display: flex;
  @media (max-width: 640px) {
    -webkit-user-select: none;
    user-select: none;
  }
  // &:hover {
  //     background-color: #f0f8ff;
  // }
  .index {
    flex: 1;
    text-align: center;
  }
  .card {
    position: relative;
    flex: 4;
    display: flex;
    align-items: center;
    border-bottom: 1px dashed #cecece;
    @media (max-width: 640px) and (-webkit-min-device-pixel-ratio: 2) {
      border-bottom: 0.5px solid #cccccc;
    }
    &-avatar {
      width: 60px;
      height: 60px;
      background: #efefef;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
      font-size: 13px;
      font-weight: bold;
      &.no-avatar {
        background: #ff6347;
        color: #ffffff;
      }
      &-img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    &-info {
      display: flex;
      flex-direction: column;
      // height: 100%;
      padding-left: 40px;
      @media (max-width: 640px) {
        padding-left: 20px;
      }
      &-item {
        flex: 1;
        height: 50%;
        line-height: 1;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 300px;
        overflow: hidden;
        @media (max-width: 640px) {
          max-width: 180px;
        }
        &.name {
          padding-bottom: 3px;
        }
        &.time {
          padding-top: 3px;
          color: #a9a9a9;
        }
      }
    }
    &-height {
      position: absolute;
      right: 30px;
      font-style: italic;
      color: #999;
      font-weight: 100;
      font-family: sans-serif;
      font-size: 12px;
      @media (max-width: 375px) {
        right: 10px;
      }
    }
  }
}
</style>
