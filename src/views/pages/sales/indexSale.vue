<template>
  <div>
    <div class="flex bg-white">
      <div class="sm:w-8/12 xl:w-9/12 h-full h-screen overflow-y-scroll">
        <div class="w-full bg-bluelight h-16 pt-3 px-3">
          <img
            class="w-10 h-10 rounded-full mr-4"
            src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
            alt="Avatar of Jonathan Reinink"
          />
        </div>
        <div class="w-full px-6 mt-5">
          <div class="relative">
            <span class="text-bluelight absolute z-10" style="top: 8px;left: 15px;">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-search"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <el-input
              v-model="search"
              placeholder="Search or scan for items"
              class="input-no-border"
            ></el-input>
          </div>
          <div class="mt-3 grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <div v-for="x in 40" class>
              <div class="shadow border-red-400 rounded-lg border-solid p-3 cursor-pointer">
                <div
                  class="relative sm:h-20 lg:h-24 xl:h-32 w-full rounded-lg"
                  style="background-size:cover;"
                  :style="{'background-image': 'url(' + require('@/assets/img/pizza.jpg')  + ')'}"
                >
                  <div
                    class="bg-blue-700 sm:h-8 h-12 py-2 opacity-75 text-center bottom-0 rounded-b-lg absolute w-full"
                  ></div>
                  <div
                    class="sm:text-xs text-lg text-white absolute bottom-0 sm:h-8 h-12 w-full flex items-center justify-center uppercase font-semibold font-sans"
                  >
                    <h6 class>JOD 4000</h6>
                  </div>
                </div>
                <div class="text-center xl:mt-3 mt-2">
                  <h6 class="sm:text-xs font-serif text-gray-700 font-semibold">Vegetable</h6>
                </div>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div
        class="sm:w-4/12 md:w-4/12 xl:w-3/12 bg-bg_sale h-full h-screen flex-col flex justify-between"
      >
        <div class="w-full tab-option">
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >{{item.content}}</el-tab-pane>
          </el-tabs>
        </div>
        <div class="w-full bg-bluelight px-2 py-10">
          <el-button type="plain" class="w-full text-red" plain>Checkout</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: "",
         editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2,
        form: {
          name: ''
        }
      }
    },
     methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>

