<template>
  <el-dialog
    title="请修改合同相关信息"
    :visible="dialogVisible"
    class="dial"
    width="560px"
    :before-close="handleClose"
    margin-top="10vh"
  >
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="合同编号">
        <el-input :disabled="true" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="合同时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="签订日期"
              v-model="form.date1"
              style="width: 100%;margin-left:10px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker
              placeholder="生效日期"
              v-model="form.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="合同类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择合同类型">
          <el-option
            v-for="item in type"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同当事人" prop="party">
        <el-input v-model="form.party"></el-input>
      </el-form-item>
      <el-form-item label="标的物" prop="obj">
        <el-input v-model="form.obj"></el-input>
      </el-form-item>
      <el-form-item label="总金额(万元)" prop="total">
        <el-input v-model="form.total" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="开累支出(万元)" prop="expenses">
        <el-input v-model="form.expenses" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="合同状态" prop="condition">
        <el-select v-model="form.condition" placeholder="请选择合同状态">
          <el-option
            v-for="item in condition"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EditContract",
  data() {
    var checknum = (rule, val, callback) => {
      if (!val) callback();
      const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
      if (!reg.test(val)) {
        callback(new Error("请输入非负数！"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        // code: [
        //   { required: true, message: "请输入合同编号", trigger: "blur" },
        //   { min: 3, max: 10, message: "3-10位", trigger: "blur" },
        // ],
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择合同类型", trigger: "change" },
        ],
        party: [{ required: true, message: "请输入当事人", trigger: "blur" }],
        date1: [{ required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ required: true, message: "请选择日期", trigger: "change" }],
        obj: [{ required: true, message: "请输入标的物", trigger: "blur" }],
        total: [
          { required: true, message: "总金额不能为空" },
          {
            validator: checknum,
            message: "金额必须为数值",
            trigger: "blur",
          },
        ],
        expenses: [
          { required: true, message: "支出金额不能为空" },
          {
            validator: checknum,
            message: "金额必须为数值",
            trigger: "blur",
          },
        ],
        condition: [
          { required: true, message: "请选择合同状态", trigger: "change" },
        ],
      },
    };
  },
  props: {
    dialogVisible: {
      require: true,
      type: Boolean,
      default: false,
    },
    contractInfo: {
      require: true,
      type: Object,
    },
    type: { require: true, type: Array },
    condition: { require: true, type: Array },
  },

  computed: {
    form() {
      return this.contractInfo;
    },
  },
  methods: {
    handleClose() {
      this.$emit("done");
    },
    onSubmit(x) {
      this.$refs[x].validate((valid) => {
        if (valid) {
          this.$emit("submitEdit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.el-form-item{margin-left:-10px;}
</style>