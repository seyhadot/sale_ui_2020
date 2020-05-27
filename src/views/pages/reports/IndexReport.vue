<template>
  <content-box>
      <div class="report-header w-full">
        <h3 class="text-2xl text-menu_gray font-extrabold font-roboto">Sales & Customers</h3>
      </div>
    <div class="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
 
      <div
        class="w-full report-box cursor-pointer h-full py-8 px-6 bg-pink-700 flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="rectangle-box flex items-center justify-center">
            <h5 class="font-weight-500 text-white m-0">C1</h5>
          </div>
          <div class="ml-3">
            <h3 class="text-white text-sm font-weight-600 capitalize">Sale Summary Report</h3>
            <p class="text-xs muted-white">sale-summary</p>
          </div>
        </div>
        <i class="uil-arrow-growth text-white text-4xl"></i>
      </div>

      <div
        class="w-full report-box cursor-pointer h-full py-8 px-6 bg-orange-600 flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="rectangle-box flex items-center justify-center">
            <h5 class="font-weight-500 text-white m-0">C1</h5>
          </div>
          <div class="ml-3">
            <h3 class="text-white text-sm font-weight-600 capitalize">sale-summary</h3>
            <p class="text-xs muted-white">sale-summary</p>
          </div>
        </div>
        <i class="uil-arrow-growth text-white text-4xl"></i>
      </div>
      <div
        class="w-full report-box cursor-pointer h-full py-8 px-6 bg-blue-600 flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="rectangle-box flex items-center justify-center">
            <h5 class="font-weight-500 text-white m-0">C1</h5>
          </div>
          <div class="ml-3">
            <h3 class="text-white text-sm font-weight-600 capitalize">sale-summary</h3>
            <p class="text-xs muted-white">sale-summary</p>
          </div>
        </div>
        <i class="uil-arrow-growth text-white text-4xl"></i>
      </div>
      <div
        class="w-full report-box cursor-pointer h-full py-8 px-6 bg-green-600 flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="rectangle-box flex items-center justify-center">
            <h5 class="font-weight-500 text-white m-0">C1</h5>
          </div>
          <div class="ml-3">
            <h3 class="text-white text-sm font-weight-600 capitalize">sale-summary</h3>
            <p class="text-xs muted-white">sale-summary</p>
          </div>
        </div>
        <i class="uil-arrow-growth text-white text-4xl"></i>
      </div>
    </div>
  </content-box>
</template>

<script>
  import ContentBox from '../../../components/ContentBoxNoBorder.vue'
  export default {
    components: {
      ContentBox,
    },
  }
</script>

<style lang="scss" scoped>
.report-box {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 8px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.06), 0px 6px 10px 0px rgba(0, 0, 0, 0.042), 0px 1px 18px 0px rgba(0, 0, 0, 0.036);
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1NiAyOCcgd2lkdGg9JzU2JyBoZWlnaHQ9JzI4Jz48cGF0aCBmaWxsPScjZmZmZmZmJyBmaWxsLW9wYWNpdHk9JzAuMTAnIGQ9J001NiAyNnYyaC03Ljc1YzIuMy0xLjI3IDQuOTQtMiA3Ljc1LTJ6bS0yNiAyYTIgMiAwIDEgMC00IDBoLTQuMDlBMjUuOTggMjUuOTggMCAwIDAgMCAxNnYtMmMuNjcgMCAxLjM0LjAyIDIgLjA3VjE0YTIgMiAwIDAgMC0yLTJ2LTJhNCA0IDAgMCAxIDMuOTggMy42IDI4LjA5IDI4LjA5IDAgMCAxIDIuOC0zLjg2QTggOCAwIDAgMCAwIDZWNGE5Ljk5IDkuOTkgMCAwIDEgOC4xNyA0LjIzYy45NC0uOTUgMS45Ni0xLjgzIDMuMDMtMi42M0ExMy45OCAxMy45OCAwIDAgMCAwIDBoNy43NWMyIDEuMSAzLjczIDIuNjMgNS4xIDQuNDUgMS4xMi0uNzIgMi4zLTEuMzcgMy41My0xLjkzQTIwLjEgMjAuMSAwIDAgMCAxNC4yOCAwaDIuN2MuNDUuNTYuODggMS4xNCAxLjI5IDEuNzQgMS4zLS40OCAyLjYzLS44NyA0LTEuMTUtLjExLS4yLS4yMy0uNC0uMzYtLjU5SDI2di4wN2EyOC40IDI4LjQgMCAwIDEgNCAwVjBoNC4wOWwtLjM3LjU5YzEuMzguMjggMi43Mi42NyA0LjAxIDEuMTUuNC0uNi44NC0xLjE4IDEuMy0xLjc0aDIuNjlhMjAuMSAyMC4xIDAgMCAwLTIuMSAyLjUyYzEuMjMuNTYgMi40MSAxLjIgMy41NCAxLjkzQTE2LjA4IDE2LjA4IDAgMCAxIDQ4LjI1IDBINTZjLTQuNTggMC04LjY1IDIuMi0xMS4yIDUuNiAxLjA3LjggMi4wOSAxLjY4IDMuMDMgMi42M0E5Ljk5IDkuOTkgMCAwIDEgNTYgNHYyYTggOCAwIDAgMC02Ljc3IDMuNzRjMS4wMyAxLjIgMS45NyAyLjUgMi43OSAzLjg2QTQgNCAwIDAgMSA1NiAxMHYyYTIgMiAwIDAgMC0yIDIuMDcgMjguNCAyOC40IDAgMCAxIDItLjA3djJjLTkuMiAwLTE3LjMgNC43OC0yMS45MSAxMkgzMHpNNy43NSAyOEgwdi0yYzIuODEgMCA1LjQ2LjczIDcuNzUgMnpNNTYgMjB2MmMtNS42IDAtMTAuNjUgMi4zLTE0LjI4IDZoLTIuN2M0LjA0LTQuODkgMTAuMTUtOCAxNi45OC04em0tMzkuMDMgOGgtMi42OUMxMC42NSAyNC4zIDUuNiAyMiAwIDIydi0yYzYuODMgMCAxMi45NCAzLjExIDE2Ljk3IDh6bTE1LjAxLS40YTI4LjA5IDI4LjA5IDAgMCAxIDIuOC0zLjg2IDggOCAwIDAgMC0xMy41NSAwYzEuMDMgMS4yIDEuOTcgMi41IDIuNzkgMy44NmE0IDQgMCAwIDEgNy45NiAwem0xNC4yOS0xMS44NmMxLjMtLjQ4IDIuNjMtLjg3IDQtMS4xNWEyNS45OSAyNS45OSAwIDAgMC00NC41NSAwYzEuMzguMjggMi43Mi42NyA0LjAxIDEuMTVhMjEuOTggMjEuOTggMCAwIDEgMzYuNTQgMHptLTUuNDMgMi43MWMxLjEzLS43MiAyLjMtMS4zNyAzLjU0LTEuOTNhMTkuOTggMTkuOTggMCAwIDAtMzIuNzYgMGMxLjIzLjU2IDIuNDEgMS4yIDMuNTQgMS45M2ExNS45OCAxNS45OCAwIDAgMSAyNS42OCAwem0tNC42NyAzLjc4Yy45NC0uOTUgMS45Ni0xLjgzIDMuMDMtMi42M2ExMy45OCAxMy45OCAwIDAgMC0yMi40IDBjMS4wNy44IDIuMDkgMS42OCAzLjAzIDIuNjNhOS45OSA5Ljk5IDAgMCAxIDE2LjM0IDB6Jz48L3BhdGg+PC9zdmc+');
}
.rectangle-box {
  height: 40px;
  width: 40px;
  min-width: 40px;
  background-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.muted-white {
  color: hsla(0, 0%, 100%, 0.54) !important;
}
</style>