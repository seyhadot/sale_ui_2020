<template>
  <div class="content-card bg-white shadow px-6 py-5">
    <div class="table-responsive">
      <div class="card-header">
        <form class="form-inline">
          <label class="mr-sm-2 form-label" for="inlineFormFilterBy">Filter by:</label>
        </form>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th style="width: 18px;">
              <div class="custom-control custom-checkbox">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
            </th>

            <th class="text-left">
              <a href="javascript:void(0)">Name</a>
            </th>

            <th class="text-left" style="width: 120px;">
              <a href="javascript:void(0)">Price</a>
            </th>
            <th style="width: 150px;">
              <a href="javascript:void(0)">Sku</a>
            </th>

            <th class="text-center" style="width: 80px;">
              <a href="javascript:void(0)">Category</a>
            </th>

            <th style="width: 37px;">Stock</th>

            <th style="width: 120px;">
              <a href="javascript:void(0)">Active</a>
            </th>
            <th style="width: 51px;">
              <a href="javascript:void(0)">Earnings</a>
            </th>
            <th style="width: 24px;" class="pl-0"></th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="x in 30">
            <td class="pr-0">
              <div class="custom-control custom-checkbox">
                <el-checkbox v-model="checked"></el-checkbox>
              </div>
            </td>

            <td>
              <div class="flex flex flex-no-wrap items-center rounded-circle" style="white-space: nowrap;">
                <div class="avatar avatar-sm mr-3">
                  <img src="http://luma.humatheme.com/assets/images/people/110/guy-2.jpg" alt="Avatar" class="avatar-img rounded-full" />
                </div>
                <div>
                  <p class="mb-0">
                    <strong>Michael Smith</strong>
                  </p>
                  <small class="text-menu_low">lorna_kirlin@nora.biz</small>
                </div>
              </div>
            </td>
            <td>
              <span class="Price text-menu_low">40000$</span>
            </td>
            <td class="Number text-center text-menu_low">
              <span>00237000</span>
            </td>
            <td>
              <span class="Category chip chip-outline-secondary">Food</span>
            </td>

            <td class="text-center">12</td>

            <td class="text-menu_low text-center">
              <i class="uil-check text-3xl text-green-600"></i>
              <!-- <i class="uil-multiply text-xl font-bold text-gray-600"></i> -->
            </td>
            <td class="text-center">
              <span>$12,402</span>
            </td>
            <td class="text-right">
              <a href class="text-gray-700">
                <i class="flex items-center justify-center bg-menu_blue uil-ellipsis-v w-8 h-8 rounded-full"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>
