<template>
  <div>
    <div class="intro-y flex items-center">
      <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
    </div>
    <div class="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xs:gap-6 sm:gap-10 xl:gap-8 mt-3">
      <div v-for="x in 4" class="w-full intro-y transition ease-out duration-700">
        <div class="report-box zoom-in">
          <div class="box p-5">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather text-cerise feather-shopping-cart report-box__icon text-theme-10"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <div class="ml-auto">
                <div class="report-box__indicator bg-topaz-1 text-menu_gray tooltip cursor-pointer">
                  33%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-chevron-up w-4 h-4"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold text-bunting leading-8 mt-6">4.510</div>
            <div class="text-sm text-gray-600 mt-1">Item Sales</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart mt-4 -m-4">
      <div class="lg:flex-row xl:flex mb-4">
        <div class="xs:w-1/1 lg:w-1/2 m-4">
          <div class="intro-y block flex justify-between items-center h-10 mb-3 xs:mt-8 xl:mt-0">
            <h2 class="text-lg font-medium truncate mr-5">Chart Report</h2>
            <el-row class="xs:w-8/12 sm:w-8/12 lg:w-5/12 xl:w-5/12">
              <el-col :span="24">
                <el-date-picker v-model="value1" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date"> </el-date-picker>
              </el-col>
            </el-row>
          </div>
          <div class="bg-white">
            <apexchart width="100%" height="450px" type="area" :options="options" :series="series"></apexchart>
          </div>
        </div>
        <div class="xs:w-1/1 lg:w-1/2 m-4">
          <div class="intro-y block flex justify-between items-center h-10 mb-3 xs:mt-8 xl:mt-0">
            <h2 class="text-lg font-medium truncate mr-5">Bar Report</h2>
          </div>
          <div class="bg-white">
            <apexchart width="100%" height="450px" type="bar" :options="options" :series="series"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      value1: '',
      value2: '',
      options: {
        colors: ['#2B3646'],
        chart: {
          id: 'Product'
        },
        xaxis: {
          types: 'datetime'
        }
      },
      series: [
        {
          name: 'Product',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.-intro-y:first-child {
  position: relative;
  -webkit-animation: intro-y-animation 0.4s ease-in-out 0.33333s;
  animation: intro-y-animation 0.4s ease-in-out 0.33333s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  transform: translateY(50px);
}
.box,
.report-box {
  position: relative;
}
.zoom-in {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y)) rotate(var(--transform-rotate)) skewX(var(--transform-skew-x))
    skewY(var(--transform-skew-y)) scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
  cursor: pointer;
}
.zoom-in:hover {
  --transform-scale-x: 1.05;
  --transform-scale-y: 1.05;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.report-box:before {
  content: '';
  width: 85%;
  background: #f9fafc;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.04);
  height: 100%;
  margin-top: 0.75rem;
  position: absolute;
  border-radius: 0.375rem;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  left: 0;
}
.box {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0.375rem;
}
.report-box .report-box__indicator {
  display: flex;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 1);
  font-size: 0.75rem;
  padding: 3px 0.25rem 3px 0.5rem;
  align-items: center;
  font-weight: 500;
}
</style>
