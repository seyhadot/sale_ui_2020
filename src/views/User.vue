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
              <a href="javascript:void(0)">Employee</a>
            </th>

            <th style="width: 150px;">
              <a href="javascript:void(0)">Phone Number</a>
            </th>

            <th class="text-center" style="width: 48px;">
              <a href="javascript:void(0)">Permission</a>
            </th>

            <th style="width: 37px;">Status</th>

            <th style="width: 120px;">
              <a href="javascript:void(0)">Activity</a>
            </th>
            <th style="width: 51px;">
              <a href="javascript:void(0)">Earnings</a>
            </th>
            <th style="width: 24px;" class="pl-0"></th>
          </tr>
        </thead>
        <tbody class="list">
          <tr class v-for="x in 50">
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
                <div class>
                  <div class>
                    <p class="mb-0">
                      <strong>Michael Smith</strong>
                    </p>
                    <small class="text-menu_low">lorna_kirlin@nora.biz</small>
                  </div>
                </div>
              </div>
            </td>

            <td>
              <div class>
                <a href="#" class="text-warning">
                  <i class="uil-mobile-vibrate mr-3 text-menu_yellow"></i>
                </a>
                <a href class="text-menu_low">
                  <span>012 558 695</span>
                </a>
              </div>
            </td>

            <td class="text-center small">12</td>

            <td>
              <a href class="chip chip-outline-secondary">Admin</a>
            </td>

            <td class="text-menu_low text-center small">3 days ago</td>
            <td class="text-center small">$12,402</td>
            <td class="text-right pl-0">
              <a href class="text-menu_low">
                <i class="uil-ellipsis-v"></i>
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
