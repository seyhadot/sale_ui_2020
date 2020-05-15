<template>
  <div class="content xs:p-5 sm:p-5 xl:p-10 xl:pt-0">
    <div class="px-2">
      <div class="flex -mx-3">
        <div class="w-1/2 px-1">
          <div class="border-t-4 border-cerise"></div>
        </div>
        <div class="w-1/2 px-1">
          <div class="border-t-4 border-topaz"></div>
        </div>
      </div>
    </div>
    <div class="content-card bg-white xs:p-5 sm:p-5 xl:p-10">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>