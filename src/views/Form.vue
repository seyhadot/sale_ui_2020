<template>
  <div class="content-card bg-white px-6 py-5">
    <div class="bread_crumb">
      <ul class="flex">
        <li>
          <a href>Order Form</a>
        </li>
        <li>
          <a href>Order Form</a>
        </li>
      </ul>
    </div>
    <div class="form-conrol">
      <div class="form-title border-b pb-3 mt-5">
        <h3 class="text-xl">1. Order Details</h3>
      </div>
      <el-row class="flex mt-3" :gutter="20">
        <el-col :span="12">
          <label for>Order Name</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
        <el-col :span="12">
          <label for>My License Number</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :lg="6">
          <label for>Action</label>
          <el-select v-model="value" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <label for>Date</label>
          <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <label for>Time Window</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6">
          <label for>Payment Term</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="12">
          <label for>
            Distination
            <span>add new Destination</span>
          </label>
          <el-select v-model="value" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <label for>Distination License Number</label>
          <el-select v-model="value" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <label for>Point of Contact (POC) Name</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <label for>Phone Number</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <label for>Email</label>
          <el-input clear placeholder="Please input" v-model="input"></el-input>
        </el-col>
        <el-col :span="24">
          <label for>Diver / Delivery Notes</label>
          <el-input type="textarea" :rows="8" placeholder="Please input" v-model="textarea"></el-input>
        </el-col>
      </el-row>
      <div class="action mt-3">
        <el-button type="warning">Submit</el-button>
        <el-button type>Cancel</el-button>
      </div>
    </div>
  </div>
</template>
